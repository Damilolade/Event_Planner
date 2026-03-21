// auth.js
import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// Check if auth is available
const isAuthAvailable = () => {
  if (!auth) {
    console.error('[Auth] Firebase auth object is not available');
    throw new Error("Firebase is not configured. Please add your Firebase credentials to .env file.");
  }
  console.log('[Auth] Auth service available, auth current user:', auth.currentUser);
  return auth;
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(isAuthAvailable(), email, password);
};

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(isAuthAvailable(), email, password);
};

export const logoutUser = () => {
  return signOut(isAuthAvailable());
};
