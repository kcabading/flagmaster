"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const SigninButton = () => {
  const { data: session } = useSession();
  return (
        <>
        {session && session.user
          ?
            <button onClick={() => signOut()} className="text-red-600 cursor-pointer">
            Sign Out
            </button>
          :
            <button onClick={() => signIn('cognito', { callbackUrl: '/play' })} className="cursor-pointer">
            Sign In
            </button>
        }
        </>
  )
}

export default SigninButton;