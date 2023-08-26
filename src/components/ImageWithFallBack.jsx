import { useState } from 'react'

const ImageWithFallback = ({ imageUrl, imageClasses }) => {
    const [error, setError] = useState(false)
    const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl)

    const handleImageError = () => {
        if (!error) {
            setCurrentImageUrl('/img/not-found.jpg')
            setError(true)
        }
    }

    return (
        <img
            src={currentImageUrl}
            className={imageClasses}
            alt='Image'
            onError={handleImageError}
        />
    )
}

export default ImageWithFallback
