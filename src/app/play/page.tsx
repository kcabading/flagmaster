'use client'

import { useState, useEffect } from 'react'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useRouter } from 'next/navigation'
import getURL from '../../utils/getURL'


function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

async function getAllChallenges() {
    console.log(getURL())
    const res = await fetch( getURL() + 'api/challenges');
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }
    
    return res.json();
}

type IChallenges = {
    sk: string,
    title: string,
    mode: string,
    points: number,
    completed: boolean,
    pointsEarned: number,
    timeTaken: string,
    status: string
}

interface IPageProps {
    params: { id: string }
}

const Play = function( props: IPageProps ) {

    const router = useRouter()
    let currentUser = useCurrentUser()
    console.log('CURRENT USER', currentUser)
    const [ isLoading, setIsLoading] = useState(false)
    const [ challenges, setChallenges ] = useState<IChallenges[]>([])

    function startChallenge(id:string) {
        router.push(getURL() +  `play/challenges/${id}`)
    }
        
    useEffect(() => {
        setIsLoading(true);
        getAllChallenges()
            .then((data) => {
            console.log(data)
            setChallenges(data);
            setIsLoading(false);
            })
    }, [])
    
    return (
        <>
            <div className="lg:w-3/4 max-lg:px-4">
                <p className='text-left mb-5'><span className='text-2xl font-bold'>Hi {currentUser?.email}</span> are you up for a challenge or ready to battle other players?</p>
                <div className="challenges">
                    <p className='mb-5 text-xl font-xl font-bold italic'>Challenges</p>
                    {
                    isLoading 
                    ? <>Loading...</>
                    :
                    <ul>
                        {challenges.map((challenge) => (
                        <li
                            key={challenge.sk}
                            className="rounded-md p-3 hover:bg-gray-100 dark:hover:text-black flex justify-between"
                        >
                            <div className="w-3/5 lg:w-4/5" >
                                <h3 className="text-sm font-medium leading-5">
                                {challenge.title}
                                </h3>

                                <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                                <li><span className='font-bold'>{challenge.mode}</span> mode</li>
                                {
                                    challenge.completed && <>
                                        <li>&middot;</li>
                                        <li><span className='font-bold'>{challenge.pointsEarned}</span> points earned</li>
                                        <li>&middot;</li>
                                        <li><span className='font-bold'>{challenge.timeTaken}</span> time taken</li>
                                        <li>&middot;</li>
                                        {challenge.completed && challenge.status === 'PASSED' &&
                                            <li><span className='font-bold bg-green-500 text-white py-1 px-2 rounded-md'>COMPLETED</span></li>
                                        }
                                        {challenge.completed && challenge.status === 'FAILED' &&
                                            <li><span className='font-bold bg-red-500 text-white py-1 px-2 rounded-md'>FAILED</span></li>
                                        }
                                    </>
                                }
                                </ul>
                            </div>
                            <div className="w-2/5 lg:w-1/5 text-right flex items-center justify-end" >
                                {
                                    challenge.completed
                                    ? <button onClick={ () => startChallenge(challenge.sk) } className='w-full text-xs lg:text-md bg-gray-500 text-white py-2 px-4 border-2 border-white font-bold rounded-md'>Retry</button>
                                    : challenge.completed === false && <button onClick={ () => startChallenge(challenge.sk) } className='w-full text-xs lg:text-md bg-amber-500 hover:bg-amber-400 text-white py-2 px-4 border-2 border-white font-bold rounded-md'>Start</button>
                                }
                            </div>
                        </li>
                        ))}
                    </ul>
                    }
                </div>
            </div>
        </>
    )
    
}

export default Play