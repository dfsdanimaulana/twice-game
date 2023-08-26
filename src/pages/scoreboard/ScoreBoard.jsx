import useCollection from '../../hooks/useCollection'
import BackButton from '../../components/BackButton'
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import List from '../../components/List'

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
        </>
    )
}

export default ScoreBoard
