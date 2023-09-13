import PropTypes from 'prop-types'
import { AiOutlineClose } from 'react-icons/ai'

const ImagePreview = ({ imgSrc, handleClick }) => {
    return (
        <div className='absolute left-0 -top-64'>
            <div className='w-full relative'>
                <AiOutlineClose
                    onClick={handleClick}
                    className='absolute top-1 right-1 text-light text-xl font-bold cursor-pointer hover:scale-[1.2] hover:border hover:rounded-md'
                />
                <img
                    src={imgSrc}
                    className='object-content max-h-60 w-auto rounded-md'
                />
            </div>
        </div>
    )
}

ImagePreview.propTypes = {
    imgSrc: PropTypes.string,
    handleClick: PropTypes.func
}

export default ImagePreview
