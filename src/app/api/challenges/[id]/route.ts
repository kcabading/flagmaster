import { NextResponse, NextRequest } from 'next/server';

import { URL } from 'url';

import { cookies } from 'next/headers';

import { useSession } from 'next-auth/react';
import { setTimeout } from 'timers/promises';

 
export async function GET(request:NextRequest) {

    // const cookieStore = cookies();
    const { pathname } = new URL(request.url);
    const paths = pathname.split('/')

    if (paths.length !== 4 ) throw new Error("Invalid pathname");
    const id = paths[3]

    // await setTimeout(5000, 'result')

    const gameOptions = {
        flagNumberOption: 10,
        initialTimeOption: 240,
        ascTimeOption: false,
        modeOption: 'fill',
        difficultyOption: 'medium'
    }

    // const token = cookieStore.get('token');
    // console.log('TOKEN', token)
//   const res = await fetch('https://data.mongodb-api.com/...', {
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//   });
//   const data = await res.json();
 
  return NextResponse.json({ ...gameOptions });
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