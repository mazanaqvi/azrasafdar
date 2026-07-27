/**
 * Smoke check for the public form validation rules.
 * Run with: npm run check:form
 */
import { contactSchema } from "../src/lib/contact.ts";
import { volunteerSchema } from "../src/lib/volunteer.ts";

let failures = 0;

function check(label: string, passed: boolean, detail = "") {
  if (!passed) failures += 1;
  console.log(`${passed ? "pass" : "FAIL"}  ${label}${detail}`);
}

function run(
  name: string,
  schema: { safeParse: (input: unknown) => { success: boolean; error?: unknown } },
  cases: Array<[string, unknown, boolean]>,
) {
  console.log(`\n${name}`);
  for (const [label, input, shouldPass] of cases) {
    const result = schema.safeParse(input);
    const detail =
      !result.success && shouldPass
        ? ` — unexpected error: ${
            (result.error as { issues: { message: string }[] }).issues[0]?.message
          }`
        : "";
    check(label, result.success === shouldPass, detail);
  }
}

const volunteer = {
  name: "Ayesha Khan",
  email: "ayesha@example.com",
  phone: "+92 307 6699514",
  city: "Faisalabad",
  interest: "Students Education",
  availability: "Weekends",
  message: "",
};

run("Volunteer form", volunteerSchema, [
  ["valid application", volunteer, true],
  ["missing name", { ...volunteer, name: "" }, false],
  ["bad email", { ...volunteer, email: "not-an-email" }, false],
  ["bad phone", { ...volunteer, phone: "abc" }, false],
  ["unknown interest", { ...volunteer, interest: "Astrophysics" }, false],
  ["no availability", { ...volunteer, availability: "" }, false],
  ["accepts every listed interest", { ...volunteer, interest: "Ramzan Ration Pack" }, true],
]);

const enquiry = {
  name: "Bilal Ahmed",
  email: "bilal@example.com",
  phone: "+92 300 1234567",
  topic: "I want to donate",
  message: "I would like to sponsor a student for the coming academic year.",
};

run("Contact form", contactSchema, [
  ["valid enquiry", enquiry, true],
  ["phone is optional", { ...enquiry, phone: "" }, true],
  ["missing name", { ...enquiry, name: "" }, false],
  ["bad email", { ...enquiry, email: "nope" }, false],
  ["unknown topic", { ...enquiry, topic: "Something else" }, false],
  ["message too short", { ...enquiry, message: "hi" }, false],
]);

const trimmed = volunteerSchema.safeParse({ ...volunteer, name: "  Ayesha Khan  " });
console.log("");
check(
  "volunteer name is trimmed",
  trimmed.success && trimmed.data.name === "Ayesha Khan",
);

console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
