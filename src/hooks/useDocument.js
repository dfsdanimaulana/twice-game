import { doc, onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from 'react'

import { db } from '../config/firebase'

const useDocument = (collectionName, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const documentRef = doc(db, collectionName + '/' + id)

        const unsub = onSnapshot(
            documentRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    setDocument({ ...snapshot.data(), id: snapshot.id })
                    setError(null)
                    setLoading(false)
                } else {
                    setLoading(false)
                    setError('No such document exists')
                }
            },
            (err) => {
                console.log(err)
                setLoading(false)
                setError('Failed to get document')
            },
        )

        return () => unsub()
    }, [collectionName, id])

    return { document, loading, error }
}

export default useDocument
