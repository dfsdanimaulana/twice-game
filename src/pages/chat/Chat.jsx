import useFirebaseAuth from '../../hooks/useFirebaseAuth'
import useCollection from '../../hooks/useCollection'
import { useState, useRef, useEffect } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { toast } from 'react-toastify'
import BackButton from '../../components/BackButton'
import { BsSend } from 'react-icons/bs'
import ToggleDarkMode from '../../components/ToggleDarkMode'
import Header from './Header'
import Message from './Message'

function Chat() {
    const { user } = useFirebaseAuth()
    const messageContainerRef = useRef(null)
    const formRef = useRef(null)
    const { documents, loading, error } = useCollection(
        'ChatRooms',
        ['createdAt', '!=', null],
        ['createdAt', 'asc']
    )
    const [message, setMessage] = useState(null)

    const resetForm = () => {
        formRef.current.reset()
        setMessage(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (message === null || message === ' ') return
        try {
            const messagesRef = collection(db, 'ChatRooms')
            await addDoc(messagesRef, {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                message: message.replace(/\s+/g, ' ').trim(),
                createdAt: serverTimestamp()
            })
            resetForm()
        } catch (err) {
            toast.error('Error sending message:', err.message)
            resetForm()
        }
    }

    // Automatically scroll to the bottom when messages change
    useEffect(() => {
        const messageContainer = messageContainerRef.current
        messageContainer.scrollTop = messageContainer.scrollHeight
    }, [documents, messageContainerRef])

    

    return (
        <div>
            {/* Snippet */}
            <section className='flex flex-col justify-center antialiased min-h-screen p-4'>
                <BackButton to='/' />
                <div className='h-full'>
                    {/* Card */}
                    <div className='relative w-[340px] lg:w-1/3 mx-auto bg-gradient-to-br from-tw-2 to-tw-4 shadow-lg rounded-lg dark:bg-gradient-to-tr dark:from-dark-blue dark:to-navy '>
                        {/* Card header */}
                        <Header user={user} />
                        {/* Card body */}
                        <div className='py-3 px-5'>
                            <h3 className='text-xs font-semibold uppercase text-gray-400 mb-1'>
                                Chats
                            </h3>
                            {/* Chat list */}
                            <div
                                ref={messageContainerRef}
                                className='divide-y divide-dark overflow-auto max-h-[300px]'>
                                {/* User */}
                                {documents &&
                                    documents.map((chat) => (
                                        <Message key={chat?.id} chat={chat} />
                                    ))}
                                {loading && <span>Loading...</span>}
                                {error && <span>{error}</span>}
                            </div>
                            <form
                                ref={formRef}
                                className='flex mx-5 mt-5 h-10'
                                onSubmit={handleSubmit}>
                                <input
                                    type='text'
                                    required
                                    onChange={(e) => setMessage(e.target.value)}
                                    className='flex-auto focus:outline-none px-2 rounded-tl-md rounded-bl-md text-dark'
                                />
                                {/* Bottom right button */}
                                <button className='flex items-center justify-center py-2 px-3 rounded-tr-md rounded-br-md text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-tw-3 dark:hover:bg-tw-5 shadow-lg focus:outline-none focus-visible:ring-2'>
                                    <BsSend />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <div className='absolute top-3 right-3'>
                <ToggleDarkMode />
            </div>
        </div>
    )
}

export default Chat
