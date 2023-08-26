import { Link } from 'react-router-dom'
import useFirebaseAuth from '../../hooks/useFirebaseAuth'
import { Tooltip } from 'react-tooltip'

// components
import {
    AiOutlineUser,
    AiOutlineSetting,
    AiOutlineOrderedList,
    AiOutlinePicture,
    AiOutlineMessage
} from 'react-icons/ai'
import GoogleButton from '../../components/GoogleButton'
import Logout from '../../components/Logout'
import Loading from '../../components/Loading'
import GithubButton from '../../components/GithubButton'
import ImageWithFallback from '../../components/ImageWithFallBack'

const Home = () => {
    const { user, loading } = useFirebaseAuth()

    return (
        <>
            {!loading ? (
                <div className='home relative overflow-hidden'>
                    {user ? (
                        <>
                            <div className='absolute w-full min-h-screen bg-[url("/img/bg/bg-sm-2.jpg")] md:bg-[url("/img/bg/all.jpeg")] dark:md:bg-[url(/img/bg/bg-1.jpg)] bg-cover bg-center -z-20'></div>
                            <div className='absolute w-full min-h-screen bg-[rgba(0,0,0,0.2)] bg-cover bg-center -z-10'></div>
                        </>
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
                            <video
                                className='absolute w-full h-auto object-cover -z-20 block md:hidden'
                                autoPlay
                                loop
                                muted>
                                <source
                                    src='/video/videoplayback-sm.mp4'
                                    type='video/mp4'
                                />
                            </video>
                            <div className='absolute w-full min-h-screen bg-[rgba(0,0,0,0.4)] -z-10'></div>
                        </>
                    )}
                    <div className='flex flex-col items-center'>
                        {user && (
                            <div className='absolute top-5 left-5 flex items-center border rounded-md px-2 py-1 border-light dark:border-dark-blue'>
                                <ImageWithFallback
                                    imageUrl={user.photoURL}
                                    imageClasses='w-8 h-8 object-cover object-top rounded-full mr-2'
                                    alt='photoURL'
                                />
                                <span className='font-bold text-1xl text-light'>
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
                                    className='border border-light font-bold font-bn tracking-widest text-white text-3xl bg-gradient-to-r from-tw-4 via-tw-3 to-tw-2 hover:bg-gradient-to-r hover:from-tw-5 hover:via-tw-4 hover:to-tw-3 dark:bg-gradient-to-tr dark:from-dark-blue dark:to-navy py-2 px-10 my-10 uppercase rounded-xl hover:shadow-md transition duration-150 ease-in-out hover:scale-[1.2]'>
                                    Start
                                </Link>
                                <div className='flex justify-between gap-3'>
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
                                        to='/chat'
                                        id='chat'
                                        className='menu-icon'>
                                        <AiOutlineMessage />
                                    </Link>
                                    <Tooltip
                                        anchorSelect='#chat'
                                        place='bottom'>
                                        Chats Room
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
            <p className='fixed bottom-1 left-1 text-white text-sm '>
                © 2023 by{' '}
                <a
                    href='https://www.instagram.com/dnm17_/'
                    target='_blank'
                    rel='noopener noreferrer'>
                    @dnm17_
                </a>
            </p>
        </>
    )
}

export default Home
