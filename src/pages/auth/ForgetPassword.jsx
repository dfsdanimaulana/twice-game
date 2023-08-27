import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { auth } from '../../config/firebase'
import { toast } from 'react-toastify'
import BackButton from '../../components/BackButton'
import { useNavigate } from 'react-router-dom'

const ForgetPassword = () => {
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const sendPasswordResetEmailWithEmail = async (data) => {
        setLoading(true)
        try {
            await sendPasswordResetEmail(auth, data.email)
            setLoading(false)
            toast.success('Password reset email sent successfully!')
            navigate('/login')
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                toast.error('Email not registered')
            }
            setLoading(false)
        }
    }
    return (
        <div className="full-centered">
        <div>
            <h1 className='text-xl text-tw-5 font-medium mb-3'>
                Send Password Reset Email
            </h1>
            <form onSubmit={handleSubmit(sendPasswordResetEmailWithEmail)}>
                <label>Email:</label>
                <input
                    type='email'
                    placeholder='Your email'
                    className='form-input'
                    {...register('email', { required: true })}
                />
                <div className='text-end'>
                    {loading ? (
                        <button className='form-button'>Sending</button>
                    ) : (
                        <button className='form-button'>Send</button>
                    )}
                </div>
            </form>
        </div>
            <BackButton to='/login' />
        </div>
    )
}

export default ForgetPassword
