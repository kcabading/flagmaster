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
  DeleteItemCommand,
} from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient({})

type IGetParams = {
  params: { 
    id: string
  }
}


export async function GET(req:NextRequest, { params }: IGetParams) {
    const session = await getServerSession(authOptions)
    const token = await getToken({ req })
    // get current user id
    let userId = token?.sub
    let challengeId = params.id
    console.log('getting challenge: ', challengeId)
    console.log(token, session)
    if (session) {
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
    } else {
      // Not Signed in
      NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
    }
}


export async function POST(req:NextRequest, { params }: IGetParams) {

    const token = await getToken({ req })
    // get current user id
    let userId = token?.sub
    let challengeId = params.id
    let body = await req.json()
    console.log("POST API")
    console.log(challengeId)
    console.log(typeof body)

    let { timeTaken, correctAnswer, status } = body

    const updateResult = await client.send(
      new UpdateItemCommand({
          TableName: 'flagmasters',
          Key: {
            "pk": { S: `USER#${userId}` },
            "sk": { S: `CHALLENGE#${challengeId}` },
          },
          UpdateExpression: "set completed=:x, timeTaken = :y, pointsEarned = :a, #status = :b",
          ExpressionAttributeValues: {
            ":x": { BOOL : true },
            ":y": { S : timeTaken },
            ":a": { N : '10'},
            ":b": { S : status }
          },
          ExpressionAttributeNames: {
            "#status": "status"
          }
      })
    )
    console.log('UPDATE RESULT', updateResult)
     
    return NextResponse.json({ message: 'Successfully updated game result' });
}