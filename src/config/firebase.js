// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDI_7WSKyo68l2Bfe-5ZnXqotrJDMyqI4",
  authDomain: "event-1670a.firebaseapp.com",
  projectId: "event-1670a",
  storageBucket: "event-1670a.firebasestorage.app",
  messagingSenderId: "13975935522",
  appId: "1:13975935522:web:7b69722d6eecab60fb887b"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('[Firebase] App initialized successfully:', app.name || 'default');
} catch (error) {
  console.error('[Firebase] Failed to initialize app:', error);
  throw error;
}

// Get a reference to auth service
export const auth = getAuth(app);

// Log auth configuration for debugging
console.log('[Firebase] Auth domain:', firebaseConfig.authDomain);
console.log('[Firebase] Project ID:', firebaseConfig.projectId);

// Optional analytics initialization
try {
  getAnalytics(app);
} catch (error) {
  console.warn('Analytics not initialized:', error);
}
