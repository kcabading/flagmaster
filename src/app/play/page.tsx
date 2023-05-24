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
              date: '5h ago',
              commentCount: 5,
              shareCount: 2,
            },
            {
              id: 2,
              title: "Finish Medium difficulty in 2 minutes",
              date: '2h ago',
              commentCount: 3,
              shareCount: 2,
            },
            {
              id: 3,
              title: "Finish Hard difficulty in 3 minutes",
              date: '2h ago',
              commentCount: 3,
              shareCount: 2,
            },
        ]    
    )

    let [categories] = useState({
        Challenges: [
          {
            id: 1,
            title: 'Finish Easy difficulty in 1 minute',
            date: '5h ago',
            commentCount: 5,
            shareCount: 2,
          },
          {
            id: 2,
            title: "Finish Medium difficulty in 2 minutes",
            date: '2h ago',
            commentCount: 3,
            shareCount: 2,
          },
          {
            id: 3,
            title: "Finish Hard difficulty in 3 minutes",
            date: '2h ago',
            commentCount: 3,
            shareCount: 2,
          },
        ],
        Multiplayer: [
          {
            id: 1,
            roomName: 'Room 123: Ready?',
            date: 'Jan 7',
            commentCount: 29,
            shareCount: 16,
          },
          {
            id: 2,
            roomName: 'Room 456: Come on Play!',
            date: 'Mar 19',
            commentCount: 24,
            shareCount: 12,
          },
        ],
        // Trending: [
        //   {
        //     id: 1,
        //     title: 'Ask Me Anything: 10 answers to your questions about coffee',
        //     date: '2d ago',
        //     commentCount: 9,
        //     shareCount: 5,
        //   },
        //   {
        //     id: 2,
        //     title: "The worst advice we've ever heard about coffee",
        //     date: '4d ago',
        //     commentCount: 1,
        //     shareCount: 2,
        //   },
        // ],
    })

    function startChallenge(id:number) {
        router.push(`play/challenges/${id}`)
    }

    return (
        <>
            <div className="w-full lg:w-2/3">
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
                                <li>{post.date}</li>
                                <li>&middot;</li>
                                <li>{post.commentCount} comments</li>
                                <li>&middot;</li>
                                <li>{post.shareCount} shares</li>
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