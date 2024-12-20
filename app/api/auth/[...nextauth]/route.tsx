import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/prisma/client";
import bcrypt from 'bcrypt';
//to impliment your own user form 

import CredentialsProvider from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {

  adapter: PrismaAdapter(prisma), //swithcing to database adaptor
  providers: [

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "password" }
      },
      async authorize(credentials, req) {

        if (!credentials?.email || !credentials.password)
          return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user)
          return null;

        const passowrdMatched = await bcrypt.compare(credentials.password, user.hashpassword!);

        return passowrdMatched ? user : null;


      }
    }),
      
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  session: { strategy: 'jwt' }
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
