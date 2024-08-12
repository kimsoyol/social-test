import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { z } from "zod";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User {
    // Add your additional properties here:
    role: string;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    // Add your additional properties here:
    role: string;
  }
}


async function getUser(email: string): Promise<any> {
  // Dummy users data
  const users = [
    {
      id: "1",
      email: "admin@email.com",
      password: await bcrypt.hash("1234", 10),
      role: "admin",
    },
    {
      id: "2",
      email: "user@email.com",
      password: await bcrypt.hash("1234", 10),
      role: "user",
    },
  ];

  try {
    const user = users.find((u) => u.email === email);
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

async function getUserById(id: string): Promise<any> {
  // Dummy users data
  const users = [
    {
      id: "1",
      email: "admin@email.com",
      password: await bcrypt.hash("1234", 10),
      role: "admin",
    },
    {
      id: "2",
      email: "user@email.com",
      password: await bcrypt.hash("1234", 10),
      role: "user",
    },
  ];

  try {
    const user = users.find((u) => u.id === id);
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(3) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);

          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log("user -", user);

          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
  callbacks: {
    // async session({ session, user }) {
    //   if (session?.user) {
    //     session.user.id = user.id;
    //     session.user.role = user.role;
    //   }

    //   return session;
    // },

    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role as "admin" | "user";
      return session;
    },

    // async session({ session, token }) {
    //   if (token.sub && session.user) {
    //     session.userId = token.sub;
    //   }

    //   if (token.role && session.user) {
    //     session.user.role = token.role as "admin" | "user";
    //   }

    //   return session;
    // },

    // async jwt({ token }) {
    //   if (!token.sub) return token;
    //   const existingUser = await getUserById(token.sub);
    //   if (!existingUser) return token;
    //   token.role = existingUser.role;
    //   console.log(existingUser);

    //   return token;
    // },
  },
  session: { strategy: "jwt" },
});
