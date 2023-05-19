'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import useFlagGenerator from './hooks/useFlagGenerator'
import Timer from './components/Timer'
import QuizOptions from '@/app/components/QuizOptions'
import useTimer from '@/app/hooks/useTimer'
import Results from './components/Results'


type AnswerHistory = {
  answer: string,
  correct: string
}

export default function Home() {
  console.log('render')

  const [ noOfFlags, setNoOfFlags] = useState(0)
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
    setStartQuiz(false)
    reset()
  }
  
  function handleGuessFlag( guess: string ) {
    setChosenFlag(guess)
    setAnswered(true)
    
    window.setTimeout(() => {
      setAnswerHistory([ ...answerHistory, { answer: guess, correct: flag }])
      setFlagCount(flagCount + 1)
      if (guess === flag) setCorrectAnswer(correctAnswer + 1)
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
    <main className="flex flex-col items-center p-24 w-full m-auto h-screen dark:bg-slate-900 dark:text-white">
      <h1 className='font-bold text-6xl mb-5'>Guess The Flag</h1>
      { 
        !startQuiz
        ? 
          <div>
            <QuizOptions setNoOfFlags={handleFlagNumberChange}/>
            <button className='border-2 border-slate-500 rounded-md p-2' onClick={handleStartQuiz}>START QUIZ</button>
          </div>
        :
          flagCount === noOfFlags
          ? 
          <Results 
            correctAnswer={correctAnswer}
            noOfFlags={noOfFlags}
            timer={timer}
            handleReset={handleReset}
            answerHistory={answerHistory} />
          :
          <div className='w-2/3 m-auto text-center'>
            <div className="counter flex justify-between w-full">
              <div>Flags: {flagCount}/{noOfFlags}</div>
              <div>Timer: {timer}</div>
              <div>Correct Answers: {correctAnswer}/{noOfFlags}</div>
            </div>
            <div>
            { flagUrl && <Image priority={true} src={flagUrl} width={300} height={300} alt="flag image" className="w-1/2 m-auto" /> }
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
                        ${ chosenFlag === flag && chosenFlag === option && 'bg-green-500 border-green-700'} 
                        ${ chosenFlag !== flag && chosenFlag === option && 'bg-red-500 border-red-700'}
                        border-2 p-2 rounded-md hover:border-blue-500`} 
                        onClick={ () => handleGuessFlag(option) }>{option}
                      </button>
                    )
                  })
                }
              </div>
            </div>
          </div>
        }
    </main>
  )
}
