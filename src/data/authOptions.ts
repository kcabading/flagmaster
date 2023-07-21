import { AuthOptions } from "next-auth";

import CognitoProvider from "next-auth/providers/cognito";
export const authOptions: AuthOptions = {
    providers: [
      CognitoProvider({
        clientId: process.env.COGNITO_CLIENT_ID,
        clientSecret: process.env.COGNITO_CLIENT_SECRET,
        issuer: process.env.COGNITO_ISSUER,
        // idToken: true,
        // checks: 'nonce',
        // httpOptions: {
        //   timeout: 20000,
        // }
      })
    ],
    session: { strategy: "jwt" },
    callbacks: {
      async jwt({ token, account, profile }) {
        if (profile && !token.hasOwnProperty('cognito:username')) {
          // @ts-ignore
          token.username = profile['cognito:username']
        }

        return token
      },
      async session({ session, user, token }) {
        if (token.username) {
          session.user!.name = token.username as string
        }
        return session
      }
    }
  }