import PropTypes from 'prop-types'
import { AiOutlineClose } from 'react-icons/ai'
import ReactModal from 'react-modal'
import Swal from 'sweetalert2'

import ImageWithFallBack from '@components/ImageWithFallBack'
import useCollection from '@hooks/useCollection'

const RecordListModal = ({ recordListOpen, setRecordListOpen, level }) => {
    const { documents, loading } = useCollection(
        'Users',
        ['exp', '>=', 1],
        ['exp', 'desc'],
    )

    const handleCloseModal = () => {
        setRecordListOpen(false)
    }

    const showImage = (src, name) => {
        Swal.fire({
            imageUrl: src,
            imageWidth: 336,
            imageHeight: 336,
            showConfirmButton: false,
            imageAlt: 'User image',
            text: name,
            showCloseButton: true,
        })
    }

    const filterDocuments = () => {
        return documents.filter((doc) => doc.levels[level - 1]?.completed)
    }

    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={recordListOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={handleCloseModal}
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <div className="text-light min-w-[300px] md:min-w-[600px]">
                <ul className="list-board text-sm md:text-base text-gray-900 max-h-64 md:max-h-96 overflow-auto bg-gradient-to-br from-tw-3 to-tw-4 border border-tw-5 rounded-md dark:bg-gradient-to-br dark:from-dark-blue dark:to-navy dark:border-dark-blue dark:text-white">
                    <li className="font-semibold sticky flex text-center  top-0 border-b px-1 py-2 border-tw-5 rounded-t-md dark:border-dark-blue shadow-md bg-tw-4 dark:bg-navy">
                        <span className="basis-6/12 border-r">User</span>
                        <span className="basis-3/12 border-r">Best Time</span>
                        <span className="basis-3/12">Best Turns</span>
                    </li>
                    {documents &&
                        filterDocuments().map((doc, index) => (
                            <li
                                key={doc?.id}
                                className={`flex text-center px-1 py-2 md:px-2 md:py-2 border-b border-tw-5 ${
                                    index === documents.length - 1 &&
                                    'rounded-b-md'
                                } dark:border-dark-blue flex justify-between`}
                            >
                                <div
                                    className="basis-6/12 flex items-center overflow-hidden border-r border-tw-5 dark:border-dark-blue cursor-pointer"
                                    onClick={() =>
                                        showImage(
                                            doc?.photoURL,
                                            doc?.displayName,
                                        )
                                    }
                                >
                                    <ImageWithFallBack
                                        imageUrl={doc?.photoURL}
                                        imageClasses="w-5 h-5 md:w-8 md:h-8 object-cover object-top rounded-full border border-tw-5 mx-2"
                                    />
                                    <span className="truncate">
                                        {doc?.displayName}
                                    </span>
                                </div>
                                <span className="basis-3/12 border-r border-tw-5 dark:border-dark-blue">
                                    {doc?.levels[level - 1]?.bestTime}s
                                </span>
                                <span className="basis-3/12">
                                    {doc?.levels[level - 1]?.bestTurns}
                                </span>
                            </li>
                        ))}
                    {loading && <p>Loading...</p>}
                </ul>
            </div>
            <button
                className="absolute top-2 right-2 text-2xl text-dark dark:text-light"
                onClick={handleCloseModal}
            >
                <AiOutlineClose />
            </button>
        </ReactModal>
    )
}

RecordListModal.propTypes = {
    recordListOpen: PropTypes.bool,
    setRecordListOpen: PropTypes.func,
    level: PropTypes.number,
}

export default RecordListModal
