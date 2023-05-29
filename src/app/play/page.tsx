
import getURL from '../utils/getURL'
import Link from 'next/link'

type IChallengeType = {
    id: number,
    title: string,
    mode: string,
    commentCount: number,
    shareCount: number,
}

interface IPageProps {
    params: { id: string }
}

const Play = async function( props: IPageProps ) {

    let {params} = {...props}
    const apiURL = getURL() + 'api/challenges'
    // let currentUser = useCurrentUser()
    let res = await fetch(apiURL)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    let challenges = await res.json()
    console.log('challenges', challenges)

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
                                {/* <li>&middot;</li>
                                <li>{post.commentCount} comments</li>
                                <li>&middot;</li>
                                <li>{post.shareCount} shares</li> */}
                                </ul>

                                {/* <a
                                href="#"
                                className={classNames(
                                    'absolute inset-0 rounded-md',
                                    'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                                )}
                                /> */}
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