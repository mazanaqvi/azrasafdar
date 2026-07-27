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
    .min(10, "Please tell us a little more — at least 10 characters")
    .max(3000),
});

export type ContactEnquiry = z.infer<typeof contactSchema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<keyof ContactEnquiry, string>>;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
