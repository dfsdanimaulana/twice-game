import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { BiLoader } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import { updateProfile } from 'firebase/auth'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../config/firebase'
import { validateUsername } from '../utils/validateUsername'
import useFirestore from '../hooks/useFirestore'
import useUpdateDocumentsByUid from '../hooks/useUpdateDocumentsByUid'

const UpdateDisplayNameModal = ({ modalOpen, setModalOpen, uid }) => {
    const { updateDocuments } = useUpdateDocumentsByUid()
    const [formLoading, setFormLoading] = useState(false)
    const { updateDocument } = useFirestore('Users')

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    const updateDisplayName = async (data) => {
        setFormLoading(true)
        try {
            await updateProfile(auth.currentUser, {
                displayName: data.newUsername
            })

            // update displayName in Users collection
            await updateDocument(uid, {
                displayName: data.newUsername
            })

            // Update displayName in chat room
            await updateDocuments('ChatRooms', uid, {
                displayName: data.newUsername
            })

            setFormLoading(false)
            setModalOpen(false)
            reset()
            toast.success('Update Success')
        } catch (error) {
            setFormLoading(false)
            console.log(error)
            toast.error('Failed to update username')
        }
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        reset()
    }

    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={modalOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={handleCloseModal}
            className='modal-content'
            overlayClassName='modal-overlay'>
            <form
                onSubmit={handleSubmit(updateDisplayName)}
                className='flex flex-col gap-4'>
                <span>
                    <label className='block text-start mb-3'>
                        Update Username:
                    </label>
                    <input
                        className='w-full border text-dark border-tw-1 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-tw-5 focus:border-tw-5'
                        type='text'
                        autoComplete='off'
                        placeholder='Your new username'
                        {...register('newUsername', {
                            required: true,
                            validate: validateUsername
                        })}
                    />
                    {errors.newUsername && (
                        <p className='form-error'>
                            {errors.newUsername.message}
                        </p>
                    )}
                </span>
                <div className='text-end'>
                    {formLoading ? (
                        <button className='form-button'>Updating{' '}<BiLoader className='animate-spin' /></button>
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

UpdateDisplayNameModal.propTypes = {
    modalOpen: PropTypes.bool,
    setModalOpen: PropTypes.func,
    uid: PropTypes.string
}

export default UpdateDisplayNameModal
