'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import useFlagGenerator from '@/hooks/useFlagGenerator'
import useTimer from '@/hooks/useTimer'
import Results from '@/components/game/Results'
import convertTimeToNumber from '@/utils/convertTimetoNumber'
import convertTimeToString from '@/utils/convertTimeToString'
import GameGuessLetters from '@/components/game/GameGuessLetters'
import GameMultipleChoices from './GameMultipleChoices'
import Timer from '../Timer'

import { AiFillEye } from 'react-icons/ai'
import {BsCircleHalf} from 'react-icons/bs'
import GameSpeech from './GameSpeech'
import useBrowserCompatibility from '@/hooks/useBrowserCompatibility'
import CommonAlertDialog, { AlertDialogTypes } from '../common/CommonAlertDialog'
import { useRouter } from 'next/navigation'

type AnswerHistory = {
  answer: string,
  correct: string
}

interface GameProps {
    challengeId: string,
    flagNumberOption: number,
    initialTimeOption: number,
    ascTimeOption: boolean,
    modeOption: string // multiple, fill,
    difficultyOption: string,
    continent: string,
    handleGameFinished: (
        challengeId: string, 
        timer: string | number, 
        status: string,
        flagNumberOption: number,
        correctAnswer: number
        ) => void
}

const Game = function({ challengeId, flagNumberOption, initialTimeOption, ascTimeOption, modeOption, difficultyOption, continent, handleGameFinished }:GameProps ) {

    console.log('GAME RENDER')
    const router = useRouter();
    const [ flagCount, setFlagCount ] = useState(0)
    // const { start, stop, reset } = useTimer(initialTimeOption, ascTimeOption)
    const [ answerHistory, setAnswerHistory ] = useState<AnswerHistory[]>([])
    const [ chosenFlag, setChosenFlag ] = useState<string | null>(null)

    const [timeTaken, setTimeTaken] = useState<string>('')
    const [isTimesUp, setIsTimesUp] = useState<boolean>(false)
    const [flagCompleted, setFlagCompleted] = useState<boolean>(false)
    const [isGameFinish, setIsGameFinish] =useState<boolean>(false)

    const { isCompatible } = useBrowserCompatibility(modeOption)
    
    const [ powerUps, setPowerUps] = useState<string[]>([])
    const [ powerUpsUsed, setPowerUpUsed] = useState(false)
    
    const [ correctAnswer, setCorrectAnswer ] = useState(0)
    const [ answered, setAnswered ] = useState(false)
    const { flag, flagUrl, choices, usedFlags, setUsedFlags, generateNewFlag } = useFlagGenerator(flagCount, difficultyOption, continent)

    function handleReset() {
        setUsedFlags('[]')
        setChosenFlag('')
        setFlagCount(0)
        setCorrectAnswer(0)
        setAnswerHistory([])
        setPowerUps([])
        setTimeTaken('')
        setIsTimesUp(false)
        setFlagCompleted(false)
        setIsGameFinish(false)
    }
    
    function handleGuessFlag( guess: string ) {
        setPowerUpUsed(false)
        setChosenFlag(guess)
        setAnswered(true)
        
        window.setTimeout(() => {
            setChosenFlag('')
            setAnswerHistory([ ...answerHistory, { answer: guess, correct: flag }])
            setFlagCount( prev => prev + 1)
            if (guess === flag) setCorrectAnswer( prev => prev + 1)
            setAnswered(false)
            
            setUsedFlags((prev:string) => {
                let newUsedFlags: string = '[]'
                let parsedFlags = JSON.parse(prev)

                if(usedFlags.length > 0) {
                    parsedFlags.push(flag)
                    newUsedFlags = JSON.stringify(parsedFlags)
                } else {
                    newUsedFlags = JSON.stringify([flag])
                }
                return newUsedFlags
            })

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

    if ( !isGameFinish && !flagCompleted && flagCount === flagNumberOption) {
        console.log('set flag completed')
        setFlagCompleted(true)
    }

    function handleGameFinish(timer: string) {
        let timeTaken =  initialTimeOption > 0 ? convertTimeToString(initialTimeOption - convertTimeToNumber(timer)) : timer
        let status =  correctAnswer < (flagNumberOption / 2) || answerHistory.length !== flagNumberOption ? 'FAILED' : 'PASSED'
        handleGameFinished(challengeId, timeTaken, status, flagNumberOption, correctAnswer)
        setTimeout(() => {
            setTimeTaken(timeTaken)
            setIsGameFinish(true)    
        }, 500);
    }
    
    useEffect(() => {
        console.log('handle reset')
        handleReset()
        return () => {
            handleReset()
        }
    }, [flagNumberOption, initialTimeOption, ascTimeOption, modeOption, difficultyOption])


    const renderGameMode = (modeOption: string): any => {

        switch (modeOption) {
            case 'fill':
                return  (
                    <GameGuessLetters
                        powerUps={powerUps} 
                        flagLetters={flag} 
                        handleCorrectAnswer={handleGuessFlag} 
                        handleIncorrectAnswer={handleIncorrectAnswer} 
                        handleSkip={handleSkip}
                    />
                )
            case 'multiple':
                return (
                    <GameMultipleChoices
                        powerUps={powerUps}
                        flag={flag} 
                        answered={answered} 
                        chosenFlag={chosenFlag} 
                        choices={choices}
                        handleGuessFlag={handleGuessFlag} 
                    />
                )
            case 'speech':
                return (
                    <GameSpeech 
                        flag={flag}
                        handleGuessFlag={handleGuessFlag}
                        powerUps={powerUps}
                    />
                )
            default:
                break;
        }
    }

    useEffect(() => {
        if (flagCount !== flagNumberOption) {
            generateNewFlag()
        }
    }, [flagCount])

    return (
        <>
            { !isCompatible
                && 
                <CommonAlertDialog 
                    show={true} 
                    type={AlertDialogTypes.DANGER} 
                    text='Speech Recognition not supported by your browser'
                    cancelText='Go Back'
                    cancelHandler={()=>router.back()}/>}

            {
                isGameFinish
                ? 
                <Results
                    correctAnswer={correctAnswer}
                    noOfFlags={flagNumberOption}
                    timer={timeTaken}
                    initialTime={initialTimeOption}
                    handleReset={handleReset}
                    answerHistory={answerHistory}
                />
                :
                <div className='lg:w-1/2 w-full text-center max-lg:px-4 relative'>
                    <div className="counter flex justify-between w-full items-center max-sm:top-[70px] max-sm:dark:bg-slate-900 max-sm:sticky max-sm:bg-white max-sm:py-3">
                        <div className="w-1/3 sm:text-xl text-left">Flags: {flagCount}/{flagNumberOption}</div>
                        <Timer
                            initialTimeOption={5}
                            ascTimeOption={ascTimeOption}
                            handleGameFinish={handleGameFinish}
                            flagCompleted={flagCompleted}
                        />

                        <div className="w-1/3 sm:text-xl text-right">Correct: {correctAnswer}/{flagNumberOption}</div>
                    </div>
                    <div className='mt-5'>
                    { flagUrl && <Image priority={true} src={flagUrl} width={300} height={300} alt="flag image" className="m-auto md:w-1/2 max-sm:w-full border-slate-500 border-2" /> }
                    </div>
                    {
                        modeOption === 'fill'
                        ?
                        <div className="power-ups mt-4">
                            <button title='Revel 1 letter' disabled={powerUps.includes('reveal1') || powerUpsUsed ?  true: false} onClick={ () => addPowerUps('reveal1')} className={`${powerUps.includes('reveal1') ? 'bg-gray-300 ': 'bg-lime-500'}  border-2 px-2 py-1 text-white rounded-md mx-2`}>
                                <AiFillEye className='inline'/> Reveal 1</button>
                            <button title='Revel 2 letters' disabled={powerUps.includes('reveal2') || powerUpsUsed ? true: false} onClick={ () => addPowerUps('reveal2')} className={`${powerUps.includes('reveal2') ? 'bg-gray-300 ': 'bg-lime-500'}  border-2 px-2 py-1 text-white rounded-md mx-2`}>
                                <AiFillEye className='inline' /><AiFillEye className='inline' /> Reveal 2</button>
                        </div>
                        :
                        <div className="power-ups mt-4">
                            <button title='Remove 2 Incorrect answers' disabled={powerUps.includes('5050') || powerUpsUsed ?  true: false} onClick={ () => addPowerUps('5050')} className={`${powerUps.includes('5050') ? 'bg-gray-300 ': 'bg-lime-500'}  border-2 px-2 py-1 text-white rounded-md mx-2`}><BsCircleHalf className='inline'/> 50/50</button>
                        </div>
                    }
                    <div className="choices mt-5">

                        {/* <GameSpeech 
                            flag={flag}
                            handleGuessFlag={handleGuessFlag}
                            powerUps={powerUps}
                        /> */}

                        { renderGameMode(modeOption)}
                        {/* {

                            {this.renderSwitch(param)}

                            // modeOption === 'fill'
                            // ? <GameGuessLetters
                            //     powerUps={powerUps} 
                            //     flagLetters={flag} 
                            //     handleCorrectAnswer={handleGuessFlag} 
                            //     handleIncorrectAnswer={handleIncorrectAnswer} 
                            //     handleSkip={handleSkip}/>
                            // : <GameMultipleChoices
                            //     powerUps={powerUps}
                            //     flag={flag} 
                            //     answered={answered} 
                            //     chosenFlag={chosenFlag} 
                            //     choices={choices}
                            //     handleGuessFlag={handleGuessFlag} />
                        } */}
                    </div>
                </div>
            }
        </>
    )
}

export default Game