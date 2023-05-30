import { NextResponse, NextRequest } from 'next/server';

import { getServerSession } from 'next-auth';

import { URL } from 'url';
import { cookies } from 'next/headers';
import { getToken } from "next-auth/jwt"
import { setTimeout } from 'timers/promises';

import {
    QueryCommand,
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
    UpdateItemCommand,
    DeleteItemCommand
} from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});

type Challenge = {
    sk: string,
    title: string,
    mode: string,
    points: number,
}
 
export async function GET(req:NextRequest) {

    let challenges:Challenge[] = []
    try {
        console.log('getting challenges')
        const { Items } = await client.send(
            new QueryCommand({
                TableName: 'flagmasters',
                KeyConditionExpression: "pk = :pk",
                ExpressionAttributeValues: {
                    ":pk": {S: "challenges"}
                }
            })
        )
        
        if (Items?.length) {
            challenges = Items.map( item => {

                let sk = Object.values(item.sk)[0]
                let challengeSortKey = sk.split('#')[1]

                return {
                    sk : challengeSortKey,
                    title : Object.values(item.title)[0],
                    points : Object.values(item.points)[0],
                    mode : Object.values(item.mode)[0]
                }
            })
        }

        console.log('ITEM!!!!!!!!')
        console.log(Items)
        return NextResponse.json(challenges);

    } catch (error) {
        // error handling.
    } finally {
        // finally.
    }

    // Check if user is logged in
//   const session = await getServerSession(req, res, authOptions);
//   if (!session || !session.user) {
//     return res.status(500).json("Login to upload.");
//   }
    // const token = await getToken({ req })
    // console.log('token', token)
    // if (!token) {
    //     let url = new URL(req.url)        
    //     console.log('not signed in', url)
    //     return NextResponse.json({ error: 'unauthorized'}, { status: 403});
    // } else {
        // setTimeout(5000, 'test')
        // let challenges = [
        //     {
        //     id: 1,
        //     title: 'Finish Easy difficulty in 1 minute',
        //     mode: 'Multiple choices',
        //     commentCount: 5,
        //     shareCount: 2,
        //     },
        //     {
        //     id: 2,
        //     title: "Finish Medium difficulty in 2 minutes",
        //     mode: 'Guess the letter',
        //     commentCount: 3,
        //     shareCount: 2,
        //     },
        //     {
        //     id: 3,
        //     title: "Finish Hard difficulty in 3 minutes",
        //     mode: 'Guess the letter',
        //     commentCount: 3,
        //     shareCount: 2,
        //     },
        // ]    

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

    // console.log('challenges', challenges)

    // return NextResponse.json([ ...challenges ]);

    // }
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