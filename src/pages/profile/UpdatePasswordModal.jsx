import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { useForm } from 'react-hook-form'
import { BiLoader } from 'react-icons/bi'
import {
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider
} from 'firebase/auth'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../../config/firebase'
import PasswordInput from '../../components/PasswordInput'

const UpdatePasswordModal = ({ passwordOpen, setPasswordOpen }) => {
    const [formLoading, setFormLoading] = useState(false)

    const { register, handleSubmit, reset } = useForm()

    const updateUserPassword = async (data) => {
        setFormLoading(true)
        const user = auth.currentUser
        const credential = EmailAuthProvider.credential(
            user.email,
            data.oldPassword
        )

        try {
            // reauthenticate user with old password
            await reauthenticateWithCredential(user, credential)

            // if reauthenticate succeeds, update the password
            await updatePassword(user, data.newPassword)

            setFormLoading(false)
            setPasswordOpen(false)
            reset()
            toast.success('Update Success')
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                // Custom error message for wrong password
                toast.error('Wrong old password. Please try again.')
            } else {
                toast.error(error.message)
            }
            setFormLoading(false)
        }
    }

    const handleCloseModal = () => {
        setPasswordOpen(false)
        reset()
    }

    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={passwordOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={handleCloseModal}
            className='modal-content'
            overlayClassName='modal-overlay'>
            <form
                onSubmit={handleSubmit(updateUserPassword)}
                className='flex flex-col gap-4'>
                <span>
                    <label className='block text-start mb-3'>
                        Old Password:
                    </label>
                    <PasswordInput
                        placeholder='Your previous password'
                        {...register('oldPassword', {
                            required: true
                        })}
                    />
                </span>
                <span>
                    <label className='block text-start mb-3'>
                        New Password:
                    </label>
                    <PasswordInput
                        placeholder='Your new password'
                        {...register('newPassword', {
                            required: true
                        })}
                    />
                </span>
                <div className='text-end'>
                    {formLoading ? (
                        <button className='form-button'>Updating <BiLoader className='animate-spin' /></button>
                    ) : (
                        <button className='form-button'>Update</button>
                    )}
                </div>
            </form>
            <button
                className='absolute top-2 right-2 text-2xl text-tw-5'
                onClick={handleCloseModal}>
                <AiOutlineCloseCircle />
            </button>
        </ReactModal>
    )
}

UpdatePasswordModal.propTypes = {
    passwordOpen: PropTypes.bool,
    setPasswordOpen: PropTypes.func
}

export default UpdatePasswordModal
