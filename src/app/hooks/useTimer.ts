import { useState, useEffect } from "react";

const Timer = function (initial: number, ascending: boolean) {
    const [counter, setCounter] = useState(initial)
    const [timer, setTimer] = useState('00.00')
    const [interval, setInterval] = useState<number>()

    function convertToTime(counter: number) {   
        let time = String(Math.floor(counter / 60)).padStart(2, '0') + ':' + String(Math.floor(counter % 60)).padStart(2, '0')
        console.log('converting time', time)
        return time
    }

    function stop() {
        window.clearInterval(interval)
    }

    function start() {
        reset()
        let counterInterval = window.setInterval(() => {
            setCounter( (counter) => {
                setTimer(convertToTime(ascending ? counter + 1 : counter - 1))
                return ascending ? counter + 1 : counter - 1
            })            
        }, 1000);
        setInterval(counterInterval)
    }

    function reset() {
        setCounter(0)
        setTimer('00.00')
    }
    
    return { timer, stop, start, reset }
}

export default Timer