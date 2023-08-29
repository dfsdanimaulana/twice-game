import { useState, useRef } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { BsSend, BsEmojiSmile } from 'react-icons/bs'
import EmojiPicker from 'emoji-picker-react'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { db } from '../../config/firebase'

function FormInput({ user }) {
    const formRef = useRef(null)
    const emojiPickerContainerRef = useRef(null)
    const [message, setMessage] = useState('')
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)

    const resetForm = () => {
        formRef.current.reset()
        setMessage('')
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
        if (message === '') return
        try {
            const messagesRef = collection(db, 'ChatRooms')
            await addDoc(messagesRef, {
                uid: user?.uid,
                displayName: user?.displayName,
                photoURL: user?.photoURL,
                message: message.replace(/\s+/g, ' ').trim(),
                createdAt: serverTimestamp()
            })
            resetForm()
        } catch (err) {
            toast.error('Error sending message:', err.message)
            resetForm()
        }
    }

    useOnClickOutside(emojiPickerContainerRef, () =>
        setIsEmojiPickerOpen(false)
    )

    return (
        <form
            ref={formRef}
            className='flex mx-5 mt-5 h-10'
            onSubmit={handleSubmit}>
            <button
                onClick={openEmojiPicker}
                type='button'
                className='flex items-center justify-center py-2 px-3 rounded-s-md text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-tw-3 dark:hover:bg-tw-5 shadow-lg focus:outline-none focus-visible:ring-2'>
                <BsEmojiSmile />
            </button>
            <input
                type='text'
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='flex-auto focus:outline-none px-2 text-dark'
            />
            {/* Bottom right button */}
            <button className='flex items-center justify-center py-2 px-3 rounded-e-md text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-tw-3 dark:hover:bg-tw-5 shadow-lg focus:outline-none focus-visible:ring-2'>
                <BsSend />
            </button>
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
