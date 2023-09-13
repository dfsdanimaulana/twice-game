import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom'

import Loading from '@components/Loading'
import useFirebaseAuth from '@hooks/useFirebaseAuth'

const ProtectedRoute = ({ children, redirectPath = '/', admin }) => {
    const { user, loading } = useFirebaseAuth()

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to={redirectPath} replace />
    }

    if (admin && !user.role.includes('admin')) {
        return <Navigate to='/' replace />
    }

    return children ? children : <Outlet />
}

ProtectedRoute.propTypes = {
    children: PropTypes.element,
    redirectPath: PropTypes.string,
    admin: PropTypes.bool
}

export default ProtectedRoute
