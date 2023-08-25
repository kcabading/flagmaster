'use client'

import { useSearchParams, usePathname } from "next/navigation"
import Game from "@/components/game/Game"

const Try = () => {
    const searchParams = useSearchParams()
    
    const gameOptions = {
        initialTimeOption:0, 
        ascTimeOption: true, 
        modeOption: searchParams.has('mode') ? searchParams.get('mode')! : 'multiple',
        continent: 'all',
        flagNumberOption: searchParams.has('flag') ? Number(searchParams.get('flag')) : 5,
        difficultyOption: searchParams.has('level') ? String(searchParams.get('level')?.toLowerCase()) : 'easy'
    }

    function handleGameFinished() {
        console.log('trying game finished')
    }

    return (
        <Game {...gameOptions} challengeId="" handleGameFinished={handleGameFinished}/>
    )
}

export default Try