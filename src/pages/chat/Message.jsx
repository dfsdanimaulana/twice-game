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
            showCloseButton: true,
        })
    }

    return (
        <div className="w-full p-2 text-left focus:outline-none focus-visible:bg-indigo-50 md:p-3">
            <div className="flex items-start">
                <ImageWithFallback
                    imageClasses="mr-3 mt-1 h-8 w-8 flex-shrink-0 cursor-pointer items-start rounded-full object-cover object-top hover:border hover:border-tw-5"
                    imageUrl={chat?.photoURL}
                    onClick={showImage}
                />

                <div
                    className="w-full cursor-pointer"
                    onClick={() => setModalOpen(true)}
                >
                    <h4 className="text-sm font-semibold">
                        {chat?.displayName}
                    </h4>
                    <div className="flex flex-col text-[14px]">
                        <div className="block gap-3 md:flex">
                            {chat?.image && (
                                <img
                                    src={chat?.image}
                                    className="object-fit max-h-48 max-w-fit rounded-md"
                                />
                            )}
                            <span className="whitespace-normal text-start">
                                {chat?.message}{' '}
                            </span>
                        </div>
                        <span className="text-end text-[12px] text-brown dark:text-slate-300">
                            {chat?.createdAt !== null &&
                                formatDistanceToNow(chat?.createdAt?.toDate(), {
                                    addSuffix: true,
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
    chat: PropTypes.object,
}

export default Message
