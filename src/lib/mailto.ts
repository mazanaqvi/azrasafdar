import type { ContactEnquiry } from "@/lib/contact";
import type { VolunteerApplication } from "@/lib/volunteer";
import { site } from "@/lib/site";

/**
 * The contact and volunteer forms do not post anywhere. They validate in the
 * browser and then open the visitor's own mail client with the details filled
 * in, so enquiries keep working without a transactional email provider or a
 * verified sending domain.
 */
function mailtoHref({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}): string {
  const query = new URLSearchParams({ subject, body });

  // URLSearchParams encodes a space as "+", which several mail clients show
  // literally in the subject line.
  return `mailto:${to}?${query.toString().replaceAll("+", "%20")}`;
}

export function contactMailtoHref(enquiry: ContactEnquiry): string {
  return mailtoHref({
    to: site.email,
    subject: `${enquiry.topic}: ${enquiry.name}`,
    body: [
      `Topic: ${enquiry.topic}`,
      `Name: ${enquiry.name}`,
      `Email: ${enquiry.email}`,
      `Phone: ${enquiry.phone || "(not provided)"}`,
      "",
      "Message:",
      enquiry.message,
      "",
    ].join("\n"),
  });
}

export function volunteerMailtoHref(application: VolunteerApplication): string {
  return mailtoHref({
    to: site.volunteerEmail,
    subject: `Volunteer application: ${application.name}`,
    body: [
      `Name: ${application.name}`,
      `Email: ${application.email}`,
      `Phone: ${application.phone}`,
      `City: ${application.city}`,
      `Area of interest: ${application.interest}`,
      `Availability: ${application.availability}`,
      "",
      "Anything else:",
      application.message || "(nothing added)",
      "",
    ].join("\n"),
  });
}
