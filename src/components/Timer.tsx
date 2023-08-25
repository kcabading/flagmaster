import useTimer from '@/hooks/useTimer'
import convertTimeToNumber from '@/utils/convertTimetoNumber'
import { useEffect } from 'react'

interface TimerProps {
    initialTimeOption: number,
    ascTimeOption: boolean,
    handleGameFinish: (timer: string) => void,
    flagCompleted: boolean
}

const Timer = function ({ initialTimeOption, ascTimeOption, handleGameFinish, flagCompleted}: TimerProps) {

    const { timer, start, stop, reset } = useTimer(initialTimeOption, ascTimeOption)

    useEffect(() => {
        console.log('TIMER START!')
        start()
        return () => stop()
    }, [])

    if ( flagCompleted ||  (!ascTimeOption && timer === '00:00')) {
        handleGameFinish(timer)
        stop()
    }
    
    return (
        <>
            <div className={`${!ascTimeOption && convertTimeToNumber(timer) <= 10 ? 'text-red-500' : ''} font-bold text-4xl`}>
                {timer} 
            </div>
        </>
    )
}

export default Timer