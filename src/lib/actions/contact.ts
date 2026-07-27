"use server";

import { Resend } from "resend";
import {
  contactSchema,
  type ContactEnquiry,
  type ContactState,
} from "@/lib/contact";
import { site } from "@/lib/site";

const SUCCESS_MESSAGE =
  "Thank you for getting in touch. We usually reply within two working days.";

export async function submitContactEnquiry(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Bots fill hidden fields; humans never see this one.
  if (formData.get("company")) {
    return { status: "success", message: SUCCESS_MESSAGE, fieldErrors: {} };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    topic: formData.get("topic"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactEnquiry;
      fieldErrors[key] ??= issue.message;
    }

    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const enquiry = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Without a key there is nowhere to deliver the message. Failing loudly in
    // production is better than silently dropping an enquiry.
    if (process.env.NODE_ENV === "production") {
      console.error("RESEND_API_KEY is not set — contact enquiry not delivered.");
      return {
        status: "error",
        message: `Something went wrong on our end. Please email us directly at ${site.email} or call ${site.phone}.`,
        fieldErrors: {},
      };
    }

    console.info("[dev] Contact enquiry received:", enquiry);
    return { status: "success", message: SUCCESS_MESSAGE, fieldErrors: {} };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Website <onboarding@resend.dev>",
      to: site.email,
      replyTo: enquiry.email,
      subject: `${enquiry.topic} — ${enquiry.name}`,
      text: [
        `Topic: ${enquiry.topic}`,
        `Name: ${enquiry.name}`,
        `Email: ${enquiry.email}`,
        `Phone: ${enquiry.phone || "(not provided)"}`,
        "",
        "Message:",
        enquiry.message,
      ].join("\n"),
    });

    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("Failed to deliver contact enquiry:", error);
    return {
      status: "error",
      message: `We couldn't send your message. Please email us directly at ${site.email} or call ${site.phone}.`,
      fieldErrors: {},
    };
  }

  return { status: "success", message: SUCCESS_MESSAGE, fieldErrors: {} };
}
