// Kept free of path aliases: scripts/check-volunteer-schema.ts runs this file
// directly under Node, which does not resolve "@/".
import { z } from "zod";

export const enquiryTopics = [
  "General enquiry",
  "I want to donate",
  "I need assistance",
  "Partnership or corporate giving",
  "Media or press",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.email("Please enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+\d][\d\s()-]*$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  topic: z.enum(enquiryTopics, { message: "Please choose a topic" }),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more, at least 10 characters")
    .max(3000),
});

export type ContactEnquiry = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactEnquiry, string>>;

/** First message per field, so each input shows one problem at a time. */
export function contactFieldErrors(
  issues: readonly { path: readonly PropertyKey[]; message: string }[],
): ContactFieldErrors {
  const fieldErrors: ContactFieldErrors = {};

  for (const issue of issues) {
    const key = issue.path[0] as keyof ContactEnquiry;
    fieldErrors[key] ??= issue.message;
  }

  return fieldErrors;
}
