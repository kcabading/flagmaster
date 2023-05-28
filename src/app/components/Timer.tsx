import useTimer from '@/app/hooks/useTimer'
import convertTimeToNumber from '@/app/utils/convertTimetoNumber'

interface TimerProps {
    initialTimeOption: number,
    ascTimeOption: boolean,
    onStart: () => void,
    onStop: () => void,
    onRest: () => void,
}

const Timer = function ({ initialTimeOption, ascTimeOption }: TimerProps) {

    const { timer, start, stop, reset } = useTimer(initialTimeOption, ascTimeOption)

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