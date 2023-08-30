import { useEffect, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@config/firebase'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useFirebaseAuth from '@hooks/useFirebaseAuth'

//components
import { AiOutlineUser } from 'react-icons/ai'
import PasswordInput from '@components/PasswordInput'
import BackButton from '@components/BackButton'

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
                        'Email does not exist. Please register first.'
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
        <div className='home relative overflow-hidden'>
            <>
                <video
                    className='absolute w-full h-auto object-cover -z-20 hidden md:block'
                    autoPlay
                    loop
                    muted>
                    <source src='/video/videoplayback.mp4' type='video/mp4' />
                </video>
                <video
                    className='absolute w-full h-auto object-cover -z-20 block md:hidden'
                    autoPlay
                    loop
                    muted>
                    <source
                        src='/video/videoplayback-sm.mp4'
                        type='video/mp4'
                    />
                </video>
                <div className='absolute w-full min-h-screen bg-[rgba(0,0,0,0.4)] -z-10'></div>
            </>
            <div className='text-center'>
                <h1 className='form-title'>Login</h1>
                <form
                    onSubmit={handleSubmit(handleSignIn)}
                    className='flex flex-col gap-4'>
                    <span>
                        <label className='block text-start'>Email:</label>
                        <input
                            className='form-input'
                            placeholder='Your@email.com'
                            type='email'
                            {...register('email', { required: true })}
                        />
                        {emailError && (
                            <p className='form-error'>{emailError}</p>
                        )}
                    </span>
                    <span>
                        <label className='block text-start'>Password:</label>
                        <PasswordInput
                            {...register('password', { required: true })}
                        />
                        {passwordError && (
                            <p className='form-error'>{passwordError}</p>
                        )}
                    </span>
                    <Link
                        to='/forget-password'
                        className='text-sm underline text-light hover:text-blue-500 cursor-pointer text-start -mt-2 ml-2'>
                        Forget password?
                    </Link>
                    <div>
                        {loading ? (
                            <button className='form-button'>Loading</button>
                        ) : (
                            <button className='form-button'>Submit</button>
                        )}
                    </div>

                    <div className='flex justify-center'>
                        <Link
                            to='/register'
                            className='text-sm underline flex items-center px-3 text-light hover:text-blue-500'>
                            <AiOutlineUser className='mr-1' />
                            <span>Register</span>
                        </Link>
                    </div>
                </form>
            </div>
            <BackButton to='/' />
        </div>
    )
}

export default Login
