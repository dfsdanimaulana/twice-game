import PropTypes from 'prop-types'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

const BackButton = ({ to = -1 }) => {
    const navigate = useNavigate()

    return (
        <div className="back-button absolute left-2 top-2 md:left-5 md:top-5">
            <button
                className="btn-secondary"
                onClick={() => navigate(to)}
                data-tooltip="back-button"
            >
                <AiOutlineArrowLeft className="dark:text-light" />
            </button>
            <Tooltip anchorSelect=".back-button" place="bottom-start">
                Back
            </Tooltip>
        </div>
    )
}

BackButton.propTypes = {
    to: PropTypes.any,
}

export default BackButton
