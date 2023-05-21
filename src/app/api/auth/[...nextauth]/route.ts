import NextAuth from "next-auth/next";
import FacebookProvider from "next-auth/providers/facebook";

const handler = NextAuth({
    providers: [
        FacebookProvider({
          clientId: process.env.FACEBOOK_CLIENT_ID,
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        })
      ],
    // callbacks: {
    //     async jwt({ token, user }) {
    //     return { ...token, ...user };
    //     },

    //     async session({ session, token }) {
    //     session.user = token as any;
    //     return session;
    //     },
    // },
});

export { handler as GET, handler as POST };