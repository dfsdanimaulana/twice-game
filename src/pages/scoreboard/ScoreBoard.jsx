import { useEffect } from 'react'
import useCollection from '../../hooks/useCollection'
import BackButton from '../../components/BackButton'
import Loading from '../../components/Loading'
import Error from '../../components/Error'

const ScoreBoard = () => {
    const { documents, error, loading } = useCollection(
        'Users',
        ['exp', '>=', 1],
        ['exp', 'desc']
    )

    useEffect(() => {
        console.log(documents)
    }, [documents])

    return (
        <>
            <div className='full-centered'>
                {documents &&
                    documents.map((doc) => (
                        <div key={doc.id}>
                            <div>{doc?.displayName}</div>
                            <div>{doc?.exp}</div>
                        </div>
                    ))}
            </div>
            {loading && <Loading />}
            {error && <Error error={error} />}
            <BackButton />
        </>
    )
}

export default ScoreBoard
