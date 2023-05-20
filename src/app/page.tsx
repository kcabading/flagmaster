'use client'

import Image from 'next/image'
import { useState } from 'react'
import useFlagGenerator from './hooks/useFlagGenerator'
import QuizOptions from '@/app/components/QuizOptions'
import useTimer from '@/app/hooks/useTimer'
import Results from './components/Results'


type AnswerHistory = {
  answer: string,
  correct: string
}

export default function Home() {
  console.log('render')

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
    <main className="flex flex-col items-center w-full m-auto dark:bg-slate-900 dark:text-white pt-32">
      { 
        !startQuiz
        ?
          <div className='lg:w-3/4 max-lg:px-4'>
            <div className="intro flex flex-col sm:flex-row">
              <div className="text sm:w-2/3 max-sm:pb-10">
                <h1 className='font-bold text-4xl mb-5'>Welcome to FlagMaster!</h1>
                <p className='text-xl'>Think you know flags? Prepare for a thrilling challenge that will put your knowledge to the test. Guess flags from around the world, earn points, and conquer the leaderboard. Become the ultimate FlagMaster champion today!</p>
              </div>
              <div className="quick-start flex flex-col place-items-center sm:w-1/3">
                  <QuizOptions setNoOfFlags={handleFlagNumberChange}/>
                  <button className='mt-3 border-2 border-slate-500 rounded-md p-2 hover:bg-amber-400' onClick={handleStartQuiz}>START QUIZ</button>
              </div>
            </div>
            <div className="flex flex-col items-center mt-5 sm:flex-row">
              <Image priority={true} src='/leaderboards.png' height={300} width={300} alt='leaderboards image' className='sm:w-1/3 w-3/4'/>
              <div className="sm:w-2/3 w-full sm:text-right sm:pl-10 max-sm:mt-5">
                <h2 className='font-bold text-3xl mb-5 text-cyan-500'>Climb the Leaderboards!</h2>
                <p className='text-md'>FlagMaster isn't just a solo adventure; it's a global competition. Connect with friends or challenge fellow players from around the world in our multiplayer mode. Rise through the ranks, showcase your flag prowess, and establish yourself as the ultimate FlagMaster.</p>
              </div>
            </div>
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
          <div className='lg:w-1/2 w-full text-center'>
            <div className="counter flex justify-between w-full">
              <div>Flags: {flagCount}/{noOfFlags}</div>
              <div>Timer: {timer}</div>
              <div>Correct Answers: {correctAnswer}/{noOfFlags}</div>
            </div>
            <div className='mt-5'>
            { flagUrl && <Image priority={true} src={flagUrl} width={300} height={300} alt="flag image" className="m-auto lg:w-1/2" /> }
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
