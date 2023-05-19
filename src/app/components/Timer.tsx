import useTimer from '@/app/hooks/useTimer'

const Timer = function () {

    console.log('COUNTER COMPONENT render')
    const { timer } = useTimer(0, true)

    console.log('timer', timer)
    return (
        <>
            Time: {timer} 
            {/* <button onClick={stop}>STOP</button>
            <button onClick={start}>START</button> */}
        </>
    )
}

export default Timer