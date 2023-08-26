import useCollection from '../../hooks/useCollection'
import BackButton from '../../components/BackButton'
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import List from '../../components/List'
import ToggleDarkMode from '../../components/ToggleDarkMode'

const ScoreBoard = () => {
    const { documents, error, loading } = useCollection(
        'Users',
        ['exp', '>=', 1],
        ['exp', 'desc'],
        10
    )

    return (
        <>
            {documents && (
                <div className='full-centered'>
                    <List documents={documents} />
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
