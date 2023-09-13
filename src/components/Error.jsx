import PropTypes from 'prop-types'

const Error = ({ error }) => {
    return <div>Error: {error}</div>
}

Error.propTypes = {
    error: PropTypes.any,
}

export default Error
