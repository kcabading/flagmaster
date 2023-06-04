import { useSession } from "next-auth/react";

const CurrentUser = function () {

    const { data: session } = useSession()
    return session?.user
}

export default CurrentUser