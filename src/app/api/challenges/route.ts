import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/data/authOptions';

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
    timeTaken: string
}
 
export async function GET(req:NextRequest) {

    const session = await getServerSession(authOptions)
    if (!session) {
      // Not Signed in
      console.log('NOT SIGNED IN')
      NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
    } else {

        let challenges:Challenge[] = []
        try {
            const promise1 = client.send(
                new QueryCommand({
                    TableName: 'flagmasters',
                    KeyConditionExpression: "pk = :pk",
                    ExpressionAttributeValues: {
                        ":pk": {S: "challenges"}
                    }
                })
            )

            
            console.log('getting all user challenges')
            const promise2 = client.send(
                new QueryCommand({
                    TableName: 'flagmasters',
                    KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
                    ExpressionAttributeValues: {
                        ":pk": {S: "USER#facebook_10224223657447688"},
                        ":sk": {S: "CHALLENGE#"}
                    }
                })
            )
            
            let [challenges, userChallenges] = await Promise.all([promise1, promise2])

            
            console.log('use challenges', userChallenges.Items)
            
            let allChallenges = challenges.Items?.map( challenge => {
                let sk = Object.values(challenge.sk)[0]
                let challengeSortKey = sk.split('#')[1]

                let challengeItem:Challenge = {
                    sk : challengeSortKey,
                    title : Object.values(challenge.title)[0],
                    points : Object.values(challenge.points)[0],
                    mode : Object.values(challenge.mode)[0],
                    completed: false,
                    pointsEarned: 0,
                    timeTaken: ''
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
                            timeTaken: Object.values(uChallenge.timeTaken)[0]
                        }
                    }
                })

                return challengeItem

            })


            // console.log('ALL CHALLENGES', allChallenges)

            
            // if (Items?.length) {
            //     challenges = Items.map( item => {

            //         let sk = Object.values(item.sk)[0]
            //         let challengeSortKey = sk.split('#')[1]

            //         return {
            //             sk : challengeSortKey,
            //             title : Object.values(item.title)[0],
            //             points : Object.values(item.points)[0],
            //             mode : Object.values(item.mode)[0]
            //         }
            //     })
            // }


            // console.log('ITEM!!!!!!!!')
            // console.log(Items)
            return NextResponse.json(allChallenges);

        } catch (error) {
            // error handling.
        } finally {
            // finally.
        }
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