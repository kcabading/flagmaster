import { useSession } from "next-auth/react";

const CurrentUser = function () {

    const { data: session } = useSession()
    console.log('user', session)
    return session?.user
}

export default CurrentUser