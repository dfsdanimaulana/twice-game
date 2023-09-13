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
            className='modal-content'
            overlayClassName='modal-overlay'>
            <div className='p-3 text-dark dark:text-light flex items-start justify-center gap-2 shadow-lg m-2 min-w-[300px] rounded-md'>
                <ImageWithFallback
                    imageUrl={chat?.photoURL}
                    imageClasses='w-10 h-10 md:w-20 md:h-20 object-cover object-top rounded-full'
                />
                <div className='flex flex-col grow flex-1'>
                    <span>{chat?.displayName}</span>
                    <hr className='w-full my-1' />
                    <div className='block md:flex items-start gap-3 m-1'>
                        {chat?.image && (
                            <img
                                src={chat?.image}
                                className='object-fit max-h-48 max-w-fit rounded-md'
                            />
                        )}
                        <span className='text-lg md:text-xl'>{chat?.message}</span>
                    </div>
                </div>
            </div>
            {chat?.uid === user?.uid && (
                <div className='w-full text-end'>
                    <button
                        className='btn-primary'
                        onClick={handleDeleteMessage}>
                        Delete
                    </button>
                </div>
            )}
            <button
                className='absolute top-2 right-2 text-2xl text-dark dark:text-light self-end'
                onClick={handleCloseModal}>
                <AiOutlineClose />
            </button>
        </ReactModal>
    )
}

MessageModal.propTypes = {
    modalOpen: PropTypes.bool,
    setModalOpen: PropTypes.func,
    chat: PropTypes.object
}

export default MessageModal
