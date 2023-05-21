"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const SigninButton = () => {
  const { data: session } = useSession();
  console.log(session?.user);
  
  return (
        session && session.user
        ?
        <button onClick={() => signOut()} className="text-red-600 ml-3">
          Sign Out
        </button>
        :
        <button onClick={() => signIn('facebook')} className="ml-3">
        Sign In
        </button>
  )
}

export default SigninButton;