import { NextResponse, NextRequest } from 'next/server';

import { URL } from 'url';
import { getToken } from "next-auth/jwt"

import getURL from '@/app/utils/getURL';

import {
  QueryCommand,
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
} from '@aws-sdk/client-dynamodb';
import { json } from 'stream/consumers';

const client = new DynamoDBClient({});

type Challenge = {
  sk: string,
  title: string,
  mode: string,
  points: number,
  gameOptions: string
}

export async function GET(req:NextRequest) {
    const fullURL = getURL(req.url)
    const paths = fullURL.split('/')
    let challengeId = paths[paths.length - 1]

    try {
      console.log('getting challenge: ', challengeId)
      const { Item } = await client.send(
          new GetItemCommand({
              TableName: 'flagmasters',
              Key: {
                "pk": { S: 'challenges' },
                "sk": { S: `sk#${challengeId}` },
              }
          })
      )
      let jsonOptions = Item?.gameOptions || {}      
      return NextResponse.json(Object.values(jsonOptions)[0]);

    } catch (error) {
        // error handling.
    } finally {
        // finally.
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