import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'
import { auth, db } from '../config/firebase'
import { toast } from 'react-toastify'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { generateUserData } from '../utils/generateUserData'

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
            toast.error(error?.message)
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
