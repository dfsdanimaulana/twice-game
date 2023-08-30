import { useRef } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import useFirebaseAuth from '@hooks/useFirebaseAuth'
import { generateLevelData } from '@utils/generateUserData'
import { db } from '@config/firebase'
import collectionImages from '@data/collectionImages'

const ResetGameData = () => {
    const { user } = useFirebaseAuth()
    const loadingToast = useRef(null)

    const handleResetGameData = async () => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'Resetting your data will permanently remove all of your saved data. This action cannot be undone.',
            showCancelButton: true,
            confirmButtonText: 'Reset Data',
            confirmButtonColor: '#b91c1c'
        }).then(async (result) => {
            if (result.isConfirmed) {
                loadingToast.current = toast.loading('Resetting game data')
                try {
                    const docRef = doc(db, 'Users/' + user?.uid)
                    await updateDoc(docRef, {
                        levels: generateLevelData(),
                        collections: collectionImages,
                        exp: 0
                    })
                    toast.dismiss(loadingToast.current)
                    Swal.fire('Game data reset successfully', '', 'success')
                } catch (error) {
                    toast.dismiss(loadingToast.current)
                    Swal.fire(
                        'Failed to reset game data:' + error.message,
                        '',
                        'error'
                    )
                }
            }
        })
    }

    return <button onClick={handleResetGameData}>Reset Game Data</button>
}

export default ResetGameData
