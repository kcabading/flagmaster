import { signIn, signOut, useSession } from "next-auth/react";



const RegisterForm = () => {


    const { data: session } = useSession();

    function handleRegister () {
        signIn('cognito')
    }

    return (
        <div className="my-5">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" className="border-2 rounded-sm w-full px-2 py-1 mb-3"/>
            <label htmlFor="email">Email</label>
            <input type="email" name="email"  className="border-2 rounded-sm w-full px-2 py-1 mb-3"/>
            <label htmlFor="password1">Password</label>
            <input type="password" name="password1"  className="border-2 rounded-sm w-full px-2 py-1 mb-3"/>
            <label htmlFor="password2">Re-type password</label>
            <input type="password" name="password2"  className="border-2 rounded-sm w-full px-2 py-1 mb-3"/>

            {/* <button onClick={() => handleRegister()} className="bg-green-700 hover:bg-green-500 text-white text-md p-3 rounded-lg border-1 flex m-auto">
                Register
            </button> */}

            <a href="/api/auth/signin">Sign IN</a>

            
        </div>
    )
}

export default RegisterForm