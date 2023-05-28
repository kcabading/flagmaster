import Game from '@/app/components/game/Game'
import { headers } from 'next/headers';
import { URL } from 'url';



async function getGameOption() {

    const headersList = headers();
    const domain = headersList.get('host') || "";
    const fullUrl = headersList.get('referer') || "";
    const urlPaths: string[] = fullUrl.split('/')
    let challegeId = urlPaths[urlPaths.length - 1]
    const baseUrl = new URL('/', fullUrl)
    const res = await fetch( baseUrl + `/api/challenges/${challegeId}`);
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
   
    return res.json()
}



const Challenge = async function() {

    console.log('challenge render')
    let gameOptions = await getGameOption()
    return (
        <>  
            {/* <h1 className='font-bold text-xl mb-5'>Challenge#: {challengeId}</h1> */}
            <Game startOption={true} {...gameOptions} />   
        </>
    )
}

export default Challenge