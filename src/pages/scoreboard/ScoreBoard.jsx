import ScoreboardList from './ScoreboardList'
import BackButton from '../../components/BackButton'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import ToggleDarkMode from '../../components/ToggleDarkMode'
import useCollection from '../../hooks/useCollection'

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
