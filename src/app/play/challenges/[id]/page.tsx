'use client'

import Game from '@/components/game/Game'
import getURL from '@/utils/getURL'
import { useEffect, useState } from 'react'

interface IPageProps {
    params: { id: string }
}

interface IGameOptions {
    flagNumberOption: number
    initialTimeOption: number,
    ascTimeOption: boolean,
    modeOption: string,
    difficultyOption: string
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
        difficultyOption: 'easy'
    })

    const [ isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        console.log('use effect')
        getChallenge(challengeId)
            .then((data) => {
            setGameOptions(JSON.parse(data));
            setIsLoading(false);
            })
    }, [])

    return (
        <>
            <h1 className='font-bold text-xl mb-5'>Challenge#: {challengeId}</h1>
            {
                isLoading
                ? <p>Loading...</p>
                : <Game {...gameOptions} handleGameFinished={handleGameFinished} challengeId={challengeId} />
            }
        </>
    )
}

export default Challenge