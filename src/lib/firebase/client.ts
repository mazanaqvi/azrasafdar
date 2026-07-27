import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

/**
 * Web SDK config. These values are public by design — they identify the
 * project, they do not authorise anything. Access is controlled entirely by
 * the rules in `firestore.rules`.
 */
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}

let firestore: Firestore | undefined;

/**
 * Firestore handle, or `null` when the project is not configured. Callers are
 * expected to treat Firestore as optional so that a missing or misconfigured
 * project degrades to "submission emailed but not archived" rather than
 * breaking the form outright.
 */
export function getDb(): Firestore | null {
  if (!isFirebaseConfigured()) return null;

  if (!firestore) {
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    firestore = getFirestore(app);
  }

  return firestore;
}
