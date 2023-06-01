'use client'

import { useSearchParams, usePathname } from "next/navigation"
import Game from "@/components/game/Game"

const Try = () => {
    const searchParams = useSearchParams()
    const gameOptions = {
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