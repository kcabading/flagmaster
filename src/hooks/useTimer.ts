import { useState, useEffect } from "react";

import convertTimeToString from '@/utils/convertTimeToString'

const Timer = function (initial: number, ascending: boolean) {
    const [counter, setCounter] = useState(initial)
    // const [timer, setTimer] = useState(convertTimeToString(initial))
    const [interval, setCounterInterval] = useState<number>()

    function stop() {
        window.clearInterval(interval)
    }
    // order - determines if ascending or descending counter
    function start() {
        let counterInterval = window.setInterval(() => {
            setCounter( (prev) => {
                return ascending ? prev + 1 : prev - 1
            })
            // setTimer(convertTimeToString(ascending ? counter + 1 : counter - 1))
        }, 1000)
        setCounterInterval(counterInterval)
    }

    function reset() {
        console.log('reset from usetimer time', initial)
        setCounter(initial)
        // setTimer(convertTimeToString(initial))
    }
    
    return { timer: convertTimeToString(counter), counter, stop, start, reset }
}

export default Timer