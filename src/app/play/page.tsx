'use client'

import { useState } from 'react'
import { Tab } from '@headlessui/react'
import useCurrentUser from '@/app/hooks/useCurrentUser'
import { useRouter } from 'next/navigation'

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

type Post = {
    id: number,
    title: string,
    date: string,
    commentCount: number,
    shareCount: number,
}

const Play = function() {

    let currentUser = useCurrentUser()
    const router = useRouter();

    let [ challenges ] = useState(
        [
            {
              id: 1,
              title: 'Finish Easy difficulty in 1 minute',
              mode: 'Multiple choices',
              commentCount: 5,
              shareCount: 2,
            },
            {
              id: 2,
              title: "Finish Medium difficulty in 2 minutes",
              mode: 'Guess the letter',
              commentCount: 3,
              shareCount: 2,
            },
            {
              id: 3,
              title: "Finish Hard difficulty in 3 minutes",
              mode: 'Guess the letter',
              commentCount: 3,
              shareCount: 2,
            },
        ]    
    )




    function startChallenge(id:number) {
        router.push(`play/challenges/${id}`)
    }

    return (
        <>
            <div className="lg:w-3/4 max-lg:px-4">
                <p className='text-left mb-5'><span className='text-2xl font-bold'>Hi {currentUser?.name}</span> are you up for a challenge or ready to battle other players?</p>

                <div className="challenges">
                    <p className='mb-5 text-xl font-xl font-bold italic'>Challenges</p>
                    <ul>
                        {challenges.map((post) => (
                        <li
                            key={post.id}
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
                                    <button onClick={ () => startChallenge(post.id)} className='bg-amber-500 hover:bg-amber-400 text-white py-2 px-4 border-2 border-white font-bold rounded-md'>Start</button>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Play