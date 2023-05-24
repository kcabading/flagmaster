
import Image from "next/image"

const Leaderboards = function() {

    let leaders = [
        {
            name: 'Kristian',
            points: 150
        },
        {
            name: 'Irene',
            points: 140
        },
        {
            name: 'Idan',
            points: 130
        },
        {
            name: 'Theodore',
            points: 130
        },
        {
            name: 'Theodore',
            points: 130
        },
        {
            name: 'Theodore',
            points: 130
        },
        {
            name: 'Theodore',
            points: 130
        },
        {
            name: 'Theodore',
            points: 130
        },
        {
            name: 'Theodore',
            points: 130
        },
        {
            name: 'Theodore',
            points: 130
        },
        {
            name: 'Theodore',
            points: 130
        }
    ]

    function rankToText(rank: number): string {
        
        let ranking = rank + 1

        if ( ranking === 1 ) return `${ranking}st`
        if ( ranking === 2 ) return `${ranking}nd`
        if ( ranking === 3 ) return `${ranking}rd`

        return `${ranking}th`
    }
    

    return (
        <div className='lg:w-1/2 w-full text-center max-lg:px-4'>
            <h1 className="mb-3 text-4xl font-bold">Leaderboards</h1>
            <div className="w-full">
                <ul className="leader-list">
                    {leaders.map( (leader, index) => {
                        return (
                            <li key={index} className={`flex justify-between ${index === 0 ? 'bg-amber-900' :  'bg-amber-500'} text-white p-5 mb-2 rounded-md items-center`}>
                                <div className="w-1/5 font-bold">{rankToText(index)}</div>
                                <div className="w-3/5 font-bold flex items-center background-white">
                                    <Image src={'/flagmaster.png'} width={50} height={50} alt="leader logo" className="rounded-[50%] border-4 border-white mr-4"/>
                                    <div className="w-full text-left">
                                        <div>{leader.name}</div>
                                        <div className="points-range rounded-lg w-full h-4 bg-slate-500 mt-2 overflow-hidden">
                                            <div className="w-3/5 bg-yellow-400 h-full" />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/5 font-bold">{leader.points}</div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Leaderboards