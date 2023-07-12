import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/data/authOptions';
import { getToken } from "next-auth/jwt"

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
    completed: boolean,
    pointsEarned: number,
    timeTaken: string,
    status: string,
    level: string,
    continent: string
}
 
export async function GET(req:NextRequest) {

    const session = await getServerSession(authOptions)
    const token = await getToken({ req })
    // get current user id
    let userId = token?.sub
    let userEmail = session?.user?.email
    console.log('SESSION')
    console.log(session)

    if (session && userId) {
        //Signed in
        console.log('SIGNED IN')
        console.log('getting challenges!!')
        let challenges:Challenge[] = []
        try {
            const promise1 = client.send(
                new QueryCommand({
                    TableName: 'flagmaster',
                    KeyConditionExpression: "pk = :pk",
                    ExpressionAttributeValues: {
                        ":pk": {S: "challenges"}
                    }
                })
            )

            const promise2 = client.send(
                new QueryCommand({
                    TableName: 'flagmaster',
                    KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
                    ExpressionAttributeValues: {
                        ":pk": {S: `USER#${userEmail}`},
                        ":sk": {S: "CHALLENGE#"}
                    }
                })
            )
            
            let [challenges, userChallenges] = await Promise.all([promise1, promise2])

            console.log('challenges', challenges)
            console.log('use challenges', userChallenges.Items)
            
            let allChallenges = challenges.Items?.map( challenge => {

                console.log('ITEM', challenge)
                let sk = Object.values(challenge.sk)[0]
                let challengeSortKey = sk.split('#')[1]

                let challengeItem:Challenge = {
                    sk : challengeSortKey,
                    title : Object.values(challenge.title)[0],
                    points : Object.values(challenge.points)[0],
                    mode : Object.values(challenge.mode)[0],
                    level: Object.values(challenge.level)[0],
                    continent: Object.values(challenge.continent)[0],
                    completed: false,
                    pointsEarned: 0,
                    timeTaken: '',
                    status: ''
                }

                // loop through user challenges
                userChallenges.Items?.forEach( uChallenge => {
                    let usk = Object.values(uChallenge.sk)[0]
                    let isCompleted = Object.values(uChallenge.completed)[0]
                    if ( isCompleted && usk === sk) {
                        challengeItem = {
                            ...challengeItem,
                            completed: isCompleted,
                            pointsEarned: Object.values(uChallenge.pointsEarned)[0],
                            timeTaken: Object.values(uChallenge.timeTaken)[0],
                            status: Object.values(uChallenge.status)[0],
                        }
                    }
                })

                return challengeItem

            })

            return NextResponse.json(allChallenges);

        } catch (error) {
            console.log('error getting challenges')
            console.log(error)
            NextResponse.json({ error }, { status: 500 })
        } 
    } else {
        console.log('NOT SIGNED IN')
        NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
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