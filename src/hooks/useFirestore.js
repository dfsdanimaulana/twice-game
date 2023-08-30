import { useReducer, useEffect, useState } from 'react'
import {
    collection,
    doc,
    deleteDoc,
    updateDoc,
    serverTimestamp,
    setDoc
} from 'firebase/firestore'
import { db } from '@config/firebase'

const initialValue = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return {
                document: null,
                isPending: true,
                success: false,
                error: null
            }

        case 'ADDED_DOCUMENT':
        case 'UPDATED_DOCUMENT':
            return {
                document: action.payload,
                isPending: false,
                success: true,
                error: null
            }

        case 'DELETED_DOCUMENT':
            return {
                document: null,
                isPending: false,
                success: true,
                error: null
            }

        case 'ERROR':
            return {
                document: null,
                isPending: false,
                success: false,
                error: action.payload
            }

        default:
            return state
    }
}

const useFirestore = (collectionName) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialValue)
    const [isCancelled, setIsCancelled] = useState(false)

    // Collection reference
    const colRef = collection(db, collectionName)

    // Only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    // Add document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })
        try {
            const createdAt = serverTimestamp() // Create timestamp for the document
            const addedDocumentRef = await setDoc(colRef, { ...doc, createdAt })
            dispatchIfNotCancelled({
                type: 'ADDED_DOCUMENT',
                payload: { ...doc, createdAt, id: addedDocumentRef.id }
            })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    // Delete document
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' })
        try {
            await deleteDoc(doc(colRef, id))
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    // Update document
    const updateDocument = async (id, updates) => {
        dispatch({ type: 'IS_PENDING' })
        try {
            const updatedAt = serverTimestamp() // Create timestamp for the update
            await updateDoc(doc(colRef, id), { ...updates, updatedAt })
            dispatchIfNotCancelled({
                type: 'UPDATED_DOCUMENT',
                payload: { ...updates, updatedAt, id }
            })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    // Cleanup function
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { response, addDocument, deleteDocument, updateDocument }
}

export default useFirestore
