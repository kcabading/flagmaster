import { AuthOptions } from "next-auth";

type CognitoProfile = {
  [key:string] : any
}

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
    session: { strategy: "jwt" },
    callbacks: {
      async jwt({ token, account, profile }) {
        if (profile && !token.hasOwnProperty('cognito:username')) {
          // @ts-ignore
          token.username = profile['cognito:username']
        }
        // if (profile) {
        //   token.
        // }
        // Persist the OAuth access_token and or the user id to the token right after signin
        // if (account) {
        //   token.accessToken = account.access_token
        //   token.id = profile.id
        // }
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