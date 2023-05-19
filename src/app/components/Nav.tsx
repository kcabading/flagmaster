'use client'

import Link from "next/link"
import { useState, useEffect } from 'react'

import { Switch } from '@headlessui/react'
import useColorMode from "@/app/hooks/useColorMode"

import {AiFillGithub, AiFillLinkedin, AiFillMediumCircle}  from "react-icons/ai";


const Navigation = function () {
    const [switcheEnabled, setSwitchEnabled] = useState(false)
    const [mobileNavEnabled, setMobileNavEnabled] = useState(false)
    const [colorMode, setColorMode] = useColorMode()

    useEffect(() => {   
        setColorMode( switcheEnabled ? "dark" : "light")
    }, [switcheEnabled])

    return (
        <nav>
            <div className="z-10 fixed top-0 w-full flex justify-around p-5
             backdrop-blur flex-none  lg:z-50 border-b border-slate-900/10 dark:border-slate-50/[0.06] bg-white/75 dark:bg-slate-900/75">
                <h1 className="text-black font-bold font-mont dark:text-white">
                    <Link href="/">Guess the flag</Link>
                </h1>
                <div className="flex max-sm:hidden dark:text-white">
                    <Link href="/">Ranking</Link>
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
            <div className={`
                    ${mobileNavEnabled ? 'right-0' : '-right-80'}
                    z-10 w-[50%] h-full fixed bg-slate-800/90 max-sm:top-0 transition-right ease-in-out duration-200 sm:hidden p-5 text-white`}>
                <div className="flex flex-col">
                    <span className="cursor-pointer flex justify-end" onClick={()=>setMobileNavEnabled(!mobileNavEnabled) }>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                    <Link href="/about-me" className="sm:ml-3">About Me</Link>
                    <Link href="/blog" className="sm:ml-3">Blog</Link>
                    <Link href="/contact" className="sm:ml-3">Get in touch</Link>
                    <div className="flex justify-between">
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
                    <div className="social-icons flex justify-between">
                        <a href="" className="github text-2xl"><AiFillGithub /></a>
                        <a href="" className="linkedin  text-2xl"><AiFillLinkedin /></a>
                        <a href="" className="medium text-2xl"><AiFillMediumCircle /></a>
                    </div>
                </div>
            </div>
        </nav>
        
    )
}

export default Navigation