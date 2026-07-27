import { z } from "zod";

/** Mirrors the projects in `lib/projects.ts`, plus general options. */
export const volunteerInterests = [
  "Students Education",
  "Free Education & Tutorship",
  "Ramzan Ration Pack",
  "Widows Support",
  "Health Support",
  "Fundraising",
  "Wherever I'm needed",
] as const;

export const volunteerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.email("Please enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a contact number")
    .max(30)
    .regex(/^[+\d][\d\s()-]*$/, "Please enter a valid phone number"),
  city: z.string().trim().min(2, "Please tell us which city you're in").max(80),
  interest: z.enum(volunteerInterests, { message: "Please choose an area" }),
  availability: z
    .string()
    .trim()
    .min(2, "Please tell us your availability")
    .max(200),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type VolunteerApplication = z.infer<typeof volunteerSchema>;

export type VolunteerState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<keyof VolunteerApplication, string>>;
};

export const initialVolunteerState: VolunteerState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
