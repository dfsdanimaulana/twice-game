import useFirebaseAuth from '../../hooks/useFirebaseAuth'
import useDocument from '../../hooks/useDocument'

// components
import ToggleDarkMode from '../../components/ToggleDarkMode'
import BackButton from '../../components/BackButton'
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import LevelCard from './LevelCard'

const Level = () => {
    const { user, loading: userLoading } = useFirebaseAuth()
    const { document, loading, error } = useDocument('/Users', user?.uid) // return Object

    return (
        <div className='full-centered'>
            {document && (
                <div className='grid grid-cols-3 grid-rows-3 gap-10 mx-3'>
                    {document?.levels.map((level) => (
                        <LevelCard key={level.level} level={level} />
                    ))}
                </div>
            )}
            {(loading || userLoading) && <Loading />}
            {error && <Error error={error} />}
            <BackButton to='/' />
            <div className='absolute top-3 right-3'>
                <ToggleDarkMode />
            </div>
        </div>
    )
}

export default Level
