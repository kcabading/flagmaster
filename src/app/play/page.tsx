
import getURL from '../utils/getURL'
import Link from 'next/link'

type IChallengeType = {
    id: number,
    title: string,
    mode: string,
    commentCount: number,
    shareCount: number,
}

const Play = async function() {

    let challenges = []
    const apiURL = getURL() + 'api/challenges'

    console.log('API URL')

    let res = await fetch(apiURL)

    console.log('res', res)
    if (res.status !== 200) {
        throw new Error('Failed to fetch data');
    }

    challenges = await res.json()

    return (
        <>
            <div className="lg:w-3/4 max-lg:px-4">

                <div className="challenges">
                    <p className='mb-5 text-xl font-xl font-bold italic'>Challenges</p>
                    <ul>
                        {challenges.map(( record: IChallengeType ) => (
                        <li
                            key={record.id}
                            className="relative rounded-md p-3 hover:bg-gray-100 flex justify-between"
                        >
                            <div className="w-4/5" >
                                <h3 className="text-sm font-medium leading-5">
                                {record.title}
                                </h3>

                                <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                                <li>{record.mode}</li>
                                </ul>
                            </div>
                            <div className="w-1/5 text-right" >
                                <Link href={getURL() +  `play/challenges/${record.id}`} className='bg-amber-500 hover:bg-amber-400 text-white py-2 px-4 border-2 border-white font-bold rounded-md'>Start</Link>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Play