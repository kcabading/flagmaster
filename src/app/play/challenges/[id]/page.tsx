// import { useState, useEffect } from 'react'
import Game from '@/app/components/game/Game'
// import useCurrentUser from '@/app/hooks/useCurrentUser'
// import { useRouter,useSearchParams,usePathname } from 'next/navigation'
import { headers } from 'next/headers';


async function getGameOption(id: string) {
    const res = await fetch(`http://localhost:3000/api/challenges/${id}`);
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
   
    return res.json();
  }



const Challenge = async function() {

    console.log('challenge render')
    const headerList = headers()
    const pathname = headerList.get('x-invoke-path')!
    const urlPaths: string[] = pathname.split('/')

    if (urlPaths.length !== 4) throw new Error('Invalid parameter!')
    const challengeId = urlPaths[3]
    
    let gameOptions = await getGameOption(urlPaths[3])

    // const [ start, setStart ] = useState(false)
    // const [ gameOptions, setGameOptions] = useState({ 
    //     flagNumberOption: 5, 
    //     initialTimeOption:0, 
    //     ascTimeOption: true, 
    //     modeOption: 'multiple',
    //     difficultyOption: 'easy'
    // })

    // const searchParams = useSearchParams()
    // const pathname = usePathname()
    // const urlPaths = pathname.split('/')

    // const challengeId = urlPaths[3]

    
    return (
        <>  
            <h1 className='font-bold text-xl mb-5'>Challenge#: {challengeId}</h1>
            <Game startOption={true} {...gameOptions} />   
        </>
    )
}

export default Challenge