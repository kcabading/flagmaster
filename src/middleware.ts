// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// // import { authOptions } from 'pages/api/auth/[...nextauth]'

// import { AuthOptions } from 'next-auth';
// import { getServerSession } from "next-auth/next"

// // // This function can be marked `async` if using `await` inside
// // export function middleware(request: NextRequest) {
// //   return NextResponse.redirect(new URL('/home', request.url));
// // }

// export async function middleware(req: NextRequest) {
//   if (req.nextUrl.pathname === "/dashboard") {

//     const session = await getServerSession()
//     console.log('SESSIONNNNN')
//     console.log(session)

//     // const session = await getSession({ req });
//     if (!session) return NextResponse.redirect("/api/auth/signin");
//   }
//   return NextResponse.next();
// }
 

export { default } from "next-auth/middleware"

export const config = { matcher: ["/settings", "/play/:path*"] }

// import { getSession } from "next-auth/react";
// import { getServerSession } from "next-auth";
// import { NextResponse, NextRequest } from 'next/server';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// import getURL from './app/utils/getURL';

// export async function middleware(req: NextRequest) {    
//     let currentUrl = new URL(req.url)
//     let protectedPages: string[] = [
//         getURL() + 'play',
//         getURL() + 'settings'
//     ]

//   if (protectedPages.includes(req.url)) {
//     console.log('PROTECTED' )
//     // console.log(authOptions)
//     const session = await getServerSession(authOptions);
//     // if (!session) return NextResponse.redirect( getURL());
//   }
//   return NextResponse.next();
// }