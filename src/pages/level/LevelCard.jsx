import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import lockSVG from '../../assets/svg/lock.svg'

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
            className='p-5 border-3 rounded-lg cursor-pointer hover:shadow-md relative bg-gradient-to-tr from-tw-5 to-tw-3 border-tw-4 hover:border-tw-5 dark:border-dark-blue dark:bg-gradient-to-tr dark:from-navy dark:to-dark-blue'>
            <span className='block font-bold text-4xl mb-5'>{`LV${level.level}`}</span>
            <div className='flex gap-1 justify-between text-lg'>
                <span>{level.star1 ? <AiFillStar /> : <AiOutlineStar />}</span>
                <span>{level.star2 ? <AiFillStar /> : <AiOutlineStar />}</span>
                <span>{level.star3 ? <AiFillStar /> : <AiOutlineStar />}</span>
            </div>
            {level.locked && (
                <img
                    src={lockSVG}
                    alt='locked'
                    className='absolute top-2 left-0 w-full'
                />
            )}
        </motion.div>
    )
}

LevelCard.propTypes = {
    level: PropTypes.object
}

export default LevelCard
