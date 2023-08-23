import { useEffect, useState } from 'react'

// Custom hook for managing dark mode
function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    // Load dark mode preference from local storage on component mount
    useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode')
        setIsDarkMode(storedDarkMode === 'true')
        setIsInitialLoad(false)
    }, [])

    // Update local storage and HTML class when dark mode changes
    useEffect(() => {
        if (!isInitialLoad) {
            localStorage.setItem('darkMode', isDarkMode.toString())
            document.documentElement.classList.toggle('dark', isDarkMode)
        }
    }, [isDarkMode, isInitialLoad])

    return { isDarkMode, setIsDarkMode }
}

export default useDarkMode
