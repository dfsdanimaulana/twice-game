import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db, storage } from '../../config/firebase'
import useFirebaseAuth from '../../hooks/useFirebaseAuth'
import { validateUsername } from '../../utils/validateUsername'
import createImageFromInitials from '../../utils/createImageFromInitials'
import { generateUserData } from '../../utils/generateUserData'

// components
import { AiOutlineUser } from 'react-icons/ai'
import PasswordInput from '../../components/PasswordInput'
import BackButton from '../../components/BackButton'

const Register = () => {
    const navigate = useNavigate()
    const { user } = useFirebaseAuth()
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()

    const password = watch('password')

    const handleRegister = async (data) => {
        setLoading(true)
        try {
            const cred = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            const user = cred.user
            const imgURL = createImageFromInitials(150, data.displayName)
            const storageRef = ref(storage, 'profiles/' + user.uid)
            const snapshot = await uploadBytes(storageRef, imgURL.blob)
            const downloadURL = await getDownloadURL(snapshot.ref)

            await updateProfile(auth.currentUser, {
                displayName: data.displayName,
                photoURL: downloadURL
            })

            const userRef = doc(db, 'Users', user.uid)

            const userData = generateUserData(user)
            await setDoc(userRef, userData)
            setLoading(false)

            toast.success(`Welcome ${user?.displayName}`, {
                hideProgressBar: true
            })
        } catch (error) {
            setLoading(false)
            if (error.code === 'auth/email-already-in-use') {
                toast.error(
                    'The email address is already in use by another account.'
                )
            } else {
                console.log(error.message)
            }
        }
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
                <h1 className='form-title'>Register</h1>
                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className='flex flex-col gap-4 text-tw-3'>
                    <div className='text-start'>
                        <label>Display Name</label>
                        <input
                            className='form-input'
                            type='text'
                            placeholder='Your name'
                            {...register('displayName', {
                                required: true,
                                validate: validateUsername
                            })}
                        />
                        {errors.displayName && (
                            <p className='form-error'>
                                {errors.displayName.message}
                            </p>
                        )}
                    </div>
                    <div className='text-start'>
                        <label>Email</label>
                        <input
                            className='form-input'
                            type='email'
                            placeholder='your@email.com'
                            {...register('email', { required: true })}
                        />
                        {errors.email && (
                            <p className='form-error'>{errors.email.message}</p>
                        )}
                    </div>
                    <div className='text-start'>
                        <label>Password</label>
                        <PasswordInput
                            {...register('password', { required: true })}
                        />
                        {errors.password && (
                            <p className='form-error'>
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div className='text-start'>
                        <label>Confirm Password</label>
                        <PasswordInput
                            {...register('confirmPassword', {
                                required: true,
                                validate: (value) =>
                                    value === password ||
                                    "Passwords don't match"
                            })}
                        />
                        {errors.confirmPassword && (
                            <p className='form-error'>
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                    <div>
                        {loading ? (
                            <button type='submit' className='form-button'>
                                Loading
                            </button>
                        ) : (
                            <button type='submit' className='form-button'>
                                Submit
                            </button>
                        )}
                    </div>
                    <div className='flex justify-center'>
                        <Link
                            to='/login'
                            className='text-sm underline flex items-center px-3 text-light hover:text-blue-500'>
                            <AiOutlineUser className='mr-1' />
                            <span>Login</span>
                        </Link>
                    </div>
                </form>
            </div>
            <BackButton to='/' />
        </div>
    )
}

export default Register
