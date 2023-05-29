'use client'

import Image from 'next/image'
import { useState, useEffect, ChangeEvent, useMemo } from 'react'
import useFlagGenerator from '@/app/hooks/useFlagGenerator'
import useTimer from '@/app/hooks/useTimer'
import Results from '@/app/components/game/Results'
import convertTimeToNumber from '@/app/utils/convertTimetoNumber'
import GameGuessLetters from '@/app/components/game/GameGuessLetters'
import GameMultipleChoices from './GameMultipleChoices'
import Timer from '../Timer'

type AnswerHistory = {
  answer: string,
  correct: string
}

interface GameProps {
    flagNumberOption: number,
    initialTimeOption: number,
    ascTimeOption: boolean,
    modeOption: string // multiple, fill,
    difficultyOption: string
}

const Game = function({ flagNumberOption, initialTimeOption, ascTimeOption, modeOption, difficultyOption }:GameProps ) {

    const [ flagCount, setFlagCount ] = useState(0)
    const { timer, start, stop, reset } = useTimer(initialTimeOption, ascTimeOption)
    const [ answerHistory, setAnswerHistory ] = useState<AnswerHistory[]>([])
    const [ chosenFlag, setChosenFlag ] = useState<string | null>(null)
    
    const [ powerUps, setPowerUps] = useState<string[]>([])
    const [ powerUpsUsed, setPowerUpUsed] = useState(false)
    
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
        setPowerUps([])
        reset()
        start()
    }
    
    function handleGuessFlag( guess: string ) {
        setPowerUpUsed(false)
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

    function addPowerUps(powerup: string) {
        setPowerUpUsed(true)
        setPowerUps((prev) => {
            return [
                ...prev,
                powerup
            ]
        })
    }

    if (flagCount === flagNumberOption ||  (!ascTimeOption && timer === '00:00')) stop()
        
    
    useEffect(() => {
        start()
        return () => {
            handleReset()
        }
    }, [flagNumberOption, initialTimeOption, ascTimeOption, modeOption, difficultyOption]);

    return (
        <>
            {
                flagCount === flagNumberOption ||  (!ascTimeOption && timer === '00:00')
                ? 
                <Results
                    correctAnswer={correctAnswer}
                    noOfFlags={flagNumberOption}
                    timer={timer}
                    initialTime={initialTimeOption}
                    handleReset={handleReset}
                    answerHistory={answerHistory}
                />
                :
                <div className='lg:w-1/2 w-full text-center max-lg:px-4'>
                    <div className="counter flex justify-between w-full items-center">
                        <div className="w-1/3 sm:text-xl text-left">Flags: {flagCount}/{flagNumberOption}</div>
                        {/* <div className={`${initialTimeOption > 0 && convertTimeToNumber(timer) <= 10 ? 'text-red-500' : ''} font-bold text-4xl`}>{timer}</div> */}

                        <Timer 
                            timer={timer}
                            initialTimeOption={initialTimeOption}
                        />

                        <div className="w-1/3 sm:text-xl text-right">Answers: {correctAnswer}/{flagNumberOption}</div>
                    </div>
                    <div className='mt-5'>
                    { flagUrl && <Image priority={true} src={flagUrl} width={300} height={300} alt="flag image" className="m-auto md:w-1/2 max-sm:w-full border-slate-500 border-2" /> }
                    </div>
                    {
                        modeOption === 'fill'
                        ?
                        <div className="power-ups mt-4">
                            <button disabled={powerUps.includes('reveal1') || powerUpsUsed ?  true: false} onClick={ () => addPowerUps('reveal1')} className={`${powerUps.includes('reveal1') ? 'bg-gray-300 ': 'bg-lime-500'}  border-2 px-2 py-1 text-white rounded-md mx-2`}>Reveal 1</button>
                            <button disabled={powerUps.includes('reveal2') || powerUpsUsed ? true: false} onClick={ () => addPowerUps('reveal2')} className={`${powerUps.includes('reveal2') ? 'bg-gray-300 ': 'bg-lime-500'}  border-2 px-2 py-1 text-white rounded-md mx-2`}>Reveal 2</button>
                        </div>
                        :
                        <div className="power-ups mt-4">
                            <button disabled={powerUps.includes('5050') || powerUpsUsed ?  true: false} onClick={ () => addPowerUps('5050')} className={`${powerUps.includes('5050') ? 'bg-gray-300 ': 'bg-lime-500'}  border-2 px-2 py-1 text-white rounded-md mx-2`}>50/50</button>
                        </div>
                    }
                    <div className="choices mt-5">
                        {
                            modeOption === 'fill'
                            ? <GameGuessLetters 
                                powerUps={powerUps} 
                                flagLetters={flag} 
                                handleCorrectAnswer={handleGuessFlag} 
                                handleIncorrectAnswer={handleIncorrectAnswer} 
                                handleSkip={handleSkip}/>
                            : <GameMultipleChoices
                                powerUps={powerUps}
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