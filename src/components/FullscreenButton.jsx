import { useState } from 'react'
import { BsFullscreenExit, BsFullscreen } from 'react-icons/bs'

const FullscreenButton = () => {
    const [isFullscreen, setIsFullscreen] = useState(false)

    const handleFullscreenToggle = () => {
        const element = document.documentElement

        if (!isFullscreen) {
            if (element.requestFullscreen) {
                element.requestFullscreen()
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen()
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen()
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen()
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
        }

        setIsFullscreen(!isFullscreen)
    }

    return (
        <button
            className='guide-full border border-tw-5 dark:border-light hover:bg-semi-transparent rounded-md p-1'
            onClick={handleFullscreenToggle}>
            {isFullscreen ? (
                <BsFullscreenExit className='text-tw-5 dark:text-light' />
            ) : (
                <BsFullscreen className='text-tw-5 dark:text-light' />
            )}
        </button>
    )
}

export default FullscreenButton
