import { useRef, useEffect } from 'react'

import BackButton from '@components/BackButton'
import ToggleDarkMode from '@components/ToggleDarkMode'
import useCollection from '@hooks/useCollection'
import useFirebaseAuth from '@hooks/useFirebaseAuth'

import FormInput from './FormInput'
import Header from './Header'
import Message from './Message'

function Chat() {
    const { user } = useFirebaseAuth()
    const messageContainerRef = useRef(null)
    const { documents, loading, error } = useCollection(
        'ChatRooms',
        ['createdAt', '!=', null],
        ['createdAt', 'asc'],
    )

    // Automatically scroll to the bottom when messages change
    useEffect(() => {
        const messageContainer = messageContainerRef.current
        messageContainer.scrollTop = messageContainer.scrollHeight
    }, [documents, messageContainerRef])

    return (
        <div>
            {/* Snippet */}
            <section className="flex min-h-screen flex-col justify-center p-4 antialiased">
                <BackButton to="/" />
                <div className="h-full">
                    {/* Card */}
                    <div className="relative mx-auto rounded-lg bg-gradient-to-br from-tw-2 to-tw-4 shadow-lg dark:bg-gradient-to-tr dark:from-dark-blue dark:to-navy lg:w-2/3 ">
                        {/* Card header */}
                        <Header user={user} />
                        {/* Card body */}
                        <div className="px-5 py-3">
                            <h3 className="text-gray-400 mb-1 text-xs font-semibold uppercase">
                                Chats
                            </h3>
                            {/* Chat list */}
                            <div
                                ref={messageContainerRef}
                                className="relative max-h-[500px] divide-y divide-tw-5 overflow-auto rounded-md shadow-inner dark:divide-light"
                            >
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
            <div className="absolute right-3 top-3">
                <ToggleDarkMode />
            </div>
        </div>
    )
}

export default Chat
