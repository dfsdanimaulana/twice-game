import PropTypes from 'prop-types'
import { useState } from 'react'

const ImageWithFallback = ({ imageUrl, imageClasses, onClick }) => {
    const [error, setError] = useState(false)
    const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl)

    const handleImageError = () => {
        if (!error) {
            setCurrentImageUrl('/img/not-found.jpg')
            setError(true)
        }
    }

    const handleClick = () => {
        if (onClick) {
            onClick()
        }
    }

    return (
        <img
            src={currentImageUrl}
            onClick={handleClick}
            className={imageClasses}
            alt='Image'
            onError={handleImageError}
        />
    )
}

ImageWithFallback.propTypes = {
    imageUrl: PropTypes.string,
    imageClasses: PropTypes.string,
    onClick: PropTypes.func
}

export default ImageWithFallback
