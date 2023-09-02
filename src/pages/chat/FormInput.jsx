import { useState, useRef } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { toast } from 'react-toastify'
import { BsSend, BsEmojiSmile } from 'react-icons/bs'
import { BiImageAdd, BiLoader } from 'react-icons/bi'
import EmojiPicker from 'emoji-picker-react'
import useOnClickOutside from '@hooks/useOnClickOutside'
import { db, storage } from '@config/firebase'
import ImagePreview from './ImagePreview'
import generateRandomString from '@utils/generateRandomString'

function FormInput({ user }) {
    const formRef = useRef(null)
    const imageRef = useRef(null)
    const emojiPickerContainerRef = useRef(null)
    const [message, setMessage] = useState('')
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = () => {
        imageRef.current.click()
    }

    const handleCloseImage = () => {
        setSelectedFile(null)
        setPreviewImage(null)
    }

    const resetForm = () => {
        formRef.current.reset()
        setMessage('')
        handleCloseImage()
    }

    const onEmojiClick = (emojiObject) => {
        setMessage((prevText) => prevText + emojiObject.emoji)
        setIsEmojiPickerOpen(false)
    }

    const openEmojiPicker = () => {
        setIsEmojiPickerOpen(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (message === '' && !selectedFile) return
        setIsLoading(true)

        try {
            let imageURL = null
            const customId = generateRandomString(20)

            if (selectedFile) {
                // Create a storage reference
                const storageRef = ref(storage, 'chats/' + customId)
                // Upload the file to the storage reference
                const snapshot = await uploadBytes(storageRef, selectedFile)

                // Get the download URL of the uploaded file
                const downloadURL = await getDownloadURL(snapshot.ref)
                imageURL = downloadURL
            }
            const messagesRef = collection(db, 'ChatRooms')
            await addDoc(messagesRef, {
                imageId: customId,
                uid: user?.uid,
                displayName: user?.displayName,
                photoURL: user?.photoURL,
                message: message.replace(/\s+/g, ' ').trim(),
                image: imageURL !== null ? imageURL : null,
                createdAt: serverTimestamp()
            })
            setIsLoading(false)
            resetForm()
        } catch (err) {
            toast.error('Error sending message:', err.message)
            setIsLoading(false)
            resetForm()
        }
    }

    useOnClickOutside(emojiPickerContainerRef, () =>
        setIsEmojiPickerOpen(false)
    )

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

        if (!file.type.startsWith('image/')) {
            toast.warn('Please select an image file.')
        } else if (file.size > maxSize) {
            toast.warn('File size exceeds 5 MB.')
        } else {
            handleImagePreview(file)
            handleFileSelect(file)
        }
    }

    return (
        <form
            ref={formRef}
            className='flex md:mx-5 mt-5 h-10 relative'
            onSubmit={handleSubmit}>
            <button
                onClick={openEmojiPicker}
                type='button'
                className='flex flex-1 px-3 items-center justify-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-tw-3 dark:hover:bg-tw-5 shadow-lg focus:outline-none focus-visible:ring-2 rounded-s-md border-r border-indigo-800 dark:border-tw-5'>
                <BsEmojiSmile />
            </button>
            <button
                onClick={handleClick}
                type='button'
                className='flex flex-1 px-3 items-center justify-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-tw-3 dark:hover:bg-tw-5 shadow-lg focus:outline-none focus-visible:ring-2'>
                <BiImageAdd />
            </button>
            <input
                type='text'
                placeholder='Type something...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='flex-1 focus:outline-none text-dark'
            />
            {/* Bottom right button */}
            <button className='flex items-center justify-center py-2 px-3 rounded-e-md text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-tw-3 dark:hover:bg-tw-5 shadow-lg focus:outline-none focus-visible:ring-2'>
                {isLoading ? <BiLoader className='animate-spin' /> : <BsSend />}
            </button>
            {selectedFile && (
                <ImagePreview
                    imgSrc={previewImage}
                    handleClick={handleCloseImage}
                />
            )}
            <input
                ref={imageRef}
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
            />
            {isEmojiPickerOpen && (
                <div
                    className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                    ref={emojiPickerContainerRef}>
                    <EmojiPicker onEmojiClick={onEmojiClick} lazyLoadEmojis />
                </div>
            )}
        </form>
    )
}

export default FormInput
