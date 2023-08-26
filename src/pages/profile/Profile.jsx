import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { BiEdit } from 'react-icons/bi'
import { MdVerified } from 'react-icons/md'
import { Tooltip } from 'react-tooltip'
import { sendEmailVerification } from 'firebase/auth'
import useFirebaseAuth from '../../hooks/useFirebaseAuth'
import { auth } from '../../config/firebase'

// components
import BackButton from '../../components/BackButton'
import UpdatePhotoModal from '../../components/UpdatePhotoModal'
import UpdateDisplayNameModal from '../../components/UpdateDisplayNameModal'
import UpdatePasswordModal from '../../components/UpdatePasswordModal'
import Loading from '../../components/Loading'

const Profile = () => {
    const { user, loading } = useFirebaseAuth()
    const [modalOpen, setModalOpen] = useState(false)
    const [photoModalOpen, setPhotoModalOpen] = useState(false)
    const [passwordOpen, setPasswordOpen] = useState(false)

    const loadingToast = useRef(null)

    const handleVerifyEmail = async () => {
        loadingToast.current = toast.loading('Sending verification email')
        try {
            await sendEmailVerification(auth.currentUser)
            toast.dismiss(loadingToast.current)
            toast.success('Email verification sent.')
        } catch (error) {
            console.log(error)
            toast.dismiss(loadingToast.current)
            toast.error(error.message)
        }
    }

    return (
        <div className='full-centered'>
            {user && (
                <div className='flex flex-col border-2 p-6 rounded-lg border-light'>
                    <div className='flex items-center border-b-2 border-b-light pb-2 mb-2'>
                        <div className='mr-4 relative'>
                            <img
                                src={user?.photoURL}
                                className='w-16 h-16 object-cover object-top rounded-full border border-tw-5'
                                alt={user?.displayName}
                            />
                            <button
                                onClick={() => setPhotoModalOpen(true)}
                                className='absolute bottom-0 right-0'
                                data-tooltip='profile_image_tooltip'
                                id='profile_image_tooltip'>
                                <BiEdit />
                            </button>
                            <Tooltip
                                anchorSelect='#profile_image_tooltip'
                                place='bottom-start'>
                                Update profile photo
                            </Tooltip>
                        </div>
                        <h1 className='text-2xl font-bold'>
                            {user?.displayName}
                        </h1>
                    </div>
                    <ul className='flex flex-col gap-2'>
                        <li className='flex items-center justify-between'>
                            <span>
                                <span className='inline-block w-24 text-sm font-semibold'>
                                    Username{' '}
                                </span>
                                : {user?.displayName}
                            </span>
                            <button
                                onClick={() => setModalOpen(true)}
                                data-tooltip='profile_username_tooltip'
                                id='profile_username_tooltip'>
                                <BiEdit />
                            </button>
                            <Tooltip
                                anchorSelect='#profile_username_tooltip'
                                place='top-start'>
                                Update username
                            </Tooltip>
                        </li>
                        <li className='flex items-center justify-between'>
                            <span>
                                <span className='inline-block w-24 text-sm font-semibold'>
                                    Email{' '}
                                </span>
                                : {user?.email}
                            </span>
                            {user?.emailVerified ? (
                                <>
                                    <span
                                        className='text-blue-500'
                                        id='verified'
                                        data-tip='verified'>
                                        <MdVerified />
                                    </span>
                                    <Tooltip
                                        anchorSelect='#verified'
                                        place='bottom-start'>
                                        Email is verified
                                    </Tooltip>
                                </>
                            ) : (
                                <>
                                    <button onClick={handleVerifyEmail}>
                                        <span
                                            className='text-red-500'
                                            id='unverified'
                                            data-tip='unverified'>
                                            <MdVerified />
                                        </span>
                                    </button>
                                    <Tooltip
                                        anchorSelect='#unverified'
                                        place='bottom-start'>
                                        Email not verified, click to verify your
                                        email
                                    </Tooltip>
                                </>
                            )}
                        </li>
                        <li>
                            <span className='inline-block w-24 text-sm font-semibold'>
                                Provider{' '}
                            </span>
                            : {user?.providerData[0].providerId}
                        </li>
                        {user?.providerData[0].providerId === 'password' && (
                            <li className='text-center'>
                                <button
                                    className='form-button'
                                    onClick={() => setPasswordOpen(true)}>
                                    Change Password
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
            {loading && <Loading />}
            <BackButton />
            <UpdateDisplayNameModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                uid={user?.uid}
            />
            <UpdatePhotoModal
                photoModalOpen={photoModalOpen}
                setPhotoModalOpen={setPhotoModalOpen}
            />
            <UpdatePasswordModal
                passwordOpen={passwordOpen}
                setPasswordOpen={setPasswordOpen}
            />
        </div>
    )
}

export default Profile
