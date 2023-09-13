import { signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineUser } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

//components
import BackButton from '@components/BackButton'
import PasswordInput from '@components/PasswordInput'
import { auth } from '@config/firebase'
import useFirebaseAuth from '@hooks/useFirebaseAuth'

const Login = () => {
    const navigate = useNavigate()
    const { user } = useFirebaseAuth()
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit } = useForm()

    const handleSignIn = (data) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                setLoading(false)
                toast.success('Login Success', { autoClose: 1000 })
            })
            .catch((error) => {
                // Handle sign-in error
                if (error.code === 'auth/user-not-found') {
                    // Custom error message for non-existing email
                    setEmailError(
                        'Email does not exist. Please register first.',
                    )
                } else if (error.code === 'auth/wrong-password') {
                    // Custom error message for wrong password
                    setPasswordError('Wrong password. Please try again.')
                } else {
                    // General error handling
                    toast.error(error.message)
                }
                setLoading(false)
            })
    }

    useEffect(() => {
        user && navigate('/')
    }, [user, navigate])

    return (
        <div className="home relative overflow-hidden">
            <>
                <video
                    className="absolute -z-20 hidden h-auto w-full object-cover md:block"
                    autoPlay
                    loop
                    muted
                >
                    <source src="/video/videoplayback.mp4" type="video/mp4" />
                </video>
                <video
                    className="absolute -z-20 block h-auto w-full object-cover md:hidden"
                    autoPlay
                    loop
                    muted
                >
                    <source
                        src="/video/videoplayback-sm.mp4"
                        type="video/mp4"
                    />
                </video>
                <div className="absolute -z-10 min-h-screen w-full bg-[rgba(0,0,0,0.4)]"></div>
            </>
            <div className="text-center">
                <h1 className="form-title">Login</h1>
                <form
                    onSubmit={handleSubmit(handleSignIn)}
                    className="flex flex-col gap-4"
                >
                    <span>
                        <label className="block text-start">Email:</label>
                        <input
                            className="form-input"
                            placeholder="Your@email.com"
                            type="email"
                            {...register('email', { required: true })}
                        />
                        {emailError && (
                            <p className="form-error">{emailError}</p>
                        )}
                    </span>
                    <span>
                        <label className="block text-start">Password:</label>
                        <PasswordInput
                            {...register('password', { required: true })}
                        />
                        {passwordError && (
                            <p className="form-error">{passwordError}</p>
                        )}
                    </span>
                    <Link
                        to="/forget-password"
                        className="-mt-2 ml-2 cursor-pointer text-start text-sm text-light underline hover:text-blue-500"
                    >
                        Forget password?
                    </Link>
                    <div>
                        {loading ? (
                            <button className="form-button">Loading</button>
                        ) : (
                            <button className="form-button">Submit</button>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <Link
                            to="/register"
                            className="flex items-center px-3 text-sm text-light underline hover:text-blue-500"
                        >
                            <AiOutlineUser className="mr-1" />
                            <span>Register</span>
                        </Link>
                    </div>
                </form>
            </div>
            <BackButton to="/" />
        </div>
    )
}

export default Login
