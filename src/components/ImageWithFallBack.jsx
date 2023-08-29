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

export default ImageWithFallback
