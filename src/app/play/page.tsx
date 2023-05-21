'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import useFlagGenerator from '@/app/hooks/useFlagGenerator'
import useTimer from '@/app/hooks/useTimer'
import Results from '@/app/components/Results'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

type AnswerHistory = {
  answer: string,
  correct: string
}

const Play = function() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    useEffect(() => {

        if (searchParams.has('try')) {
            if(searchParams.has('flag')) setNoOfFlags(Number(searchParams.get('flag')))
            setStartQuiz(true)
            start()   
        }

        return () => {
            setStartQuiz(false)
            reset()
        }

        // You can now use the current URL
    }, [pathname, searchParams]);

    console.log(searchParams.get('try'))
    console.log(searchParams.get('flag'))

    const [ noOfFlags, setNoOfFlags] = useState(5)
    const [ flagCount, setFlagCount ] = useState(0)

    const [ startQuiz, setStartQuiz ] = useState(false)
    const { timer, start, stop, reset } = useTimer(0, true)

    const [ answerHistory, setAnswerHistory ] = useState<AnswerHistory[]>([])
    const [ chosenFlag, setChosenFlag ] = useState<string | null>(null)
    
    const [ correctAnswer, setCorrectAnswer ] = useState(0)
    const [ answered, setAnswered ] = useState(false)
    const { flag, flagUrl, choices, usedFlags, setUsedFlags } = useFlagGenerator(flagCount)

    function handleStartQuiz() {
        setStartQuiz(true)
        start()
    }

    function handleFlagNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value)
        setNoOfFlags(Number(e.target.value))
    } 

    function handleReset() {
        setUsedFlags('[]')
        setChosenFlag('')
        setFlagCount(0)
        setCorrectAnswer(0)
        setAnswerHistory([])
        start()
    }
    
    function handleGuessFlag( guess: string ) {
        setChosenFlag(guess)
        setAnswered(true)
        
        window.setTimeout(() => {
        setChosenFlag('')
        setAnswerHistory([ ...answerHistory, { answer: guess, correct: flag }])
        setFlagCount( prev => prev + 1)
        if (guess === flag) setCorrectAnswer( prev => prev + 1)
        setAnswered(false)
        let parsedFlags = JSON.parse(usedFlags)
        if(usedFlags.length > 0) {
            parsedFlags.push(flag)
            setUsedFlags(JSON.stringify(parsedFlags))
        } else {
            setUsedFlags(JSON.stringify([flag]))
        }
        }, 1000)
    }

    if (flagCount === noOfFlags) stop()

    return (
        <>
            {
            flagCount === noOfFlags
                ? 
                <Results
                    correctAnswer={correctAnswer}
                    noOfFlags={noOfFlags}
                    timer={timer}
                    handleReset={handleReset}
                    answerHistory={answerHistory} 
                />
                :
                <div className='lg:w-1/2 w-full text-center max-lg:px-4'>
                    <div className="counter flex justify-between w-full items-center">
                        <div className="w-1/3 text-xl text-left">Flags: {flagCount}/{noOfFlags}</div>
                        <div className="font-bold text-4xl">{timer}</div>
                        <div className="w-1/3 text-xl text-right">Correct Answers: {correctAnswer}/{noOfFlags}</div>
                    </div>
                    <div className='mt-5'>
                    { flagUrl && <Image priority={true} src={flagUrl} width={300} height={300} alt="flag image" className="m-auto md:w-1/2 max-sm:w-full border-slate-500 border-2" /> }
                    </div>
                    <div className="choices mt-5">
                    <div className="grid grid-cols-2 gap-4">
                        { 
                        choices.map( (option, index) => {
                            return (
                            <button
                                disabled={answered ? true : false}
                                key={index} 
                                className={`
                                ${ chosenFlag === flag && chosenFlag === option && 'bg-green-400'} 
                                ${ chosenFlag !== flag && chosenFlag === option && 'bg-red-400'}
                                border-2 p-2 rounded-md sm:hover:border-blue-500`} 
                                onClick={ () => handleGuessFlag(option) }>{option}
                            </button>
                            )
                        })
                        }
                    </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Play