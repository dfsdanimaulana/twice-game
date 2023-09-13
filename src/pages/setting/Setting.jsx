import {
    AiOutlineLogout,
    AiOutlineSetting,
    AiOutlineUserDelete,
} from 'react-icons/ai'
import { BiReset } from 'react-icons/bi'

import BackButton from '@components/BackButton'
import ToggleDarkMode from '@components/ToggleDarkMode'

import DeleteAccount from './DeleteAccount'
import Logout from './Logout'
import ResetGameData from './ResetGameData'

const Setting = () => {
    return (
        <div className="full-centered">
            <div className="rounded-lg border border-tw-5 p-4 dark:border-dark-blue">
                <span className="flex items-center text-2xl font-bold">
                    <AiOutlineSetting className="mr-1 hover:animate-spin" />
                    Setting
                </span>
                <hr className="my-3 border-tw-5 dark:border-dark-blue" />
                <ul className="flex flex-col gap-3">
                    <li className="setting-list">
                        <AiOutlineLogout />
                        <Logout />
                    </li>
                    <li className="setting-list">
                        <BiReset />
                        <ResetGameData />
                    </li>
                    <li className="setting-list text-red-500 hover:text-red-700">
                        <AiOutlineUserDelete />
                        <DeleteAccount />
                    </li>
                </ul>
            </div>
            <div className="absolute right-3 top-3">
                <ToggleDarkMode />
            </div>
            <BackButton to="/" />
        </div>
    )
}

export default Setting
