import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions: AuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: process.env.COGNITO_ISSUER,
      idToken: true,
      checks: 'nonce'
    })
  ],
  session: { strategy: "jwt" }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }