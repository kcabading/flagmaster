'use client'

import Image from 'next/image'
import { useState, useEffect, ChangeEvent, useMemo } from 'react'
import useFlagGenerator from '@/app/hooks/useFlagGenerator'
import useTimer from '@/app/hooks/useTimer'
import Results from '@/app/components/game/Results'
import convertTimeToNumber from '@/app/utils/convertTimetoNumber'
import GameGuessLetters from '@/app/components/game/GameGuessLetters'
import GameMultipleChoices from './GameMultipleChoices'

type AnswerHistory = {
  answer: string,
  correct: string
}

interface GameProps {
    startOption: boolean,
    flagNumberOption: number,
    initialTimeOption: number,
    ascTimeOption: boolean,
    modeOption: string // multiple, fill,
    difficultyOption: string
}

const Game = function({ startOption, flagNumberOption, initialTimeOption, ascTimeOption, modeOption, difficultyOption }:GameProps ) {

    console.log('game render')

    const [ noOfFlags, setNoOfFlags] = useState(flagNumberOption)
    const [ flagCount, setFlagCount ] = useState(0)
    const { timer, start, stop, reset } = useTimer(initialTimeOption, ascTimeOption)
    const [ answerHistory, setAnswerHistory ] = useState<AnswerHistory[]>([])
    const [ chosenFlag, setChosenFlag ] = useState<string | null>(null)
    
    const [ correctAnswer, setCorrectAnswer ] = useState(0)
    const [ answered, setAnswered ] = useState(false)
    const { flag, flagUrl, choices, usedFlags, setUsedFlags } = useFlagGenerator(flagCount, difficultyOption)

    function handleReset() {
        console.log('handlereset')
        setUsedFlags('[]')
        setChosenFlag('')
        setFlagCount(0)
        setCorrectAnswer(0)
        setAnswerHistory([])
        reset()
        start()
    }
    
    function handleGuessFlag( guess: string ) {
        console.log('handle guess flag')
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
        }, 500)
    }

    function handleSkip() {
        handleGuessFlag('skipped')
    }

    function handleIncorrectAnswer() {
        console.log('incorrect answer')
    }

    useEffect(() => {
        start()
        return () => {
            reset()
        }
    }, [startOption]);

    if (flagCount === noOfFlags ||  (!ascTimeOption && timer === '00:00')) stop()

    return (
        <>
            {
            flagCount === noOfFlags || (!ascTimeOption && timer === '00:00')
                ? 
                <Results
                    correctAnswer={correctAnswer}
                    noOfFlags={noOfFlags}
                    timer={timer}
                    initialTime={initialTimeOption}
                    handleReset={handleReset}
                    answerHistory={answerHistory}
                />
                :
                <div className='lg:w-1/2 w-full text-center max-lg:px-4'>
                    <div className="counter flex justify-between w-full items-center">
                        <div className="w-1/3 sm:text-xl text-left">Flags: {flagCount}/{noOfFlags}</div>
                        <div className={`${initialTimeOption > 0 && convertTimeToNumber(timer) <= 10 ? 'text-red-500' : ''} font-bold text-4xl`}>{timer}</div>
                        <div className="w-1/3 sm:text-xl text-right">Answers: {correctAnswer}/{noOfFlags}</div>
                    </div>
                    <div className='mt-5'>
                    { flagUrl && <Image priority={true} src={flagUrl} width={300} height={300} alt="flag image" className="m-auto md:w-1/2 max-sm:w-full border-slate-500 border-2" /> }
                    </div>
                    <div className="choices mt-5">
                        {
                            modeOption === 'fill'
                            ? <GameGuessLetters flagLetters={flag} handleCorrectAnswer={handleGuessFlag} handleIncorrectAnswer={handleIncorrectAnswer} handleSkip={handleSkip}/>
                            : <GameMultipleChoices 
                                flag={flag} 
                                answered={answered} 
                                chosenFlag={chosenFlag} 
                                choices={choices}
                                handleGuessFlag={handleGuessFlag} />
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Game