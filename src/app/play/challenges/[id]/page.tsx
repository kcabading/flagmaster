'use client'

import Game from '@/components/game/Game'
import getURL from '@/utils/getURL'

interface IPageProps {
    params: { id: string }
}

function handleGameFinished(challengeId: string | undefined, timeTaken: string | number, correctAnswer: number){
    console.log(' SAVING GAME RESULTS')
    console.log(challengeId)
    console.log(timeTaken)
    console.log(correctAnswer)

    const apiURL = getURL() + `api/challenges/${challengeId}`

    let gameResult = {
        user: 'USER#facebook_10224223657447688',
        challengeId,
        timeTaken,
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

const Challenge = async function( props: IPageProps ) {
    let {params} = {...props}
    const apiURL = getURL() + `api/challenges/${params.id}`
    const challengeId = params.id
    console.log('APIURL ', apiURL)
    let res = await fetch(apiURL, { cache: 'no-store' })
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }
    let data = await res.json()
    let gameOptions = JSON.parse(data)

    return (
        <>
            <h1 className='font-bold text-xl mb-5'>Challenge#: {challengeId}</h1>
            <Game {...gameOptions} handleGameFinished={handleGameFinished} challengeId={challengeId} />
        </>
    )
}

export default Challenge