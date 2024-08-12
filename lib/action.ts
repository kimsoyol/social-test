"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function getData() {
  try {
    const res = await fetch("https://dummyjson.com/posts");
    return await res.json()
  } catch (error) {
    console.error("Fetching error", error);
    throw new Error("Failed to fetch posts.");
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
