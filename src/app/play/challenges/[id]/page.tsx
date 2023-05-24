'use client'

import { useState, useEffect } from 'react'
import Game from '@/app/components/Game'
import useCurrentUser from '@/app/hooks/useCurrentUser'
import { useRouter,useSearchParams,usePathname } from 'next/navigation'

const Challenge = function() {

    const [ start, setStart ] = useState(false)
    const [ gameOptions, setGameOptions] = useState({ flagNumberOption: 5, initialTimeOption:0, ascTimeOption: true })

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const urlPaths = pathname.split('/')

    useEffect(() => {
      
        if (urlPaths.length === 4) {
            // TODO: getting challenge options async
            console.log('getting challenge options')
            setGameOptions( (options) => {
                return {
                    ...options,
                    flagNumberOption: 10,
                    initialTimeOption: 60,
                    ascTimeOption: false
                }
            })
            setStart(true)
        }
    
        return () => {
            console.log('dismount')
        }
    }, [pathname, searchParams])

    return (
        <>
            <h1 className='font-bold text-xl mb-5'>Challenge#: {urlPaths && urlPaths[3]}</h1>
            { 
                start 
                ? <Game startOption={start} {...gameOptions} />
                : <p>Loading game...</p>
            }
        </>
    )
}

export default Challenge