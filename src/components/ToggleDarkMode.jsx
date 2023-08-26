import { motion } from 'framer-motion'
import { MdLightMode, MdModeNight } from 'react-icons/md'
import useDarkMode from '../hooks/useDarkMode'

const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30
}

export default function ToggleDarkMode() {
    const { isDarkMode, setIsDarkMode } = useDarkMode()
    return (
        <div
            className='switch'
            data-is-on={isDarkMode}
            onClick={() => setIsDarkMode(!isDarkMode)}>
            <motion.div
                className='handle grid place-items-center'
                layout
                transition={spring}>
                {isDarkMode ? <MdModeNight /> : <MdLightMode className='text-tw-5' />}
            </motion.div>
        </div>
    )
}
