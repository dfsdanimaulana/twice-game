import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDUpzR_1pMw29H20NQ_ZIDEBLmHPGQIJJo',
    authDomain: 'twice-card.firebaseapp.com',
    projectId: 'twice-card',
    storageBucket: 'twice-card.appspot.com',
    messagingSenderId: '203630509256',
    appId: '1:203630509256:web:36c7fc16f421d7e22a79fd'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
