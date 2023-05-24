'use client'

import { useState, useEffect } from "react";

import { useSearchParams, usePathname } from "next/navigation";
import Game from "@/app/components/Game";


const Try = () => {

    const searchParams = useSearchParams()
    const pathnames = usePathname()
    const [ start, setStart ] = useState(false)
    const [ gameOptions, setGameOptions] = useState({ flagNumberOption: 5, initialTimeOption:0, ascTimeOption: true })

    useEffect(() => {
        setGameOptions( (prevOptions) => {
            return {
                ...prevOptions,
                flagNumberOption: Number(searchParams.get('flag'))
            }
        })
        setStart(true)
        
        return () => {
            setStart(false)
        }

        // You can now use the current URL
    }, [searchParams, pathnames]);

    return (
        <>{ start && <Game startOption={start} {...gameOptions}/> }</>
    )
}

export default Try