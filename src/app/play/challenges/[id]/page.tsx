
import Game from '@/app/components/game/Game'
import getURL from '@/app/utils/getURL'

interface IPageProps {
    params: { id: string }
}

const Challenge = async function( props: IPageProps ) {
    let {params} = {...props}
    const apiURL = getURL() + `api/challenges/${params.id}`
    let res = await fetch(apiURL, { next: { revalidate : 10 }})
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }
    let data = await res.json()
    let gameOptions = JSON.parse(data)
    
    return (
        <>
            <h1 className='font-bold text-xl mb-5'>Challenge#: {params.id}</h1>
            <Game {...gameOptions} />
        </>
    )
}

export default Challenge