'use client'

import Game from '@/components/game/Game'
import getURL from '@/utils/getURL'
import { useEffect, useState } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'

interface IPageProps {
    params: { id: string }
}

interface IGameOptions {
    flagNumberOption: number
    initialTimeOption: number,
    ascTimeOption: boolean,
    modeOption: string,
    difficultyOption: string,
    continent: string
}

function handleGameFinished(
    challengeId: string | undefined,
    timeTaken: string | number,
    status: string,
    flagNumberOption: number,
    correctAnswer: number
    ){

    const apiURL = getURL() + `api/challenges/${challengeId}`

    let gameResult = {
        challengeId,
        timeTaken,
        status,
        flagNumberOption,
        correctAnswer
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameResult)
    };

    let body = JSON.stringify(gameResult)
    fetch(apiURL, requestOptions)

}


async function getChallenge(challengeId: string) {
    const res = await fetch(`${getURL()}api/challenges/${challengeId}`);
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

const Challenge = function( props: IPageProps ) {
    let {params} = {...props}
    const apiURL = getURL() + `api/challenges/${params.id}`
    const challengeId = params.id

    const [ gameOptions, setGameOptions ] = useState<IGameOptions>({
        flagNumberOption: 5,
        initialTimeOption: 0,
        ascTimeOption: true,
        modeOption: 'multiple',
        difficultyOption: 'easy',
        continent: 'all'
    })

    const [ isLoading, setIsLoading] = useState(true)
    const [ preventLeaving, setPreventLeaving ] = useState(false)

    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        getChallenge(challengeId)
            .then((data) => {
                setGameOptions(JSON.parse(data));
                setIsLoading(false);
                setPreventLeaving(true)
            })
    }, [])

    return (
        <>
            <h1 className='font-bold text-xl mb-4'>Challenge#: {challengeId}</h1>
            {
                isLoading
                ? 
                    <div className="lg:w-1/2 w-full text-center max-lg:px-4 space-y-4">

                        <div className="flex justify-between items-center">
                            <Skeleton className="h-4 w-[150px] max-sm:w-[100px]" />
                            <Skeleton className="w-[150px] h-10 max-sm:w-[100px]" />
                            <Skeleton className="h-4 w-[150px] max-sm:w-[100px]" />
                        </div>
                        <div className="flex justify-center">
                            <Skeleton className="h-[250px] w-[350px]" />
                        </div>            
                    </div>
                
                : <Game {...gameOptions} handleGameFinished={handleGameFinished} challengeId={challengeId} />
            }
        </>
    )
}

export default Challenge