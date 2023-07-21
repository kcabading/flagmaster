'use client'

import { useState, useEffect, Fragment } from 'react'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useRouter } from 'next/navigation'
import { useSearchParams, usePathname } from "next/navigation"
import getURL from '../../utils/getURL'

import { Skeleton } from '../../components/ui/skeleton'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Challenge from './challenges/[id]/page'

const continents = ['all','Asia','Africa','Europe','North America','South America','Oceania']
const levels = ['all', 'easy', 'medium', 'hard']
const modes = ['all', 'multiple', 'fill']


function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

async function getAllChallenges() {
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
    status: string,
    level: string,
    continent: string
}

interface IPageProps {
    params: { id: string }
}

const Play = function( props: IPageProps ) {

    const searchParams = useSearchParams()
    const filterByContinent = searchParams.has('continent') ? searchParams.get('continent') : continents[0]
    const filterByLevel = searchParams.has('level') ? searchParams.get('level') : levels[0]
    const filterByMode = searchParams.has('mode') ? searchParams.get('mode') : modes[0]

    const [selectedMode, setSelectedMode] = useState(filterByMode)
    const [selectedContinent, setSelectedContinent] = useState(filterByContinent)
    const [selectedLevel, setSelectedLevel] = useState(filterByLevel)

    const router = useRouter()
    let currentUser = useCurrentUser()
    const [ isLoading, setIsLoading] = useState(false)
    const [ challenges, setChallenges ] = useState<IChallenges[]>([])

    function startChallenge(id:string) {
        router.push(getURL() +  `play/challenges/${id}`)
    }

    
    useEffect(() => {
        setIsLoading(true);
        getAllChallenges()
            .then((data) => {
                setChallenges(data);
                setIsLoading(false);
            })
    }, [])

    let filteredChallenges = challenges.filter( challenge => {
        return selectedLevel === 'all' ? true  :  challenge.level == selectedLevel
    }).filter( challenge => {
        return selectedContinent === 'all' ? true  :  challenge.continent == selectedContinent
    }).filter( challenge => {
        return selectedMode === 'all' ? true  :  challenge.mode == selectedMode
    })
    
    return (
        <>
            <div className="lg:w-3/4 max-lg:px-4">
                <p className='text-left mb-5'><span className='text-2xl font-bold'>Hi {currentUser?.name}</span>, are you up for a challenge or ready to battle other players?</p>
                <div className="challenges">
                    <div className='by-difficulty mb-5'>
                        <div className="filters w-full flex mb-5">
                            <div className="w-full flex items-center justify-between dark:text-white">
                                <div className='max-sm:w-1/2'>
                                    <h2 className='font-bold'>Challenges</h2>
                                </div>
                                <div className="filters flex flex-wrap max-sm:w-1/2 justify-end">
                                    <div className='mr-2'>
                                        <Select onValueChange={setSelectedMode} defaultValue="all">
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a Level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup className='text'>
                                                    <SelectLabel>By Game Mode</SelectLabel>
                                                    {
                                                        modes.map( (mode) => {
                                                            return <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                                                        })
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className='mr-2'>
                                        <Select onValueChange={setSelectedLevel} defaultValue="all">
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a Level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup className='text'>
                                                    <SelectLabel>By Level of Difficulty</SelectLabel>
                                                    {
                                                        levels.map( (level) => {
                                                            return <SelectItem key={level} value={level}>{level}</SelectItem>
                                                        })
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Select onValueChange={setSelectedContinent} defaultValue="all">
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a Level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>By Continent</SelectLabel>
                                                    {
                                                        continents.map( (continent) => {
                                                            return <SelectItem key={continent} value={continent}>{continent}</SelectItem>
                                                        })
                                                    }
                                                    
                                                    {/* <SelectItem value="easy">Easy</SelectItem>
                                                    <SelectItem value="medium">Medium</SelectItem>
                                                    <SelectItem value="hard">Hard</SelectItem> */}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                        isLoading 
                        ?
                            Array.from(Array(10).keys()).map(( id ) => (
                                <div key={id} className="flex items-center space-x-4 py-3">
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[350px]" />
                                        <Skeleton className="h-4 w-[300px]" />
                                    </div>
                                </div>
                            ))
                        :
                        <ul>
                            {
                            filteredChallenges.map((challenge) => (
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
            </div>
        </>
    )
    
}

export default Play