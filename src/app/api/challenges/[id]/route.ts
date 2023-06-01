import { NextResponse, NextRequest } from 'next/server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

import {
  QueryCommand,
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
} from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient({});
import { NextApiResponse } from 'next';

type IGetParams = {
  params: { 
    id: string
  }
}


export async function GET(req:NextRequest, { params }: IGetParams) {
    // const session = await getServerSession(req, NextApiResponse, authOptions)
    // console.log('session', session)
    let challengeId = params.id
    // console.log('getting challenge: ', challengeId)
    // if (!session) {
    //   console.log('NOT SIGNED IN')
    //   // Not Signed in
    //   NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
    // } else {
      try {
        console.log('getITEM COmmand ')
        const { Item } = await client.send(
            new GetItemCommand({
                TableName: 'flagmasters',
                Key: {
                  "pk": { S: 'challenges' },
                  "sk": { S: `CHALLENGE#${challengeId}` },
                }
            })
        )

        let jsonOptions = Item?.gameOptions || {}      
        return NextResponse.json(Object.values(jsonOptions)[0]);

      } catch (error) {
        NextResponse.json({ error }, { status: 500 })
      } 
    // }
}


export async function POST(req:NextRequest, { params }: IGetParams) {

    let challengeId = params.id
    let body = await req.json()
    console.log("POST API")
    console.log(challengeId)
    console.log(typeof body)

    let { user, timeTaken, correctAnswer } = body



    const updateResult = await client.send(
      new UpdateItemCommand({
          TableName: 'flagmasters',
          Key: {
            "pk": { S: user },
            "sk": { S: `CHALLENGE#${challengeId}` },
          },
          UpdateExpression: "set completed=:x, timeTaken = :y, pointsEarned = :a",
          ExpressionAttributeValues: {
            ":x": { BOOL : true },
            ":y": { S : timeTaken },
            ":a": { N : '10'}
          }
      })
    )
    console.log('UPDATE RESULT', updateResult)
     
    return NextResponse.json({ message: 'Successfully updated game result' });
}