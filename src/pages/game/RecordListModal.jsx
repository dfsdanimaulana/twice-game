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
            <div className="min-w-[300px] text-light md:min-w-[600px]">
                <ul className="list-board text-gray-900 max-h-64 overflow-auto rounded-md border border-tw-5 bg-gradient-to-br from-tw-3 to-tw-4 text-sm dark:border-dark-blue dark:bg-gradient-to-br dark:from-dark-blue dark:to-navy dark:text-white md:max-h-96 md:text-base">
                    <li className="sticky top-0 flex rounded-t-md  border-b border-tw-5 bg-tw-4 px-1 py-2 text-center font-semibold shadow-md dark:border-dark-blue dark:bg-navy">
                        <span className="basis-6/12 border-r">User</span>
                        <span className="basis-3/12 border-r">Best Time</span>
                        <span className="basis-3/12">Best Turns</span>
                    </li>
                    {documents &&
                        filterDocuments().map((doc, index) => (
                            <li
                                key={doc?.id}
                                className={`flex border-b border-tw-5 px-1 py-2 text-center md:px-2 md:py-2 ${
                                    index === documents.length - 1 &&
                                    'rounded-b-md'
                                } flex justify-between dark:border-dark-blue`}
                            >
                                <div
                                    className="flex basis-6/12 cursor-pointer items-center overflow-hidden border-r border-tw-5 dark:border-dark-blue"
                                    onClick={() =>
                                        showImage(
                                            doc?.photoURL,
                                            doc?.displayName,
                                        )
                                    }
                                >
                                    <ImageWithFallBack
                                        imageUrl={doc?.photoURL}
                                        imageClasses="mx-2 h-5 w-5 rounded-full border border-tw-5 object-cover object-top md:h-8 md:w-8"
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
                className="absolute right-2 top-2 text-2xl text-dark dark:text-light"
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
