import convertTimeToNumber from '@/app/utils/convertTimetoNumber'

interface TimerProps {
    timer: string,
    initialTimeOption: number,
}

const Timer = function ({ timer, initialTimeOption}: TimerProps) {

    return (
        <>
            <div className={`${initialTimeOption > 0 && convertTimeToNumber(timer) <= 10 ? 'text-red-500' : ''} font-bold text-4xl`}>
                {timer} 
            </div>
        </>
    )
}

export default Timer