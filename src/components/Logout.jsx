import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { AiOutlineLogout } from 'react-icons/ai'
import { Tooltip } from 'react-tooltip'
const Logout = () => {
    const signOutGoogle = () => {
        signOut(auth)
    }
    return (
        <div className='logout absolute top-5 right-5'>
            <button className='btn-secondary' onClick={signOutGoogle}>
                <AiOutlineLogout className='dark:text-light' />
            </button>
            <Tooltip anchorSelect='.logout' place='bottom-end'>
                Logout
            </Tooltip>
        </div>
    )
}

export default Logout
