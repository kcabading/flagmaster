'use client'

import Link from "next/link"
import { useState, useEffect } from 'react'
import SigninButton from "../SigninButton"


import { Switch } from '@headlessui/react'
import useColorMode from "@/hooks/useColorMode"
import Image from "next/image"

import {AiOutlineMenu, AiOutlineClose, AiFillSetting, AiFillFacebook, AiFillInstagram}  from "react-icons/ai";
import useIsLoggedIn from '@/hooks/useIsLoggedIn'

import { useRouter } from "next/navigation"

const Navigation = function () {

    const router = useRouter()

    const [switcheEnabled, setSwitchEnabled] = useState(false)
    const [mobileNavEnabled, setMobileNavEnabled] = useState(false)
    const [colorMode, setColorMode] = useColorMode()
    const isLoggedIn = useIsLoggedIn()

    const handleNavClick = function(link: string) {
        setMobileNavEnabled(false)
        router.push(link)
    }

    useEffect(() => {   
        setColorMode( switcheEnabled ? "dark" : "light")
    }, [switcheEnabled])

    return (
        <>
            <nav className="w-full fixed backdrop-blur border-b border-slate-900/10 dark:border-slate-50/[0.06] bg-white/75 dark:bg-slate-900/75 py-3 max-lg:px-4">
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
                    {
                        mobileNavEnabled
                        ? <AiOutlineClose className="sm:hidden text-lg cursor-pointer dark:text-white" onClick={ () => setMobileNavEnabled(!mobileNavEnabled)} />
                        : <AiOutlineMenu className="sm:hidden text-lg cursor-pointer dark:text-white" onClick={ () => setMobileNavEnabled(!mobileNavEnabled)}/>
                    }
                </div>
            </nav>
            <nav className={`
                ${mobileNavEnabled ? 'right-0' : 'right-[100%]'}
                z-10 mt-[75px] w-full h-full fixed bg-slate-800/90 transition-right ease-in-out duration-200 sm:hidden p-5 text-white`}>
                <div className="flex flex-col">
                    <div className="w-full flex text-xl my-3">
                        <SigninButton />
                    </div>
                    <button onClick={ () => handleNavClick('/flags')} className="text-xl my-3 text-left">Flags</button>
                    <button onClick={ () => handleNavClick('/leaderboards')} className="text-xl my-3 text-left">Leaderboards</button>
                    { isLoggedIn && <button onClick={ () => handleNavClick('/play')} className="text-xl my-3 text-left">Play</button> }
                    <div className="text-xl flex justify-between my-3">
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
                    <div className="social-icons flex justify-start text-4xl mt-3">
                        <a href="" className="github"><AiFillFacebook /></a>
                        <a href="" className="github ml-5"><AiFillInstagram /></a>
                    </div>
                </div>
            </nav>
        </>    
    )
}

export default Navigation