
'use client'

import { useState, useEffect } from 'react';
import Game from '@/app/components/game/Game'

import getURL from '@/app/utils/getURL';
import { usePathname } from 'next/navigation';

interface GameProps {
    flagNumberOption: number,
    initialTimeOption: number,
    ascTimeOption: boolean,
    modeOption: string // multiple, fill,
    difficultyOption: string
}

const Challenge = function() {

    const pathnames = usePathname()
    const paths = pathnames.split('/')
    const challengeId = paths[paths.length - 1]
    const apiURL = getURL() + `api/challenges/${challengeId}`
    
    const [gameOptions, setGameOptions] = useState<GameProps>({
        initialTimeOption:0,
        ascTimeOption: true, 
        modeOption: 'multiple',
        flagNumberOption: 5,
        difficultyOption: 'easy'
    });
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(apiURL)
          .then((res) => res.json())
          .then((data) => {
            setGameOptions(data);
            setLoading(false);
          })
      }, [])

    console.log(gameOptions)
    return (
        <>
            <h1 className='font-bold text-xl mb-5'>Challenge#: {challengeId}</h1>
            { 
            isLoading
            ?
                `Loading...`
            :
                <Game {...gameOptions} />
            }
        </>
    )
}

export default Challenge