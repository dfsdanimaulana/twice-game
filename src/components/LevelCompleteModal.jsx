import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { AiFillStar, AiOutlineStar, AiOutlineClose } from 'react-icons/ai'
import { FaRedo, FaHome } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const LevelCompleteModal = ({
    levelComplete,
    setLevelComplete,
    goToNextLevel,
    shuffleCards,
    gamePoint,
    level,
    stars
}) => {
    const handleModalClose = () => {
        setLevelComplete(false)
    }

    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={levelComplete}
            onRequestClose={handleModalClose}
            className='relative bg-tw-2 px-7 py-5 lg:px-16 lg:pt-14 lg:pb-5 rounded-xl border-2 border-tw-5 dark:border-dark-blue bg-gradient-to-tr from-tw-3 to-tw-1 dark:bg-gradient-to-tr dark:from-navy dark:to-dark-blue'
            overlayClassName='modal-overlay'>
            <div className='absolute border-2 border-light whitespace-nowrap py-1 px-6 lg:py-2 lg:px-7 -top-6 left-1/2 transform -translate-x-1/2 bg-tw-3 rounded-lg dark:bg-navy dark:border-dark-blue'>
                <span className='text-xl lg:text-3xl font-bold text-light'>
                    Level {level}
                </span>
            </div>
            <button
                onClick={handleModalClose}
                className='absolute -top-2 -right-2 transform bg-red-400 hover:bg-red-500 hover:scale-[1.1] duration-75 p-1 rounded-full border-2 border-tw-5 dark:bg-red-700 dark:hover:bg-red-500 dark:border-dark-blue'>
                <AiOutlineClose className='text-light text-xl' />
            </button>
            <div className='relative flex justify-around text-6xl text-light mt-10 lg:gap-5'>
                <span className='rotate-45 lg:scale-[1.2] lg:hover:scale-[1.25]'>
                    {stars.star1 ? (
                        <AiFillStar className='text-yellow-300' />
                    ) : (
                        <AiOutlineStar />
                    )}
                </span>
                <span className='relative -top-7 scale-[1.2] lg:scale-[2] lg:hover:scale-[2.05]'>
                    {stars.star2 ? (
                        <AiFillStar className='text-yellow-300' />
                    ) : (
                        <AiOutlineStar />
                    )}
                </span>
                <span className='rotate-45 lg:scale-[1.2] lg:hover:scale-[1.25]'>
                    {stars.star3 ? (
                        <AiFillStar className='text-yellow-300' />
                    ) : (
                        <AiOutlineStar />
                    )}
                </span>
            </div>
            <motion.div
                whileHover={{ scale: 1.05 }}
                className='text-center border-2 border-light rounded my-3 lg:my-6'>
                <span className='text-lg text-light font-bold'>
                    Score: {gamePoint}
                </span>
                <hr className='border border-light mx-2' />
                <div className='flex items-center justify-evenly m-3  gap-5'>
                    <div className='border-2 rounded-md w-12 h-16 overflow-hidden'>
                        <img
                            src='/img/collection/back.png'
                            alt='back'
                            className='w-full'
                        />
                    </div>
                    <div className='border-2 rounded-md w-12 h-16 overflow-hidden'>
                        <img
                            src='/img/collection/back.png'
                            alt='back'
                            className='w-full'
                        />
                    </div>
                    <div className='border-2 rounded-md w-12 h-16 overflow-hidden'>
                        <img
                            src='/img/collection/back.png'
                            alt='back'
                            className='w-full'
                        />
                    </div>
                </div>
            </motion.div>
            <div className='flex items-center justify-around lg:scale-[1.2]'>
                <div className='-mr-3 md:-mr-8 flex items-center'>
                    <Link
                        to='/'
                        className='block mr-1 border-2 border-tw-5 rounded-lg bg-tw-3 hover:bg-tw-4 p-2 text-light font-bold transition duration-150 ease-in-out hover:scale-[1.2] dark:bg-navy dark:hover:bg-blue-600 dark:border-dark-blue'>
                        <FaHome />
                    </Link>
                    <button
                        onClick={shuffleCards}
                        className='border-2 border-tw-5 rounded-lg bg-tw-3 hover:bg-tw-4 p-2 text-light font-bold transition duration-150 ease-in-out hover:scale-[1.2] dark:bg-navy dark:hover:bg-blue-600 dark:border-dark-blue'>
                        <FaRedo />
                    </button>
                </div>
                <button onClick={goToNextLevel} className='btn-primary'>
                    Continue
                </button>
            </div>
        </ReactModal>
    )
}

LevelCompleteModal.propTypes = {
    levelComplete: PropTypes.bool.isRequired,
    setLevelComplete: PropTypes.func.isRequired
}

export default LevelCompleteModal
