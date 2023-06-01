import { useSession } from "next-auth/react";

const IsLoggedIn = function () {

    const { data: session } = useSession()

    return session?.user?.email ? true : false
}

export default IsLoggedIn