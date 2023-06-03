import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/data/authOptions';
import { getToken } from "next-auth/jwt"

import { S3Client, GetObjectCommand, AbortMultipartUploadCommand } from "@aws-sdk/client-s3";

import {
    QueryCommand,
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
    UpdateItemCommand,
    DeleteItemCommand
} from '@aws-sdk/client-dynamodb';

const client = new S3Client({ region: 'us-east-1'});

type Challenge = {
    sk: string,
    title: string,
    mode: string,
    points: number,
    completed: boolean,
    pointsEarned: number,
    timeTaken: string,
    status: string
}
 
export async function GET(req:NextRequest) {

    try {
        const input = {
            Bucket: process.env.DB_TABLE,
            Key: process.env.LEADERBOARDS_KEY,
        }

        console.log('INPUT', input)

        let command = new GetObjectCommand(input);
        const response: any = await client.send(command);
        const str = await response.Body.transformToString();
        console.log(str);
        let leaderboards = JSON.parse(str)
        console.log('LEADERBOARDS', leaderboards)

        
        // console.log(Items)
        return NextResponse.json(leaderboards);

    } catch (error) {
        console.log('ERROR:', error)
        NextResponse.json({ error }, { status: 500 })
    }
}


export async function POST() {     
    return NextResponse.json({ message: 'From the Leaderboards API' });
}