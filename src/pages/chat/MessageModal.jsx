import { deleteObject, getMetadata, ref } from 'firebase/storage'
import PropTypes from 'prop-types'
import { AiOutlineClose } from 'react-icons/ai'
import ReactModal from 'react-modal'
import { toast } from 'react-toastify'

import ImageWithFallback from '@components/ImageWithFallBack'
import { storage } from '@config/firebase'
import useFirebaseAuth from '@hooks/useFirebaseAuth'
import useFirestore from '@hooks/useFirestore'

const MessageModal = ({ modalOpen, setModalOpen, chat }) => {
    const { user } = useFirebaseAuth()
    const { deleteDocument } = useFirestore('ChatRooms')

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    const checkImage = async () => {
        // check if image exist
        const imageRef = ref(storage, 'chats/' + chat?.imageId)

        getMetadata(imageRef)
            .then(async () => {
                try {
                    await deleteObject(imageRef)
                } catch (error) {
                    toast.error('Something went wrong!')
                    console.log(error)
                }
            })
            .catch(() => {}) // if image doesn't exist just continue
    }

    const handleDeleteMessage = async () => {
        await checkImage()
        await deleteDocument(chat?.id)
    }

    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={modalOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={handleCloseModal}
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <div className="m-2 flex min-w-[300px] items-start justify-center gap-2 rounded-md p-3 text-dark shadow-lg dark:text-light">
                <ImageWithFallback
                    imageUrl={chat?.photoURL}
                    imageClasses="h-10 w-10 rounded-full object-cover object-top md:h-20 md:w-20"
                />
                <div className="flex flex-1 grow flex-col">
                    <span>{chat?.displayName}</span>
                    <hr className="my-1 w-full" />
                    <div className="m-1 block items-start gap-3 md:flex">
                        {chat?.image && (
                            <img
                                src={chat?.image}
                                className="object-fit max-h-48 max-w-fit rounded-md"
                            />
                        )}
                        <span className="text-lg md:text-xl">
                            {chat?.message}
                        </span>
                    </div>
                </div>
            </div>
            {chat?.uid === user?.uid && (
                <div className="w-full text-end">
                    <button
                        className="btn-primary"
                        onClick={handleDeleteMessage}
                    >
                        Delete
                    </button>
                </div>
            )}
            <button
                className="absolute right-2 top-2 self-end text-2xl text-dark dark:text-light"
                onClick={handleCloseModal}
            >
                <AiOutlineClose />
            </button>
        </ReactModal>
    )
}

MessageModal.propTypes = {
    modalOpen: PropTypes.bool,
    setModalOpen: PropTypes.func,
    chat: PropTypes.object,
}

export default MessageModal
