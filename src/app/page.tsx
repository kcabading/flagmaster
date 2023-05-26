'use client'

import Image from 'next/image'
import { useState } from 'react'
import QuizOptions from '@/app/components/QuizOptions'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

export default function Home() {
  console.log('render')
  
  const router = useRouter();
  const { data: session } = useSession();

  const [ noOfFlags, setNoOfFlags] = useState(5)
  const [ level, setLevel] = useState('easy')

  function handleTryNow() {
    router.push(`try?flag=${noOfFlags}&level=${level}`);
  }

  function handleFlagNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value)
    setNoOfFlags(Number(e.target.value))
  }

  function handleLevelChange(level: string) {

    console.log('event', level)
    setLevel(level)
  }

  return (
      <>      
        <div className='lg:w-3/4 max-lg:px-4'>
          <div className="intro flex flex-col sm:flex-row mb-20">
            <div className="text sm:w-2/3 max-sm:pb-10">
              <h1 className='font-bold text-4xl mb-5'>Welcome to FlagMaster!</h1>
              <p className='text-xl'>Think you know flags? Prepare for a thrilling challenge that will put your knowledge to the test. Guess flags from around the world, earn points, and conquer the leaderboard. Become the ultimate FlagMaster champion today!</p>
            </div>
            <div className="quick-start flex flex-col place-items-center sm:w-1/3">
                <QuizOptions setNoOfFlags={handleFlagNumberChange} setLevel={handleLevelChange}/>
                <button className='mt-3 border-2 border-slate-500 rounded-lg py-2 px-4 font-bold hover:bg-amber-400' onClick={handleTryNow}>Try it Now !</button>
            </div>
          </div>
          <div className="flex flex-col items-center mt-5 sm:flex-row">
            <Image priority={true} src='/leaderboards.png' height={300} width={300} alt='leaderboards image' className='sm:w-1/3 w-3/4'/>
            <div className="sm:w-2/3 w-full sm:text-right sm:pl-10 max-sm:mt-5">
              <h2 className='font-bold text-3xl mb-5 text-cyan-500'>Climb the Leaderboards!</h2>
              <p className='text-md'>FlagMaster isn&apos;t just a solo adventure; it&apos;s a global competition. Connect with friends or challenge fellow players from around the world in our multiplayer mode. Rise through the ranks, showcase your flag prowess, and establish yourself as the ultimate FlagMaster.</p>
              {
                !session?.user?.email && <button onClick={ (e) => signIn('cognito') } className='mt-3 border-2 border-slate-500 rounded-lg py-2 px-4 font-bold hover:bg-amber-400' >Sign In Now !</button>
              }
            </div>
          </div>
        </div>
    </>
  )
}
