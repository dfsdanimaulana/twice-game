import { motion } from 'framer-motion'
import { MdLightMode, MdModeNight } from 'react-icons/md'

import useDarkMode from '@hooks/useDarkMode'

import FullscreenButton from './FullscreenButton'

const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
}

export default function ToggleDarkMode() {
    const { isDarkMode, setIsDarkMode } = useDarkMode()
    return (
        <div className="flex items-center gap-3">
            <FullscreenButton />
            <div
                className="switch guide-theme hover:bg-semi-transparent"
                data-is-on={isDarkMode}
                onClick={() => setIsDarkMode(!isDarkMode)}
            >
                <motion.div
                    className="handle grid place-items-center"
                    layout
                    transition={spring}
                >
                    {isDarkMode ? (
                        <MdModeNight />
                    ) : (
                        <MdLightMode className="text-tw-5" />
                    )}
                </motion.div>
            </div>
        </div>
    )
}
