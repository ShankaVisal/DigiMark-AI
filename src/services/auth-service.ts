
"use client";

// This is a mock authentication service.
// In a real application, you would replace this with calls to your auth provider (e.g., Firebase Auth).

const AUTH_TOKEN_KEY = "digimark-auth-token";

export async function login(email: string, password: string): Promise<boolean> {
  // Hardcoded credentials for the prototype
  const isAdmin = email === "shankavisal@gmail.com" && password === "shankavisal1234567890";

  if (isAdmin) {
    try {
      // Simulate token generation
      const token = `mock-token-${Date.now()}`;
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      return true;
    } catch (error) {
      console.error("Failed to set auth token in localStorage", error);
      return false;
    }
  }

  return false;
}

export async function logout(): Promise<void> {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error("Failed to remove auth token from localStorage", error);
  }
}

export async function isLoggedIn(): Promise<boolean> {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return !!token;
  } catch (error) {
    console.error("Failed to get auth token from localStorage", error);
    return false;
  }
}
