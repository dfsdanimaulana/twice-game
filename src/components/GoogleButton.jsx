import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-toastify'
import { generateUserData } from '@utils/generateUserData'
import { auth, db } from '@config/firebase'

const GoogleButton = () => {
    const signUpWithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        try {
            const cred = await signInWithPopup(auth, provider)
            const user = cred.user

            const userRef = doc(db, 'Users', user.uid)
            const docSnapshot = await getDoc(userRef)
            if (!docSnapshot.exists()) {
                // User data doesn't exist, create it
                const userData = generateUserData(user)
                await setDoc(userRef, userData)
            }
            toast.success(`Welcome ${user?.displayName}`, {
                hideProgressBar: true
            })
        } catch (error) {
            // Handle any errors that occurred during the sign-up process
            if (
                error.code === 'auth/account-exists-with-different-credential'
            ) {
                toast.error(
                    'The email address is already in use by another account.'
                )
            } else {
                console.log(error.message)
            }
        }
    }

    return (
        <button onClick={signUpWithGoogle} className='auth-button'>
            <span className='mr-2 text-lg'>
                <FcGoogle />
            </span>
            Continue with Google
        </button>
    )
}

export default GoogleButton
