import { AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import GithubButton from '@components/GithubButton'
import GoogleButton from '@components/GoogleButton'

function AuthButton() {
    return (
        <>
            <GoogleButton />
            <GithubButton />
            <Link
                to="/login"
                className="flex items-center px-3 text-sm text-light underline hover:text-blue-500"
            >
                <AiOutlineUser className="mr-1" />
                <span>Login/Register</span>
            </Link>
        </>
    )
}

export default AuthButton
