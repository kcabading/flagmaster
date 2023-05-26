import useTimer from '@/app/hooks/useTimer'
import convertTimeToNumber from '@/app/utils/convertTimetoNumber'

interface TimerProps {
    initialTimeOption: number,
    ascTimeOption: boolean
}

const Timer = function ({ initialTimeOption, ascTimeOption }: TimerProps) {

    const { timer, start, stop, reset } = useTimer(initialTimeOption, ascTimeOption)

    // console.log('COUNTER COMPONENT render')
    // const { timer } = useTimer(0, true)

    // console.log('timer', timer)
    return (
        <>
            <div className={`${initialTimeOption > 0 && convertTimeToNumber(timer) <= 10 ? 'text-red-500' : ''} font-bold text-4xl`}>
                {timer} 
            </div>
            {/* <button onClick={stop}>STOP</button>
            <button onClick={start}>START</button> */}
        </>
    )
}

export default Timer