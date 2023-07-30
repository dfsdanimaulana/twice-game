import { Link } from 'react-router-dom'
import useFirebaseAuth from '../../hooks/useFirebaseAuth'
import { Tooltip } from 'react-tooltip'

// components
import {
    AiOutlineUser,
    AiOutlineSetting,
    AiOutlineOrderedList,
    AiOutlinePicture
} from 'react-icons/ai'
import GoogleButton from '../../components/GoogleButton'
import Logout from '../../components/Logout'
import Loading from '../../components/Loading'
import GithubButton from '../../components/GithubButton'
import Avatar from '../../components/Avatar'

const Home = () => {
    const { user, loading } = useFirebaseAuth()

    return (
        <>
            {!loading ? (
                <div className='home relative overflow-hidden'>
                    {user ? (
                        <div className='absolute w-full min-h-screen lg:bg-[url("/img/bg/bg-1.jpg")] bg-cover -z-10'></div>
                    ) : (
                        <>
                            <video
                                className='absolute w-full h-auto object-cover -z-20 hidden md:block'
                                autoPlay
                                loop
                                muted>
                                <source
                                    src='/video/videoplayback.mp4'
                                    type='video/mp4'
                                />
                            </video>
                            <div className='absolute w-full min-h-screen bg-[rgba(0,0,0,0.4)] -z-10 hidden md:block'></div>
                        </>
                    )}
                    <div className='flex flex-col items-center'>
                        {user && (
                            <div className='absolute top-5 left-5 flex items-center border rounded-md px-2 py-1 border-tw-5'>
                                <div className='max-w-[30px] mr-2'>
                                    <Avatar user={user} />
                                </div>
                                <span className='font-bold text-1xl text-tw-5'>
                                    {user.displayName}
                                </span>
                            </div>
                        )}
                        <h1 className='text-center text-5xl md:text-7xl text-light font-bn uppercase mb-5 drop-shadow-lg'>
                            TWICE MEMORY CARD GAME
                        </h1>

                        {!user && (
                            <>
                                <GoogleButton />
                                <GithubButton />
                                <Link
                                    to='/login'
                                    className='text-sm underline flex items-center px-3 text-light hover:text-blue-500'>
                                    <AiOutlineUser className='mr-1' />
                                    <span>Login/Register</span>
                                </Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Link
                                    to='/level'
                                    className='font-bold font-bn tracking-widest text-white text-3xl bg-gradient-to-r from-tw-4 via-tw-3 to-tw-2 hover:bg-gradient-to-r hover:from-tw-5 hover:via-tw-4 hover:to-tw-3 py-2 px-10 my-10 uppercase rounded-xl hover:shadow-md transition duration-150 ease-in-out hover:scale-[1.2]'>
                                    Start
                                </Link>
                                <div className='flex w-56 justify-between'>
                                    <Link
                                        to='/profile'
                                        id='profile'
                                        className='menu-icon'
                                        data-tip='Profile'>
                                        <AiOutlineUser />
                                    </Link>
                                    <Tooltip
                                        anchorSelect='#profile'
                                        place='bottom-end'>
                                        Profile
                                    </Tooltip>
                                    <Link
                                        to='/scoreboard'
                                        id='scoreboard'
                                        className='menu-icon'>
                                        <AiOutlineOrderedList />
                                    </Link>
                                    <Tooltip
                                        anchorSelect='#scoreboard'
                                        place='bottom'>
                                        Scoreboard
                                    </Tooltip>

                                    <Link
                                        to='/collection'
                                        id='collection'
                                        className='menu-icon'>
                                        <AiOutlinePicture />
                                    </Link>
                                    <Tooltip
                                        anchorSelect='#collection'
                                        place='bottom'>
                                        Collection Cards
                                    </Tooltip>

                                    <Link
                                        to='/setting'
                                        id='setting'
                                        className='menu-icon'>
                                        <AiOutlineSetting className='hover:animate-spin' />
                                    </Link>
                                    <Tooltip
                                        anchorSelect='#setting'
                                        place='bottom-start'>
                                        Settings
                                    </Tooltip>
                                </div>
                            </>
                        )}
                        {user && <Logout />}
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Home
