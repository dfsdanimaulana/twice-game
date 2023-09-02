import useFirebaseAuth from '@hooks/useFirebaseAuth'
import useCollection from '@hooks/useCollection'
import { useRef, useEffect } from 'react'
import BackButton from '@components/BackButton'
import ToggleDarkMode from '@components/ToggleDarkMode'
import Header from './Header'
import Message from './Message'
import FormInput from './FormInput'

function Chat() {
    const { user } = useFirebaseAuth()
    const messageContainerRef = useRef(null)
    const { documents, loading, error } = useCollection(
        'ChatRooms',
        ['createdAt', '!=', null],
        ['createdAt', 'asc']
    )

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
                    <div className='relative lg:w-2/3 mx-auto bg-gradient-to-br from-tw-2 to-tw-4 shadow-lg rounded-lg dark:bg-gradient-to-tr dark:from-dark-blue dark:to-navy '>
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
                                className='max-h-[500px] divide-y divide-tw-5 dark:divide-light overflow-auto relative shadow-inner rounded-md'>
                                {/* User */}
                                {documents &&
                                    documents.map((chat) => (
                                        <Message key={chat?.id} chat={chat} />
                                    ))}
                                {loading && <span>Loading...</span>}
                                {error && <span>{error}</span>}
                            </div>
                            <FormInput user={user} />
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
