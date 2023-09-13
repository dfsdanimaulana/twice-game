import {
    collection,
    query,
    where,
    updateDoc,
    doc,
    getDocs,
} from 'firebase/firestore'
import { useState } from 'react'

import { db } from '@config/firebase'

const useUpdateDocumentsByUid = () => {
    const [updateStatus, setUpdateStatus] = useState({
        loading: false,
        error: null,
    })

    const updateDocuments = async (collectionName, uid, updateObject) => {
        try {
            setUpdateStatus({ loading: true, error: null })

            const collectionRef = collection(db, collectionName)
            const q = query(collectionRef, where('uid', '==', uid))

            const querySnapshot = await getDocs(q)

            querySnapshot.forEach(async (docSnapshot) => {
                const docRef = doc(db, collectionName, docSnapshot.id)
                await updateDoc(docRef, updateObject)
            })

            setUpdateStatus({ loading: false, error: null })
        } catch (error) {
            setUpdateStatus({ loading: false, error: error.message })
        }
    }

    return { updateDocuments, updateStatus }
}

export default useUpdateDocumentsByUid
