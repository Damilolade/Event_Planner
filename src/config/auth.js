// auth.js
import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// Check if auth is available
const isAuthAvailable = () => {
  if (!auth) {
    throw new Error("Firebase is not configured. Please add your Firebase credentials to .env file.");
  }
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
