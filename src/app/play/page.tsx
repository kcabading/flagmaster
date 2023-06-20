'use client'

import { useState, useEffect, Fragment } from 'react'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useRouter } from 'next/navigation'
import getURL from '../../utils/getURL'


import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const continents = ['All','Asia','Africa','Europe','North America','South America','Oceania']
const levels = ['all', 'easy', 'medium', 'hard']


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

    const [selectedContinent, setSelectedContinent] = useState(continents[0])
    const [selectedLevel, setSelectedLevel] = useState(levels[0])

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
                    <p className='mb-2 text-xl font-xl font-bold italic'>Challenges</p>
                    <div className="filters w-full flex mb-5 dark:text-black justify-end">
                        <div className="flex w-1/2">
                            <div className='w-full flex items-center justify-end text-xs'>
                                <span className='text-sm dark:text-white hidden lg:block'>Level: &nbsp;</span>
                                <Listbox value={selectedLevel} onChange={setSelectedLevel}>
                                    <div className="relative mt-1">
                                    <Listbox.Button className="relative w-32 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                        <span className="block truncate">{selectedLevel}</span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        </span>
                                    </Listbox.Button>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {levels.map((level, id) => (
                                            <Listbox.Option
                                            key={id}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-amber-500 text-amber-900' : 'text-gray-900'
                                                }`
                                            }
                                            value={level}
                                            >
                                            {({ selected }) => (
                                                <>
                                                <span
                                                    className={`block truncate ${
                                                    selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                                >
                                                    {level}
                                                </span>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                                </>
                                            )}
                                            </Listbox.Option>
                                        ))}
                                        </Listbox.Options>
                                    </Transition>
                                    </div>
                                </Listbox>
                                &nbsp;&nbsp;
                                <span className='text-sm dark:text-white hidden lg:block'>Continent: &nbsp;</span>
                                <Listbox value={selectedContinent} onChange={setSelectedContinent}>
                                    <div className="relative mt-1">
                                    <Listbox.Button className="relative w-48 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                        <span className="block truncate">{selectedContinent}</span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        </span>
                                    </Listbox.Button>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {continents.map((continent, id) => (
                                            <Listbox.Option
                                            key={id}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-amber-500 text-amber-900' : 'text-gray-900'
                                                }`
                                            }
                                            value={continent}
                                            >
                                            {({ selected }) => (
                                                <>
                                                <span
                                                    className={`block truncate ${
                                                    selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                                >
                                                    {continent}
                                                </span>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                                </>
                                            )}
                                            </Listbox.Option>
                                        ))}
                                        </Listbox.Options>
                                    </Transition>
                                    </div>
                                </Listbox>
                            </div>
                        </div>
                    </div>
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
                            <div className="w-4/5 lg:w-4/5" >
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
                            <div className="w-1/5 lg:w-1/5 text-right flex items-center justify-end" >
                                {
                                    challenge.completed
                                    ? <button onClick={ () => startChallenge(challenge.sk) } className='w-full text-xs lg:text-md bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 border-2 border-white font-bold rounded-md'>Retry</button>
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