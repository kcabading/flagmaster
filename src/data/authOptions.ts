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
      // async signIn({ user, account, profile, email, credentials }, { callbackUrl: '/foo' }) {

      //   console.log('user', user, account, profile, email, credentials)

      //   if (user.email) {
      //     return true
      //   }

      //   return false
      //   const isAllowedToSignIn = true
      //   if (isAllowedToSignIn) {
      //     return true
      //   } else {
      //     // Return false to display a default error message
      //     return false
      //     // Or you can return a URL to redirect to:
      //     // return '/unauthorized'
      //   }
      // },
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