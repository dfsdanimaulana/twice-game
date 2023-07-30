import { useState, useEffect, useRef } from 'react'
import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot
} from 'firebase/firestore'
import { db } from '../config/firebase'

const useCollection = (collectionName, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const queryRef = useRef(_query)
    const orderByRef = useRef(_orderBy)

    useEffect(() => {
        let collectionRef = collection(db, collectionName)

        // Filter collection by query if there is any
        if (queryRef.current) {
            const [field, operator, value] = queryRef.current
            collectionRef = query(collectionRef, where(field, operator, value))
        }

        // Apply ordering if specified
        if (orderByRef.current) {
            const [field, direction] = orderByRef.current
            collectionRef = query(collectionRef, orderBy(field, direction))
        }

        const unsub = onSnapshot(
            collectionRef,
            (snapshot) => {
                const results = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))

                setDocuments(results)
                setLoading(false)
                setError(null)
            },
            (err) => {
                console.log(err)
                setLoading(false)
                setError(err.message)
            }
        )

        // Cleanup unsub on unmount
        return () => unsub()
    }, [collectionName, queryRef, orderByRef])

    return { documents, error, loading }
}

export default useCollection
