import {
    AiOutlineLogout,
    AiOutlineSetting,
    AiOutlineUserDelete
} from 'react-icons/ai'
import { BiReset } from 'react-icons/bi'
import ToggleDarkMode from '@components/ToggleDarkMode'
import BackButton from '@components/BackButton'
import ResetGameData from './ResetGameData'
import DeleteAccount from './DeleteAccount'
import Logout from './Logout'

const Setting = () => {
    return (
        <div className='full-centered'>
            <div className='border border-tw-5 dark:border-dark-blue p-4 rounded-lg'>
                <span className='font-bold text-2xl flex items-center'>
                    <AiOutlineSetting className='mr-1 hover:animate-spin' />
                    Setting
                </span>
                <hr className='border-tw-5 dark:border-dark-blue my-3' />
                <ul className='flex flex-col gap-3'>
                    <li className='setting-list'>
                        <AiOutlineLogout />
                        <Logout />
                    </li>
                    <li className='setting-list'>
                        <BiReset />
                        <ResetGameData />
                    </li>
                    <li className='setting-list text-red-500 hover:text-red-700'>
                        <AiOutlineUserDelete />
                        <DeleteAccount />
                    </li>
                </ul>
            </div>
            <div className='absolute top-3 right-3'>
                <ToggleDarkMode />
            </div>
            <BackButton to='/' />
        </div>
    )
}

export default Setting
