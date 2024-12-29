import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();  // Ensure environment variables are loaded
const serviceAccount = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://flashcardsa-564e2.firebaseio.com`,
  });
}

export { admin };