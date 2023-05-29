import { NextResponse, NextRequest } from 'next/server';

import { URL } from 'url';

import { cookies } from 'next/headers';
import { getToken } from "next-auth/jwt"

import { setTimeout } from 'timers/promises';
 
export async function GET(req:NextRequest) {
    const token = await getToken({ req })

    console.log('token', token)
    if (!token) {
        let url = new URL(req.url)        
        console.log('not signed in', url)
        return NextResponse.json({ error: 'unauthorized'}, { status: 403});
    } else {
        // setTimeout(5000, 'test')
        let challenges = [
            {
            id: 1,
            title: 'Finish Easy difficulty in 1 minute',
            mode: 'Multiple choices',
            commentCount: 5,
            shareCount: 2,
            },
            {
            id: 2,
            title: "Finish Medium difficulty in 2 minutes",
            mode: 'Guess the letter',
            commentCount: 3,
            shareCount: 2,
            },
            {
            id: 3,
            title: "Finish Hard difficulty in 3 minutes",
            mode: 'Guess the letter',
            commentCount: 3,
            shareCount: 2,
            },
        ]    

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

        console.log('challenges', challenges)
    
        return NextResponse.json([ ...challenges ]);

    }
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