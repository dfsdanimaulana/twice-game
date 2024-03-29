import { updateProfile } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiLoader } from 'react-icons/bi'
import ReactModal from 'react-modal'
import { toast } from 'react-toastify'

import { auth, storage } from '@config/firebase'
import useFirebaseAuth from '@hooks/useFirebaseAuth'
import useFirestore from '@hooks/useFirestore'
import useUpdateDocumentsByUid from '@hooks/useUpdateDocumentsByUid'

const UpdatePhotoModal = ({ photoModalOpen, setPhotoModalOpen }) => {
    const { user } = useFirebaseAuth()
    const { updateDocuments } = useUpdateDocumentsByUid()
    const { updateDocument } = useFirestore('Users')
    const [formLoading, setFormLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)

    const handleModalClose = () => {
        setPhotoModalOpen(false)
        setPreviewImage(null)
        setSelectedFile(null)
    }

    const handleFileSelect = (file) => {
        setSelectedFile(file)
    }

    const handleImagePreview = (file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreviewImage(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const maxSize = 5 * 1024 * 1024 // 5mb

        if (!file) {
            toast.warn('Please select a file.')
        } else if (!file.type.startsWith('image/')) {
            toast.warn('Please select an image file.')
        } else if (file.size > maxSize) {
            toast.warn('File size exceeds 5 MB.')
        } else {
            handleImagePreview(file)
            handleFileSelect(file)
        }
    }

    const handleFileUpload = async () => {
        if (selectedFile) {
            setFormLoading(true)
            // Create a storage reference
            const storageRef = ref(storage, 'profiles/' + user?.uid)

            // Upload the file to the storage reference
            try {
                const snapshot = await uploadBytes(storageRef, selectedFile)

                // Get the download URL of the uploaded file
                const downloadURL = await getDownloadURL(snapshot.ref)
                await updateProfile(auth.currentUser, {
                    photoURL: downloadURL,
                })

                // update photoURL in Users collection
                await updateDocument(user.uid, {
                    photoURL: downloadURL,
                })

                // Update photoURL in chat room
                await updateDocuments('ChatRooms', user.uid, {
                    photoURL: downloadURL,
                })

                setFormLoading(false)
                toast.success('Update Successfully')
                handleModalClose()
            } catch (error) {
                setFormLoading(false)
                toast.error('Error uploading file')
                console.error('Error uploading file:', error)
            }
        } else {
            toast.warn('Please select an image')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        handleFileUpload()
    }

    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={photoModalOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={handleModalClose}
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label htmlFor="profile_image" className="mb-3 cursor-pointer">
                    <img
                        src={previewImage ? previewImage : user?.photoURL}
                        alt="Preview"
                        className="m-3 h-64 w-64 rounded-lg border border-tw-5 object-cover object-top"
                    />
                </label>
                <input
                    className="form-input hidden"
                    type="file"
                    id="profile_image"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <div className="text-center">
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
                onClick={handleModalClose}
            >
                <AiOutlineCloseCircle />
            </button>
        </ReactModal>
    )
}

UpdatePhotoModal.propTypes = {
    photoModalOpen: PropTypes.bool,
    setPhotoModalOpen: PropTypes.func,
}

export default UpdatePhotoModal
