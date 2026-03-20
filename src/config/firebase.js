// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validate required env variables
const requiredEnvKeys = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_APP_ID"
];

function isInvalidFirebaseValue(value) {
  if (!value || typeof value !== "string") return true;
  const trimmed = value.trim();
  if (trimmed === "") return true;
  const placeholders = [
    "your_api_key_here",
    "your_project_id",
    "your_app_id",
    "your_measurement_id",
    "your_project.firebaseapp.com",
    "your_project.appspot.com",
    "{projectId}",
    "{apiKey}",
    "{appId}",
    "{measurementId}"
  ];
  return placeholders.includes(trimmed.toLowerCase()) || trimmed.includes("your_");
}

const missingKeys = requiredEnvKeys.filter((key) => isInvalidFirebaseValue(import.meta.env[key]));

// Only throw error if at least one required key has a valid-looking value
// This allows the app to load even without Firebase configured
const hasAnyValidKey = requiredEnvKeys.some((key) => !isInvalidFirebaseValue(import.meta.env[key]));

if (missingKeys.length === requiredEnvKeys.length && !hasAnyValidKey) {
  console.warn(
    "Firebase config is invalid or missing required env variables. " +
    "The app will continue without Firebase authentication. " +
    "To enable Firebase, copy .env.example to .env and add your Firebase credentials."
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics is optional - only initialize if measurementId looks valid
if (!isInvalidFirebaseValue(firebaseConfig.measurementId)) {
  getAnalytics(app);
}

export const auth = getAuth(app);
v