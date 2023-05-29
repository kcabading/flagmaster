
import Game from '@/app/components/game/Game'
import getURL from '@/app/utils/getURL'

interface IPageProps {
    params: { id: string }
}

const Challenge = async function( props: IPageProps ) {
    let {params} = {...props}
    const apiURL = getURL() + `api/challenges/${params.id}`
    let data = await fetch(apiURL, { next: { revalidate : 360 }})
    let gameOptions = await data.json()

    return (
        <>
            <h1 className='font-bold text-xl mb-5'>Challenge#: {params.id}</h1>
            <Game {...gameOptions} />
        </>
    )
}

export default Challenge