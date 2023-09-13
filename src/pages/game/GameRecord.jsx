import PropTypes from 'prop-types'

const GameRecord = ({ level }) => {
    return (
        <div className="mt-3 rounded-lg border-2 border-tw-5 bg-tw-2 px-2 py-1 text-sm text-light dark:border-dark-blue dark:bg-navy  lg:w-1/3">
            <span className="text-lg">Game Records</span>
            <hr className="m-1 border-tw-5 dark:border-light" />
            <div className="flex justify-around">
                <span>
                    Best Time:{' '}
                    {level?.bestTime === 60 ? 'Not Set' : level?.bestTime + 's'}
                </span>
                <span className="mx-1 text-tw-5 dark:text-light">|</span>
                <span>
                    Best Turns:{' '}
                    {level?.bestTurns === 100 ? 'Not Set' : level?.bestTurns}
                </span>
            </div>
            <hr className="m-1 border-tw-5 dark:border-light" />
            <span>Completed Count : {level?.completedCount}</span>
        </div>
    )
}

GameRecord.propTypes = {
    level: PropTypes.object,
}

export default GameRecord
