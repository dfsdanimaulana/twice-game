import {
    AiOutlineSetting,
    AiOutlineOrderedList,
    AiOutlinePicture,
    AiOutlineMessage,
    AiOutlineUser
} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

function MenuList() {
    return (
        <div className='flex justify-between gap-3'>
            <Link
                to='/profile'
                id='profile'
                className='guide-profile menu-icon'
                data-tip='Profile'>
                <AiOutlineUser />
            </Link>
            <Tooltip anchorSelect='#profile' place='bottom-end'>
                Profile
            </Tooltip>
            <Link
                to='/scoreboard'
                id='scoreboard'
                className='guide-scoreboard menu-icon'>
                <AiOutlineOrderedList />
            </Link>
            <Tooltip anchorSelect='#scoreboard' place='bottom'>
                Scoreboard
            </Tooltip>

            <Link
                to='/collection'
                id='collection'
                className='guide-collection menu-icon'>
                <AiOutlinePicture />
            </Link>
            <Tooltip anchorSelect='#collection' place='bottom'>
                Collection Cards
            </Tooltip>

            <Link to='/chat' id='chat' className='guide-chat menu-icon'>
                <AiOutlineMessage />
            </Link>
            <Tooltip anchorSelect='#chat' place='bottom'>
                Chats Room
            </Tooltip>

            <Link
                to='/setting'
                id='setting'
                className='guide-settings menu-icon'>
                <AiOutlineSetting className='hover:animate-spin' />
            </Link>
            <Tooltip anchorSelect='#setting' place='bottom-start'>
                Settings
            </Tooltip>
        </div>
    )
}

export default MenuList
