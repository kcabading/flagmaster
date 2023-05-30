'use client'

import { useState, useEffect } from 'react'
import useCurrentUser from '@/app/hooks/useCurrentUser'
import { useRouter } from 'next/navigation'
import getURL from '../utils/getURL'


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

type Post = {
    sk: string,
    title: string,
    mode: string,
    points: number,
}

interface IPageProps {
    params: { id: string }
}

const Play = function( props: IPageProps ) {

    let {params} = {...props}
    const apiURL = getURL() + 'api/challenges'

    let currentUser = useCurrentUser()
    const router = useRouter();
    const [ isLoading, setIsLoading] = useState(false)
    const [ challenges, setChallenges ] = useState<Post[]>([])
    
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
                <p className='text-left mb-5'><span className='text-2xl font-bold'>Hi {currentUser?.name}</span> are you up for a challenge or ready to battle other players?</p>
                <div className="challenges">
                    <p className='mb-5 text-xl font-xl font-bold italic'>Challenges</p>
                    {
                    isLoading 
                    ? <>Loading...</>
                    :
                    <ul>
                        {challenges.map((post) => (
                        <li
                            key={post.sk}
                            className="relative rounded-md p-3 hover:bg-gray-100 flex justify-between"
                        >
                            <div className="w-4/5" >
                                <h3 className="text-sm font-medium leading-5">
                                {post.title}
                                </h3>

                                <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                                <li>{post.mode}</li>
                                {/* <li>&middot;</li>
                                <li>{post.commentCount} comments</li>
                                <li>&middot;</li>
                                <li>{post.shareCount} shares</li> */}
                                </ul>

                                {/* <a
                                href="#"
                                className={classNames(
                                    'absolute inset-0 rounded-md',
                                    'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                                )}
                                /> */}
                            </div>
                            <div className="w-1/5 text-right" >
                                    <button onClick={ () => startChallenge(post.sk) } className='bg-amber-500 hover:bg-amber-400 text-white py-2 px-4 border-2 border-white font-bold rounded-md'>Start</button>
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