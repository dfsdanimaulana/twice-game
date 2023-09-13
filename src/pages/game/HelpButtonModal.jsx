import PropTypes from 'prop-types'
import { AiOutlineClose } from 'react-icons/ai'
import ReactModal from 'react-modal'

const HelpButtonModal = ({ helpOpen, setHelpOpen, time }) => {
    const halfTime = Math.round((time * 2) / 3)
    const handleCloseModal = () => {
        setHelpOpen(false)
    }

    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={helpOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={handleCloseModal}
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <div className="p-3 text-dark dark:text-light">
                <p className="pb-1 font-bold">How to get stars?</p>
                <ul className="pb-3">
                    <li>⭐ : Complete level</li>
                    <li>⭐ : Complete level in {halfTime}s </li>
                    <li>⭐ : Complete level 3 times</li>
                </ul>
                <p className="pb-1 font-bold">How to get Cards?</p>
                <ul>
                    <li>🎴 : Collect first star</li>
                    <li>🎴 : Collect second star</li>
                    <li>🎴 : Collect third star</li>
                    <li>🎴 : Complete level 5 times</li>
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

HelpButtonModal.propTypes = {
    helpOpen: PropTypes.bool,
    setHelpOpen: PropTypes.func,
    time: PropTypes.number,
}

export default HelpButtonModal
