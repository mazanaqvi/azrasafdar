"use server";

import { Resend } from "resend";
import { site } from "@/lib/site";
import {
  volunteerSchema,
  type VolunteerApplication,
  type VolunteerState,
} from "@/lib/volunteer";

const SUCCESS_MESSAGE =
  "Thank you for signing up. Someone from the team will be in touch soon.";

export async function submitVolunteerApplication(
  _previous: VolunteerState,
  formData: FormData,
): Promise<VolunteerState> {
  // Bots fill hidden fields; humans never see this one.
  if (formData.get("company")) {
    return { status: "success", message: SUCCESS_MESSAGE, fieldErrors: {} };
  }

  const parsed = volunteerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    city: formData.get("city"),
    interest: formData.get("interest"),
    availability: formData.get("availability"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: VolunteerState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof VolunteerApplication;
      fieldErrors[key] ??= issue.message;
    }

    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const application = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Without a key there is nowhere to deliver the application. Failing
    // loudly in production is better than silently losing a volunteer.
    if (process.env.NODE_ENV === "production") {
      console.error("RESEND_API_KEY is not set — volunteer application not delivered.");
      return {
        status: "error",
        message: `Something went wrong on our end. Please email us directly at ${site.volunteerEmail}.`,
        fieldErrors: {},
      };
    }

    console.info("[dev] Volunteer application received:", application);
    return { status: "success", message: SUCCESS_MESSAGE, fieldErrors: {} };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Website <onboarding@resend.dev>",
      to: site.volunteerEmail,
      replyTo: application.email,
      subject: `Volunteer application — ${application.name} (${application.city})`,
      text: [
        `Name: ${application.name}`,
        `Email: ${application.email}`,
        `Phone: ${application.phone}`,
        `City: ${application.city}`,
        `Area of interest: ${application.interest}`,
        `Availability: ${application.availability}`,
        "",
        "Message:",
        application.message || "(none)",
      ].join("\n"),
    });

    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("Failed to deliver volunteer application:", error);
    return {
      status: "error",
      message: `We couldn't submit your form. Please email us directly at ${site.volunteerEmail}.`,
      fieldErrors: {},
    };
  }

  return { status: "success", message: SUCCESS_MESSAGE, fieldErrors: {} };
}
