import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    deleteUser
} from 'firebase/auth'
import { getMetadata, ref, deleteObject } from 'firebase/storage'
import Swal from 'sweetalert2'
import { auth, storage } from '../../config/firebase'
import useFirebaseAuth from '../../hooks/useFirebaseAuth'
import useFirestore from '../../hooks/useFirestore'

const DeleteAccount = () => {
    const { user } = useFirebaseAuth()
    const { deleteDocument } = useFirestore('Users')

    const checkImage = async () => {
        // check if ser profile image exist
        const imageRef = ref(storage, 'profiles/' + user.uid)

        getMetadata(imageRef)
            .then(async () => {
                try {
                    await deleteObject(imageRef)
                } catch (error) {
                    Swal.fire(error.message, '', 'error')
                }
            })
            .catch(() => {}) // if image doesn't exist just continue
    }

    const deleteUserAccountAndData = async () => {
        try {
            // delete user document in Users collection
            await deleteDocument(user.uid)
            // delete user profile image, if exist
            await checkImage()
            // delete user account
            await deleteUser(auth.currentUser)
            Swal.fire('Account Deleted.', '', 'success')
        } catch (error) {
            Swal.fire(error.message, '', 'error')
        }
    }

    const confirmPassword = async (password) => {
        try {
            const currentUser = auth.currentUser
            const credential = EmailAuthProvider.credential(
                currentUser.email,
                password
            )
            await reauthenticateWithCredential(currentUser, credential)
            deleteUserAccountAndData()
        } catch (error) {
            console.log(error.message)
            Swal.fire('Incorrect password, please try again.', '', 'error')
        }
    }

    const handleDeleteAccount = async () => {
        if (user?.providerData[0].providerId === 'password') {
            const { value: password } = await Swal.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: 'Deleting your account will permanently remove all of your personal information, saved data, and access to the game. This action cannot be undone.',
                showCancelButton: true,
                confirmButtonText: 'Delete Account',
                confirmButtonColor: '#b91c1c',
                input: 'password',
                inputLabel:
                    'To confirm deletion, please enter your account password below:',
                inputPlaceholder: 'Enter your password',
                inputAttributes: {
                    maxlength: 10,
                    autocapitalize: 'off',
                    autocorrect: 'off'
                }
            })
            if (password) {
                confirmPassword(password)
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: 'Deleting your account will permanently remove all of your personal information, saved data, and access to the game. This action cannot be undone.',
                showCancelButton: true,
                confirmButtonText: 'Delete Account',
                confirmButtonColor: '#b91c1c'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    deleteUserAccountAndData()
                }
            })
        }
    }
    return <button onClick={handleDeleteAccount}>Delete Account</button>
}

export default DeleteAccount
