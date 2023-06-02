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
import convertTimeToNumber from '@/utils/convertTimetoNumber';

const client = new DynamoDBClient({})

type IGetParams = {
  params: { 
    id: string
  }
}

async function getChallengeRecordById (id: string) {
  console.log('getITEM COmmand ')
  let response = await client.send(
    new GetItemCommand({
        TableName: 'flagmasters',
        Key: {
          "pk": { S: 'challenges' },
          "sk": { S: `CHALLENGE#${id}` },
        }
    })
  )

  return response
}


export async function GET(req:NextRequest, { params }: IGetParams) {
    const session = await getServerSession(authOptions)
    const token = await getToken({ req })

    let userId = token?.sub
    let challengeId = params.id

    if (session && userId) {
      try {
        let { Item } = await getChallengeRecordById(challengeId)
        console.log('CHALLENGE ITEM', Item)
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

// Max points - (  (Max points / 2)  - Math.floor( Total Time - Time taken / 4 * Total Time / 60 ) ) =  Points earned
function calculatePoints(maxPoints: number, totalTime: number, timeTaken: number, flagNumberOption:number, correctAnswer:number ): string {
  let totalPointsFromTime = maxPoints - (  (maxPoints / 2) - Math.floor( (totalTime - timeTaken) / (4 *  (totalTime / 60 )) ) )
  // make sure to set the max points
  totalPointsFromTime = totalPointsFromTime > maxPoints ? maxPoints : totalPointsFromTime
  let pointsToDeduct = Math.ceil( ((flagNumberOption - correctAnswer)/flagNumberOption) * 10 )
  let totalPoints = totalPointsFromTime - pointsToDeduct

  return String(totalPoints)
}


export async function POST(req:NextRequest, { params }: IGetParams) {

  const session = await getServerSession(authOptions)
  const token = await getToken({ req })

  if (!session || !token) {
    // Not Signed in
    NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
  } else {
    try {
      // get current user id
      let userId = token?.sub
      let challengeId = params.id
      let body = await req.json()
      let { timeTaken, status, flagNumberOption, correctAnswer} = body
      let timeUsed = convertTimeToNumber(timeTaken)
      // get the challenge options
      let { Item } = await getChallengeRecordById(challengeId)
      let points = Number(Object.values(Item?.points || 10)[0])
      let timeToFinish = Number(Object.values(Item?.timeToFinish || 60)[0])
      
      let pointsEarned = status === 'PASSED' ? calculatePoints(points, timeToFinish, timeUsed, flagNumberOption, correctAnswer) : '0'

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
              ":a": { N : pointsEarned},
              ":b": { S : status }
            },
            ExpressionAttributeNames: {
              "#status": "status"
            }
        })
      )
      console.log('UPDATE RESULT', updateResult)
        
      return NextResponse.json({ message: 'Successfully updated game result' })
    } catch (error) {
      NextResponse.json({ error }, { status: 500 })
    } 
  }
}