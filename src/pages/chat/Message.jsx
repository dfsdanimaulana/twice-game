import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import { useState } from 'react'
import Swal from 'sweetalert2'

import ImageWithFallback from '@components/ImageWithFallBack'

import MessageModal from './MessageModal'

function Message({ chat }) {
    const [modalOpen, setModalOpen] = useState(false)

    const showImage = () => {
        Swal.fire({
            imageUrl: chat?.photoURL,
            imageWidth: 336,
            imageHeight: 336,
            showConfirmButton: false,
            imageAlt: 'User image',
            showCloseButton: true
        })
    }

    return (
        <div className='w-full text-left p-2 md:p-3 focus:outline-none focus-visible:bg-indigo-50'>
            <div className='flex items-start'>
                <ImageWithFallback
                    imageClasses='rounded-full items-start flex-shrink-0 mr-3 mt-1 w-8 h-8 object-cover object-top hover:border hover:border-tw-5 cursor-pointer'
                    imageUrl={chat?.photoURL}
                    onClick={showImage}
                />

                <div
                    className='w-full cursor-pointer'
                    onClick={() => setModalOpen(true)}>
                    <h4 className='text-sm font-semibold'>
                        {chat?.displayName}
                    </h4>
                    <div className='text-[14px] flex flex-col'>
                        <div className='block md:flex gap-3'>
                            {chat?.image && (
                                <img
                                    src={chat?.image}
                                    className='object-fit max-h-48 max-w-fit rounded-md'
                                />
                            )}
                            <span className='text-start whitespace-normal'>{chat?.message} </span>
                        </div>
                        <span className='text-[12px] text-end text-brown dark:text-slate-300'>
                            {chat?.createdAt !== null &&
                                formatDistanceToNow(chat?.createdAt?.toDate(), {
                                    addSuffix: true
                                })}
                        </span>
                    </div>
                </div>
            </div>
            <MessageModal
                chat={chat}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            />
        </div>
    )
}

Message.propTypes = {
    chat: PropTypes.object
}

export default Message
