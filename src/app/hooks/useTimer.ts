import { useState, useEffect } from "react";

import convertTimeToString from '@/app/utils/convertTimeToString'

const Timer = function (initial: number, ascending: boolean) {
    const [counter, setCounter] = useState(initial)
    const [timer, setTimer] = useState(convertTimeToString(initial))
    const [interval, setInterval] = useState<number>()

    function stop() {
        window.clearInterval(interval)
    }
    // order - determines if ascending or descending counter
    function start() {
        let counterInterval = window.setInterval(() => {
            setCounter( (prev) => {
                setTimer(convertTimeToString(ascending ? prev + 1 : prev - 1))
                return ascending ? prev + 1 : prev - 1
            })            
        }, 1000);
        setInterval(counterInterval)
    }

    function reset() {
        console.log('reset from usetimer time', initial)
        setCounter(initial)
        setTimer(convertTimeToString(initial))
    }
    
    return { timer, counter, stop, start, reset }
}

export default Timer