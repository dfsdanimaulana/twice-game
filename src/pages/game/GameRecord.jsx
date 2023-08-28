import PropTypes from 'prop-types'

const GameRecord = ({ level }) => {
    return (
        <div className='mt-3 lg:w-1/3 border-2 text-sm text-light bg-tw-2 border-tw-5 py-1 px-2 rounded-lg dark:bg-navy  dark:border-dark-blue'>
            <span className='text-lg'>Game Record</span>
            <hr className='border-tw-5 m-1' />
            <div className='flex justify-around'>
                <span>
                    Best Time:{' '}
                    {level?.bestTime === 60 ? 'Not Set' : level?.bestTime + 's'}
                </span>
                <span className='text-tw-5 mx-1'>|</span>
                <span>
                    Best Turns:{' '}
                    {level?.bestTurns === 100 ? 'Not Set' : level?.bestTurns}
                </span>
            </div>
            <hr className='border-tw-5 m-1' />
            <span>Completed Count : {level?.completedCount}</span>
        </div>
    )
}

GameRecord.propTypes = {
    level: PropTypes.object
}

export default GameRecord
