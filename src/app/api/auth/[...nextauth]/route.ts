import NextAuth from "next-auth/next";
import CognitoProvider from "next-auth/providers/cognito";

const handler = NextAuth({
    providers: [
        // FacebookProvider({
        //   clientId: process.env.FACEBOOK_CLIENT_ID,
        //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        // }),
        CognitoProvider({
          clientId: process.env.COGNITO_CLIENT_ID,
          clientSecret: process.env.COGNITO_CLIENT_SECRET,
          issuer: process.env.COGNITO_ISSUER,
          idToken: true,
          checks: 'nonce'
        })
      ],
      // callbacks: { 
      //   async redirect({ url, baseUrl }) {
      //     console.log('redirect', url, baseUrl)
      //     return url
      //   },
      //   async session({ session, token, user }) {
      //     // Send properties to the client, like an access_token from a provider.
      //     // session.customerID = token.sub
      //     console.log('session', session)
      //     console.log('token', token)
      //     console.log('user', user)
      //     return session
      //   }
      // },
    callbacks: {
        async jwt({ token, user }) {
          return { ...token, ...user };
        },

        async session({ session, token }) {
          console.log('session callback')
          session.user = token as any;
          return session;
        },
    },
});

export { handler as GET, handler as POST };