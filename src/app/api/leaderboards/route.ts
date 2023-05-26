import { NextResponse, NextRequest } from 'next/server';

import { URL } from 'url';

import { cookies } from 'next/headers';

import { useSession } from 'next-auth/react';
 
export async function GET(req:NextRequest) {

    console.log(URL)
    // const cookieStore = cookies();
    // const token = cookieStore.get('token');
    // console.log('TOKEN', token)
//   const res = await fetch('https://data.mongodb-api.com/...', {
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//   });
//   const data = await res.json();
 
  return NextResponse.json({ message: 'From the Leaderboards API with token' });
}


export async function POST() {

    //   const res = await fetch('https://data.mongodb-api.com/...', {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'API-Key': process.env.DATA_API_KEY,
    //     },
    //   });
    //   const data = await res.json();
     
      return NextResponse.json({ message: 'From the Leaderboards API' });
    }