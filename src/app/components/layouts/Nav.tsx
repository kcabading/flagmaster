'use client'

import Link from "next/link"
import { useState, useEffect } from 'react'
import SigninButton from "../SigninButton"


import { Switch } from '@headlessui/react'
import useColorMode from "@/app/hooks/useColorMode"
import Image from "next/image"

import {AiFillSetting, AiFillFacebook}  from "react-icons/ai";
import useIsLoggedIn from '@/app/hooks/useIsLoggedIn'

const Navigation = function () {

    const [switcheEnabled, setSwitchEnabled] = useState(false)
    const [mobileNavEnabled, setMobileNavEnabled] = useState(false)
    const [colorMode, setColorMode] = useColorMode()

    const isLoggedIn = useIsLoggedIn()

    useEffect(() => {   
        setColorMode( switcheEnabled ? "dark" : "light")
    }, [switcheEnabled])

    return (
        <>
            <nav className="w-full fixed top-0 backdrop-blur border-b border-slate-900/10 dark:border-slate-50/[0.06] bg-white/75 dark:bg-slate-900/75 py-3 max-lg:px-4">
                <div className="z-10 lg:z-50 flex items-center justify-between w-full lg:w-3/4 m-auto">
                    <h1 className="text-black font-bold font-mont dark:text-white">
                        <Link href="/"><Image className="inline" src="/flagmaster.png" width={50} height={50} alt="flagmaster logo"/>Flag Master</Link>
                    </h1>
                    <div className="flex max-sm:hidden dark:text-white">
                        <Link href="/flags">Flags</Link>
                        <Link href="/leaderboards" className="ml-3" >Leaderboards</Link>
                        { isLoggedIn && <Link className="ml-3" href="/play">Play</Link> }
                    </div>
                    <div className="flex max-sm:hidden dark:text-white">
                        <SigninButton />
                        { isLoggedIn && <Link className="ml-3 text-2xl" href="/settings"><AiFillSetting/></Link> }
                        <Switch
                            checked={switcheEnabled}
                            onChange={setSwitchEnabled}
                            className={`${
                                switcheEnabled ? 'bg-blue-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full sm:ml-3`}
                            >
                            <span className="sr-only">Enable notifications</span>
                            <span
                                className={`${
                                    switcheEnabled ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    </div>
                    <div className="sm:hidden cursor-pointer dark:text-white" onClick={ () => setMobileNavEnabled(!mobileNavEnabled)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                    </div>
                </div>
            </nav>
            <nav className={`
                ${mobileNavEnabled ? 'right-0' : '-right-80'}
                z-10 w-[50%] h-full fixed bg-slate-800/90 transition-right ease-in-out duration-200 sm:hidden p-5 text-white`}>
                <div className="flex flex-col">
                    <span className="cursor-pointer flex justify-end" onClick={()=>setMobileNavEnabled(!mobileNavEnabled) }>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                    <Link href="/leaderboards" className="text-xl sm:ml-3 mb-3 mt-5">Leaderboards</Link>
                    { isLoggedIn && <Link href="/play" className="text-xl sm:ml-3 mb-3">Play</Link> }
                    <SigninButton />
                    <div className="text-xl flex justify-between mb-3">
                        <label htmlFor="">Dark Mode?</label>
                        <Switch
                            checked={switcheEnabled}
                            onChange={setSwitchEnabled}
                            className={`${
                                switcheEnabled ? 'bg-blue-300' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full sm:ml-3`}
                            >
                            <span className="sr-only">Dark Mode</span>
                            <span
                                className={`${
                                    switcheEnabled ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    </div>
                    <div className="social-icons flex justify-between mt-3">
                        <a href="" className="github text-2xl"><AiFillFacebook /></a>
                    </div>
                </div>
            </nav>
        </>    
    )
}

export default Navigation