import { useState, useEffect } from 'react'

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        // Update window width when the window is resized
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    // Determine the device type based on window width
    const device = (() => {
        if (windowWidth < 768) {
            return 'mobile'
        } else if (windowWidth >= 768 && windowWidth < 1024) {
            return 'tablet'
        } else {
            return 'desktop'
        }
    })()

    return { device }
}

export default useWindowWidth
