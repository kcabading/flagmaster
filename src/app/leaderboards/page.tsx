

import Image from "next/image";
import { S3Client, GetObjectCommand, AbortMultipartUploadCommand } from "@aws-sdk/client-s3";

const client = new S3Client({ region: 'us-east-1'});

interface ILeader {
    userPK: string,
    challenges: [],
    noOfChallenges: number,
    totalPoints: number,
    lastPlayed: string
}

function rankToText(rank: number): string {
        
    let ranking = rank + 1
    if ( ranking === 1 ) return `${ranking}st`
    if ( ranking === 2 ) return `${ranking}nd`
    if ( ranking === 3 ) return `${ranking}rd`

    return `${ranking}th`
}

const Leaderboards = async function() {
    let leaders: ILeader[] = []
    const input = {
        Bucket: process.env.DB_TABLE,
        Key: process.env.LEADERBOARDS_KEY,
    }
    let command = new GetObjectCommand(input);
    const response: any = await client.send(command);
    const str = await response.Body.transformToString();
    leaders = JSON.parse(str)

    return (
        <div className='lg:w-1/2 w-full text-center max-lg:px-4'>
            <h1 className="mb-3 text-4xl font-bold">Leaderboards</h1>
            <div className="w-full">
                <ul className="leader-list">
                    {leaders.map( (leader, index) => {
                        return (
                            <li key={index} className={`flex justify-between ${index === 0 ? 'bg-amber-900' :  'bg-amber-500'} text-white p-5 mb-2 rounded-md items-center hover:bg-amber-400`}>
                                <div className="w-1/5 font-bold">{rankToText(index)}</div>
                                <div className="w-3/5 font-bold flex items-center background-white">
                                    <Image src={'/flagmaster.png'} width={50} height={50} alt="leader logo" className="rounded-[50%] border-4 border-white mr-4"/>
                                    <div className="w-full text-left">
                                        <div>{leader.userPK}</div>
                                        <ul className="flex text-sm">
                                            <li>Challenges played: {leader.noOfChallenges}</li>
                                            <li>Last played: {leader.lastPlayed}</li>
                                        </ul>
                                        <div className="points-range rounded-lg w-full h-4 bg-slate-500 mt-2 overflow-hidden">
                                            <div className="w-3/5 bg-yellow-400 h-full" />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/5 font-bold">{leader.totalPoints}</div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Leaderboards