import { AuthOptions } from "next-auth";

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
      // async jwt({ token, account, profile }) {
      //   console.log('JWT TOKEN')
      //   console.log(token)
      //   console.log(account)
      //   console.log(profile)
      //   console.log(typeof profile)
      //   // console.log()
      //   // if (profile && !token.hasOwnProperty('name')) {
      //   //   token.name = profile["cognito:username"]
      //   // }
      //   // if (profile) {
      //   //   token.
      //   // }
      //   // Persist the OAuth access_token and or the user id to the token right after signin
      //   // if (account) {
      //   //   token.accessToken = account.access_token
      //   //   token.id = profile.id
      //   // }
      //   return token
      // }
    }
  }