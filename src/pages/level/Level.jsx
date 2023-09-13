import BackButton from '@components/BackButton'
import Error from '@components/Error'
import Loading from '@components/Loading'
import ToggleDarkMode from '@components/ToggleDarkMode'
import useDocument from '@hooks/useDocument'
import useFirebaseAuth from '@hooks/useFirebaseAuth'

import LevelCard from './LevelCard'

const Level = () => {
    const { user, loading: userLoading } = useFirebaseAuth()
    const { document, loading, error } = useDocument('/Users', user?.uid) // return Object

    return (
        <div className="full-centered">
            {document && (
                <div className="mx-3 grid grid-cols-3 grid-rows-3 gap-10">
                    {document?.levels.map((level) => (
                        <LevelCard key={level.level} level={level} />
                    ))}
                </div>
            )}
            {(loading || userLoading) && <Loading />}
            {error && <Error error={error} />}
            <BackButton to="/" />
            <div className="absolute right-3 top-3">
                <ToggleDarkMode />
            </div>
        </div>
    )
}

export default Level
