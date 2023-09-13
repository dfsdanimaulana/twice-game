import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { AiFillStar, AiOutlineStar, AiOutlineClose } from 'react-icons/ai'
import { FaRedo, FaHome } from 'react-icons/fa'
import ReactModal from 'react-modal'
import { Link } from 'react-router-dom'

const LevelCompleteModal = ({
    levelComplete,
    setLevelComplete,
    goToNextLevel,
    shuffleCards,
    gamePoint,
    level,
    stars,
    collections,
    turns,
    timeCount,
}) => {
    const handleModalClose = () => {
        setLevelComplete(false)
    }
    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={levelComplete}
            onRequestClose={handleModalClose}
            className="relative rounded-xl border-2 border-tw-5 bg-tw-2 bg-gradient-to-tr from-tw-3 to-tw-1 px-7 py-5 dark:border-dark-blue dark:bg-gradient-to-tr dark:from-navy dark:to-dark-blue lg:px-16 lg:pb-5 lg:pt-14"
            overlayClassName="modal-overlay"
        >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded-lg border-2 border-light bg-tw-3 px-6 py-1 dark:border-dark-blue dark:bg-navy lg:px-7 lg:py-2">
                <span className="text-xl font-bold text-light lg:text-3xl">
                    Level {level}
                </span>
            </div>
            <button
                onClick={handleModalClose}
                className="absolute -right-2 -top-2 transform rounded-full border-2 border-tw-5 bg-red-400 p-1 duration-75 hover:scale-[1.1] hover:bg-red-500 dark:border-dark-blue dark:bg-red-700 dark:hover:bg-red-500"
            >
                <AiOutlineClose className="text-xl text-light" />
            </button>
            <div className="relative mt-10 flex justify-around text-6xl text-light lg:gap-5">
                <span className="rotate-45 lg:scale-[1.2] lg:hover:scale-[1.25]">
                    {stars.star1 ? (
                        <AiFillStar className="text-yellow-300" />
                    ) : (
                        <AiOutlineStar />
                    )}
                </span>
                <span className="relative -top-7 scale-[1.2] lg:scale-[2] lg:hover:scale-[2.05]">
                    {stars.star2 ? (
                        <AiFillStar className="text-yellow-300" />
                    ) : (
                        <AiOutlineStar />
                    )}
                </span>
                <span className="rotate-45 lg:scale-[1.2] lg:hover:scale-[1.25]">
                    {stars.star3 ? (
                        <AiFillStar className="text-yellow-300" />
                    ) : (
                        <AiOutlineStar />
                    )}
                </span>
            </div>
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="my-3 rounded rounded-t-xl border-2 border-light text-center lg:my-6"
            >
                <span className="text-lg font-bold text-light">
                    Score: {gamePoint}
                </span>
                <hr className="mx-2 border border-light" />
                <div className="my-1 flex items-center justify-evenly">
                    <span className="text-sm font-bold text-light">
                        Turns: {turns}
                    </span>
                    <span>|</span>
                    <span className="text-sm font-bold text-light">
                        Time: {timeCount}s
                    </span>
                </div>
                <hr className="border border-light" />
                <div className="m-3 flex items-center justify-evenly  gap-2">
                    {collections?.map((collection, index) => (
                        <div
                            key={index}
                            className="h-16 w-12 overflow-hidden rounded-md border-2"
                        >
                            {collection.locked ? (
                                <img
                                    src="/img/collection/back.png"
                                    alt="back"
                                    className="w-full"
                                />
                            ) : (
                                <img
                                    src={collection.src}
                                    alt="back"
                                    className="w-full"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>
            <div className="flex items-center justify-around lg:scale-[1.2]">
                <div className="-mr-12 flex items-center">
                    <Link
                        to="/"
                        className="mr-1 block rounded-lg border-2 border-tw-5 bg-tw-3 p-2 font-bold text-light transition duration-150 ease-in-out hover:scale-[1.2] hover:bg-tw-4 dark:border-dark-blue dark:bg-navy dark:hover:bg-blue-600"
                    >
                        <FaHome />
                    </Link>
                    <button
                        onClick={shuffleCards}
                        className="rounded-lg border-2 border-tw-5 bg-tw-3 p-2 font-bold text-light transition duration-150 ease-in-out hover:scale-[1.2] hover:bg-tw-4 dark:border-dark-blue dark:bg-navy dark:hover:bg-blue-600"
                    >
                        <FaRedo />
                    </button>
                </div>
                <button onClick={goToNextLevel} className="btn-primary">
                    Continue
                </button>
            </div>
        </ReactModal>
    )
}

LevelCompleteModal.propTypes = {
    levelComplete: PropTypes.bool,
    setLevelComplete: PropTypes.func,
    goToNextLevel: PropTypes.func,
    shuffleCards: PropTypes.func,
    gamePoint: PropTypes.number,
    level: PropTypes.string,
    stars: PropTypes.object,
    collections: PropTypes.any,
    turns: PropTypes.number,
    timeCount: PropTypes.number,
}

export default LevelCompleteModal
