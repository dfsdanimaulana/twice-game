import PropTypes from 'prop-types'
import { AiOutlineClose } from 'react-icons/ai'

const ImagePreview = ({ imgSrc, handleClick }) => {
    return (
        <div className="absolute -top-64 left-0">
            <div className="relative w-full">
                <AiOutlineClose
                    onClick={handleClick}
                    className="absolute right-1 top-1 cursor-pointer text-xl font-bold text-light hover:scale-[1.2] hover:rounded-md hover:border"
                />
                <img
                    src={imgSrc}
                    className="object-content max-h-60 w-auto rounded-md"
                />
            </div>
        </div>
    )
}

ImagePreview.propTypes = {
    imgSrc: PropTypes.string,
    handleClick: PropTypes.func,
}

export default ImagePreview
