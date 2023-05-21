"use client";
import { signIn } from "next-auth/react";
import React from "react";

import {AiFillGoogleCircle, AiFillFacebook}  from "react-icons/ai";
import RegisterForm from "@/app/components/RegisterForm";

const Register = () => {
  return (
    <div className="w-full h-screen dark:bg-slate-900 dark:text-white">
        <div className="m-auto block sm:w-1/2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <h1 className="font-bold text-4xl text-center">Register</h1>
            <div className="form sm:w-3/4 m-auto">
                <RegisterForm />
            </div>
            <div className="flex items-center justify-between sm:w-3/4 m-auto">
                <button onClick={() => signIn('facebook')} className="bg-blue-700 text-white text-md p-3 rounded-lg border-1 flex items-center">
                <AiFillFacebook className="inline mr-3"/> Sign In with Facebook
                </button>
                <button onClick={() => signIn('google')} className="bg-green-700 text-white text-md p-3 rounded-lg border-1 flex items-center">
                <AiFillGoogleCircle className="inline mr-3" /> Sign In with Google
                </button>
            </div>
        </div>
    </div>
  )
}

export default Register;