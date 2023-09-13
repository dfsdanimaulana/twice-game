import PropTypes from 'prop-types'
import { AiOutlineLeft } from 'react-icons/ai'

const LevelNavigator = ({levelNumber, next, prev, max}) => {
    
  return (
       <div className='flex items-center'>
          {levelNumber !== 1 && (
              <button
                  onClick={prev}
                  className='border-2 border-tw-5 rounded-lg bg-tw-3 hover:bg-tw-4 -mr-2 py-2 px-1 text-light font-bold transition duration-150 ease-in-out hover:scale-[1.2] dark:bg-navy dark:hover:bg-blue-600 dark:border-dark-blue'>
                  <AiOutlineLeft />
              </button>
          )}
          <button className='btn-primary' onClick={next}>
              {levelNumber !== max
                  ? 'Next Level'
                  : 'Coming Soon'}
          </button>
      </div>
    )
}

LevelNavigator.propTypes = {
    levelNumber: PropTypes.number,
    next : PropTypes.func,
    prev : PropTypes.func,
    max : PropTypes.number,
}

export default LevelNavigator