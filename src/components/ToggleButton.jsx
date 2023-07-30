import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MdLightMode, MdModeNight } from 'react-icons/md'

const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30
}

export default function ToggleButton() {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    const toggleSwitch = () => {
        setIsDarkMode(!isDarkMode)
    }

    useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode')
        setIsDarkMode(storedDarkMode === 'true')
        setIsInitialLoad(false)
    }, [])

    useEffect(() => {
        if (!isInitialLoad) {
            localStorage.setItem('darkMode', isDarkMode.toString())
            document.documentElement.classList.toggle('dark', isDarkMode)
        }
    }, [isDarkMode, isInitialLoad])

    return (
        <div className='switch' data-is-on={isDarkMode} onClick={toggleSwitch}>
            <motion.div
                className='handle grid place-items-center'
                layout
                transition={spring}>
                {isDarkMode ? <MdModeNight /> : <MdLightMode />}
            </motion.div>
        </div>
    )
}
