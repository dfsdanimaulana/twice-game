import PropTypes from 'prop-types'

const Avatar = ({ user }) => {
    return (
        <img
            src={user?.photoURL}
            alt='profile photo'
            className='w-full h-auto rounded-full border-2'
        />
    )
}

Avatar.propTypes = {
    user: PropTypes.object.isRequired
}

export default Avatar
