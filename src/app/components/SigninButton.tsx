"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const SigninButton = () => {
  const { data: session } = useSession();
  console.log(session?.user);

  return (
        session && session.user
        ?
        <div className="ml-5 flex">
            <p>Hi, {session?.user.name}</p>
            <button onClick={() => signOut({ callbackUrl: window.location.host })} className="text-red-600 ml-3">
            Sign Out
            </button>
        </div>
        :
        <button onClick={() => signIn('cognito')} className="ml-3">
        Sign In
        </button>
  )
}

export default SigninButton;