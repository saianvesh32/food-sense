import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/db";
import { DefaultSession, type NextAuthConfig } from "next-auth";
import bcryptjs from "bcryptjs";
import { Role } from "@prisma/client";

export type NextAuthUser = {
  username: string;
} & DefaultSession["user"];

declare module "next-auth" {
  interface Session {
    user: NextAuthUser;
  }

  interface JWT {
    user: {
      username: string;
    };
  }

  interface User {
    username: string;
    role: Role;
  }
}

export default {
  providers: [
    Google({
      clientId: process.env.NEXTAUTH_GOOGLE_ID as string,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("email is required");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: (email as string).toLowerCase(),
          },
        });

        if (!user) {
          throw new Error("No user found");
        }

        if (!user.password) {
          throw new Error("User has not set a password");
        }
        // const valid = await bcryptjs.compare(
        //   password as string,
        //   user.password
        // );
        const valid = password == user.password

        if (!valid) {
          throw new Error("Invalid email or password");
        }

        return user as any;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        // token.username = user.username;
        token.role = user.role as Role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        // session.user.username = token.username as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;