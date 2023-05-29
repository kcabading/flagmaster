import { NextResponse, NextRequest } from 'next/server';

import { URL } from 'url';
import { getToken } from "next-auth/jwt"

import getURL from '@/app/utils/getURL';

 
export async function GET(req:NextRequest) {

    // const cookieStore = cookies();
    const fullURL = getURL(req.url)
    const paths = fullURL.split('/')

    console.log('PATHS', fullURL)

    let challengeId = Number(paths[paths.length - 1])

    let gameOptions = {}

    switch (challengeId) {
      case 1:
        gameOptions = {
          flagNumberOption: 10,
          initialTimeOption: 0,
          ascTimeOption: true,
          modeOption: 'multiple',
          difficultyOption: 'hard'
        }
        break;
      case 2:
        gameOptions = {
          flagNumberOption: 10,
          initialTimeOption: 30,
          ascTimeOption: false,
          modeOption: 'fill',
          difficultyOption: 'hard'
        }
        break;
      case 3:
        gameOptions = {
          flagNumberOption: 10,
          initialTimeOption: 120,
          ascTimeOption: false,
          modeOption: 'fill',
          difficultyOption: 'hard'
        }
        break;
      default:
        break;
    }

    // await setTimeout(5000, 'result')

    // const token = cookieStore.get('token');
    // console.log('TOKEN', token)
//   const res = await fetch('https://data.mongodb-api.com/...', {
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//   });
//   const data = await res.json();
    console.log('gameoptions', gameOptions)
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