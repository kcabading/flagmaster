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
    session: { strategy: "jwt" }
  }