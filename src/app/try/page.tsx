'use client'

import { useSearchParams, usePathname } from "next/navigation"
import Game from "@/app/components/game/Game"

const Try = () => {
    const searchParams = useSearchParams()
    const gameOptions = {
        startOption: true,
        initialTimeOption:0, 
        ascTimeOption: true, 
        modeOption: 'multiple',
        flagNumberOption: searchParams.has('flag') ? Number(searchParams.get('flag')) : 5,
        difficultyOption: searchParams.has('level') ? String(searchParams.get('level')?.toLowerCase()) : 'easy'
    }

    return (
        <Game {...gameOptions}/>
    )
}

export default Try