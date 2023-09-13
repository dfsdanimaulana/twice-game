import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="relative max-w-[70px] md:max-w-[120px]"
        >
            <div className={flipped ? 'flipped' : ''}>
                <img
                    className="front block w-full rounded-lg border-2 border-white hover:shadow-lg"
                    src={card.src}
                    alt="card front"
                />
                <div className="hidden dark:block">
                    <img
                        className="back block w-full rounded-lg border-2 border-white hover:shadow-lg"
                        src="/img/cover.jpg"
                        onClick={handleClick}
                        alt="cover"
                    />
                </div>
                <div className="block dark:hidden">
                    <img
                        className="back block w-full rounded-lg border-2 border-white hover:shadow-lg"
                        src="/img/cover-light.jpg"
                        onClick={handleClick}
                        alt="cover"
                    />
                </div>
            </div>
        </motion.div>
    )
}

SingleCard.propTypes = {
    card: PropTypes.object,
    handleChoice: PropTypes.func,
    flipped: PropTypes.bool,
    disabled: PropTypes.bool,
}

export default SingleCard
