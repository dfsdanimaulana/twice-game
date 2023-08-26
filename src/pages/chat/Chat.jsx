import useFirebaseAuth from '../../hooks/useFirebaseAuth'
import useCollection from '../../hooks/useCollection'
import { useState, useRef, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { toast } from 'react-toastify'
import BackButton from '../../components/BackButton'
import ImageWithFallback from '../../components/ImageWithFallBack'

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
                        <header className='pt-6 pb-4 px-5 border-b border-dark'>
                            <div className='flex justify-between items-center'>
                                {/* Image + name */}
                                <div className='flex items-center'>
                                    <a
                                        className='inline-flex items-start mr-3'
                                        href='#0'>
                                        <img
                                            className='rounded-full w-14 h-14 object-cover object-top'
                                            src={user?.photoURL}
                                            alt='photoURL'
                                        />
                                    </a>
                                    <div className='pr-1'>
                                        <a
                                            className='inline-flex text-gray-800 hover:text-gray-900'
                                            href='#0'>
                                            <h2 className='text-xl leading-snug font-bold'>
                                                {user?.displayName}
                                            </h2>
                                        </a>
                                        <a
                                            className='hidden text-sm font-medium hover:text-indigo-500'
                                            href='#0'>
                                            @lauren.mars
                                        </a>
                                    </div>
                                </div>
                                {/* Settings button */}
                                <div className='relative inline-flex flex-shrink-0'>
                                    <button className='text-gray-400 hover:text-gray-500 rounded-full focus:ring-0 outline-none focus:outline-none'>
                                        <span className='sr-only'>
                                            Settings
                                        </span>
                                        <svg
                                            className='w-4 h-4 fill-current'
                                            viewBox='0 0 16 16'>
                                            <path d='m15.621 7.015-1.8-.451A5.992 5.992 0 0 0 13.13 4.9l.956-1.593a.5.5 0 0 0-.075-.611l-.711-.707a.5.5 0 0 0-.611-.075L11.1 2.87a5.99 5.99 0 0 0-1.664-.69L8.985.379A.5.5 0 0 0 8.5 0h-1a.5.5 0 0 0-.485.379l-.451 1.8A5.992 5.992 0 0 0 4.9 2.87l-1.593-.956a.5.5 0 0 0-.611.075l-.707.711a.5.5 0 0 0-.075.611L2.87 4.9a5.99 5.99 0 0 0-.69 1.664l-1.8.451A.5.5 0 0 0 0 7.5v1a.5.5 0 0 0 .379.485l1.8.451c.145.586.378 1.147.691 1.664l-.956 1.593a.5.5 0 0 0 .075.611l.707.707a.5.5 0 0 0 .611.075L4.9 13.13a5.99 5.99 0 0 0 1.664.69l.451 1.8A.5.5 0 0 0 7.5 16h1a.5.5 0 0 0 .485-.379l.451-1.8a5.99 5.99 0 0 0 1.664-.69l1.593.956a.5.5 0 0 0 .611-.075l.707-.707a.5.5 0 0 0 .075-.611L13.13 11.1a5.99 5.99 0 0 0 .69-1.664l1.8-.451A.5.5 0 0 0 16 8.5v-1a.5.5 0 0 0-.379-.485ZM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z' />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </header>
                        {/* Card body */}
                        <div className='py-3 px-5'>
                            <h3 className='text-xs font-semibold uppercase text-gray-400 mb-1'>
                                Chats
                            </h3>
                            {/* Chat list */}
                            <div
                                ref={messageContainerRef}
                                className='divide-y divide-dark overflow-auto max-h-[400px]'>
                                {/* User */}
                                {documents &&
                                    documents.map((chat) => (
                                        <div
                                            key={chat?.id}
                                            className='w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50'>
                                            <div className='flex items-start'>
                                                <ImageWithFallback
                                                    imageClasses='rounded-full items-start flex-shrink-0 mr-3 mt-1 w-8 h-8 object-cover object-top'
                                                    imageUrl={chat?.photoURL}
                                                />
                                                <div className='w-full'>
                                                    <h4 className='text-sm font-semibold text-gray-900'>
                                                        {chat?.displayName}
                                                    </h4>
                                                    <div className='text-[14px] flex flex-col'>
                                                        <span className='text-start'>
                                                            {chat?.message}{' '}
                                                        </span>
                                                        <span className='text-[12px] text-end'>
                                                            {chat?.createdAt !==
                                                                null &&
                                                                formatDistanceToNow(
                                                                    chat?.createdAt?.toDate(),
                                                                    {
                                                                        addSuffix: true
                                                                    }
                                                                )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                {loading && <span>Loading...</span>}
                                {error && <span>{error}</span>}
                            </div>
                            <form
                                ref={formRef}
                                className='flex gap-1 justify-between px-3 py-1'
                                onSubmit={handleSubmit}>
                                <input
                                    type='text'
                                    onChange={(e) => setMessage(e.target.value)}
                                    className='basis-3/4 rounded-md focus:outline-none px-2'
                                />
                                {/* Bottom right button */}
                                <button className='basis-1/4 inline-flex items-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2'>
                                    <svg
                                        className='w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2'
                                        viewBox='0 0 12 12'>
                                        <path d='M11.866.146a.5.5 0 0 0-.437-.139c-.26.044-6.393 1.1-8.2 2.913a4.145 4.145 0 0 0-.617 5.062L.305 10.293a1 1 0 1 0 1.414 1.414L7.426 6l-2 3.923c.242.048.487.074.733.077a4.122 4.122 0 0 0 2.933-1.215c1.81-1.809 2.87-7.94 2.913-8.2a.5.5 0 0 0-.139-.439Z' />
                                    </svg>
                                    <span>Send</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Chat
