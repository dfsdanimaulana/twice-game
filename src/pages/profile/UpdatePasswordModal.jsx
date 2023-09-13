import {
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from 'firebase/auth'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiLoader } from 'react-icons/bi'
import ReactModal from 'react-modal'
import { toast } from 'react-toastify'

import PasswordInput from '../../components/PasswordInput'
import { auth } from '../../config/firebase'

const UpdatePasswordModal = ({ passwordOpen, setPasswordOpen }) => {
    const [formLoading, setFormLoading] = useState(false)

    const { register, handleSubmit, reset } = useForm()

    const updateUserPassword = async (data) => {
        setFormLoading(true)
        const user = auth.currentUser
        const credential = EmailAuthProvider.credential(
            user.email,
            data.oldPassword,
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
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <form
                onSubmit={handleSubmit(updateUserPassword)}
                className="flex flex-col gap-4"
            >
                <span>
                    <label className="mb-3 block text-start">
                        Old Password:
                    </label>
                    <PasswordInput
                        placeholder="Your previous password"
                        {...register('oldPassword', {
                            required: true,
                        })}
                    />
                </span>
                <span>
                    <label className="mb-3 block text-start">
                        New Password:
                    </label>
                    <PasswordInput
                        placeholder="Your new password"
                        {...register('newPassword', {
                            required: true,
                        })}
                    />
                </span>
                <div className="text-end">
                    {formLoading ? (
                        <button className="form-button">
                            Updating <BiLoader className="animate-spin" />
                        </button>
                    ) : (
                        <button className="form-button">Update</button>
                    )}
                </div>
            </form>
            <button
                className="absolute right-2 top-2 text-2xl text-tw-5"
                onClick={handleCloseModal}
            >
                <AiOutlineCloseCircle />
            </button>
        </ReactModal>
    )
}

UpdatePasswordModal.propTypes = {
    passwordOpen: PropTypes.bool,
    setPasswordOpen: PropTypes.func,
}

export default UpdatePasswordModal
