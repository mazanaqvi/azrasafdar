import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { contactSchema } from "@/lib/contact";
import { volunteerSchema } from "@/lib/volunteer";
import { getDb } from "@/lib/firebase/client";

export const CONTACT_COLLECTION = "contactEnquiries";
export const VOLUNTEER_COLLECTION = "volunteerApplications";

/**
 * Archiving is best-effort. The email sent by the Server Action is the
 * delivery mechanism the foundation actually relies on, so a Firestore
 * failure is logged and swallowed rather than shown to the visitor, who has
 * already been told their message was sent.
 */
async function archive(
  collectionName: string,
  document: Record<string, string>,
): Promise<void> {
  const db = getDb();
  if (!db) return;

  try {
    await addDoc(collection(db, collectionName), {
      ...document,
      submittedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Could not archive to ${collectionName}:`, error);
  }
}

/** Bots fill the hidden field; nothing they submit should reach Firestore. */
function isBot(formData: FormData): boolean {
  return Boolean(formData.get("company"));
}

export async function archiveContactEnquiry(formData: FormData): Promise<void> {
  if (isBot(formData)) return;

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    topic: formData.get("topic"),
    message: formData.get("message"),
  });

  if (!parsed.success) return;

  // Optional fields are stored as empty strings so every document carries the
  // same key set, which is what the security rules assert against.
  await archive(CONTACT_COLLECTION, {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone ?? "",
    topic: parsed.data.topic,
    message: parsed.data.message,
  });
}

export async function archiveVolunteerApplication(
  formData: FormData,
): Promise<void> {
  if (isBot(formData)) return;

  const parsed = volunteerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    city: formData.get("city"),
    interest: formData.get("interest"),
    availability: formData.get("availability"),
    message: formData.get("message"),
  });

  if (!parsed.success) return;

  await archive(VOLUNTEER_COLLECTION, {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    city: parsed.data.city,
    interest: parsed.data.interest,
    availability: parsed.data.availability,
    message: parsed.data.message ?? "",
  });
}
