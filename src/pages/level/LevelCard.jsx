import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

import lockSVG from '@assets/svg/lock.svg'

const LevelCard = ({ level }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        !level.locked && navigate(`/game/${level.level}`)
    }

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.05 }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
            onClick={handleClick}
            className="border-3 relative cursor-pointer rounded-lg border-tw-4 bg-gradient-to-tr from-tw-5 to-tw-3 p-5 hover:border-tw-5 hover:shadow-md dark:border-dark-blue dark:bg-gradient-to-tr dark:from-navy dark:to-dark-blue"
        >
            <span className="mb-5 block text-4xl font-bold">{`LV${level.level}`}</span>
            <div className="flex justify-between gap-1 text-lg">
                <span>{level.star1 ? <AiFillStar /> : <AiOutlineStar />}</span>
                <span>{level.star2 ? <AiFillStar /> : <AiOutlineStar />}</span>
                <span>{level.star3 ? <AiFillStar /> : <AiOutlineStar />}</span>
            </div>
            {level.locked && (
                <img
                    src={lockSVG}
                    alt="locked"
                    className="absolute left-0 top-2 w-full"
                />
            )}
        </motion.div>
    )
}

LevelCard.propTypes = {
    level: PropTypes.object,
}

export default LevelCard
