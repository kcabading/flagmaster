
'use client'

import Image from "next/image";
import { useState, useEffect } from 'react'
import useCurrentUser from '@/hooks/useCurrentUser'
import getURL from '../../utils/getURL'
import { Skeleton } from "@/components/ui/skeleton";

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

async function getLeaderBoardsData() {
    const res = await fetch( getURL() + 'api/leaderboards');
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }
    
    return res.json();
}

const Leaderboards = function() {
    let currentUser = useCurrentUser()
    const [ isLoading, setIsLoading] = useState(true)
    const [ leaders, setLeaders ] = useState<ILeader[]>([])
        
    useEffect(() => {
        getLeaderBoardsData()
            .then((data) => {
                setLeaders(data);
                setIsLoading(false);
            })
    }, [])

    return (
        <div className='lg:w-3/4 w-full text-center px-4 mb-10'>
            <h1 className="mb-3 text-4xl font-bold">Leaderboards</h1>
            <div className="w-full">
                { 
                    isLoading
                    ? 
                        Array.from(Array(10).keys()).map(( id ) => (
                            <div key={id} className="flex items-center space-x-4 py-3">
                                <Skeleton className="h-20 w-[100%]" />
                            </div>
                        ))
                    :
                    <ul className="leader-list">
                        {leaders.map( (leader, index) => {
                            return (
                                <li key={index} className={`flex justify-between ${index === 0 ? 'bg-amber-900' :  'bg-amber-500'} text-white p-5 mb-2 rounded-md items-center hover:bg-amber-400`}>
                                    <div className="w-1/5 font-bold lg:text-2xl">{rankToText(index)}</div>
                                    <div className="w-3/5 font-bold flex flex-col md:flex-row items-center background-white">
                                        <Image src={'/flagmaster.png'} width={50} height={50} alt="leader logo" className="rounded-[50%] border-4 border-white mr-4"/>
                                        <div className="w-full text-left">
                                            <div><a href="#" className="hover:underline text-sm md:text-lg">{leader.userPK}</a></div>
                                            <ul className="flex space-x-1 text-xs font-normal leading-4 text-white">
                                                <li># of Challenges played: {leader.noOfChallenges}</li>
                                                <li>&middot;</li>
                                                <li>Last played: {leader.lastPlayed}</li>
                                            </ul>
                                            <div className="points-range rounded-lg w-full h-4 bg-slate-500 mt-2 overflow-hidden">
                                                <div className="w-3/5 bg-yellow-400 h-full" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/5 font-bold lg:text-2xl">{leader.totalPoints}</div>
                                </li>
                            )
                        })}
                    </ul>
                }
                
            </div>
        </div>
    )
}

export default Leaderboards