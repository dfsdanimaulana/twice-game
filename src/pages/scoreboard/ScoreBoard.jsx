import ToggleDarkMode from '../../components/ToggleDarkMode'
import BackButton from '../../components/BackButton'
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import useCollection from '../../hooks/useCollection'
import ScoreboardList from './ScoreboardList'

const ScoreBoard = () => {
    const { documents, error, loading } = useCollection(
        'Users',
        ['exp', '>=', 1],
        ['exp', 'desc']
    )

    return (
        <>
            {documents && (
                <div className='full-centered'>
                    <ScoreboardList documents={documents} />
                </div>
            )}
            {loading && <Loading />}
            {error && <Error error={error} />}
            <BackButton to='/' />
            <div className='absolute top-3 right-3'>
                <ToggleDarkMode />
            </div>
        </>
    )
}

export default ScoreBoard
