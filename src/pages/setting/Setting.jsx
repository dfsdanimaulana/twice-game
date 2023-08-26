import { AiOutlineSetting, AiOutlineUserDelete } from 'react-icons/ai'
import BackButton from '../../components/BackButton'
import { BiReset } from 'react-icons/bi'
import DeleteAccount from '../../components/DeleteAccount'
import ResetGameData from '../../components/ResetGameData'
import ToggleDarkMode from '../../components/ToggleDarkMode'
import { MdToggleOn } from 'react-icons/md'

const Setting = () => {
    return (
        <div className='full-centered'>
            <div className='border border-tw-5 dark:border-dark-blue p-4 rounded-lg'>
                <span className='font-bold text-2xl flex items-center'>
                    <AiOutlineSetting className='mr-1' />
                    Setting
                </span>
                <hr className='border-tw-5 dark:border-dark-blue my-3' />
                <ul className='flex flex-col gap-3'>
                    <li className='setting-list'>
                        <MdToggleOn />
                        Theme Mode <ToggleDarkMode />
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

            <BackButton to='/' />
        </div>
    )
}

export default Setting
