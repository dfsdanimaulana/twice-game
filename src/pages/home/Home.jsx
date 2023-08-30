import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Joyride from 'react-joyride'
import useFirebaseAuth from '@hooks/useFirebaseAuth'
import { steps } from './steps'

// components
import ImageWithFallback from '@components/ImageWithFallBack'
import ToggleDarkMode from '@components/ToggleDarkMode'
import Loading from '@components/Loading'
import Background from './Background'
import AuthButton from './AuthButton'
import Copyright from './Copyright'
import MenuList from './MenuList'

const Home = () => {
    const { user, loading } = useFirebaseAuth()

    const [isGuideVisible, setIsGuideVisible] = useState(false)

    useEffect(() => {
        const hasSeenGuide = localStorage.getItem('hasSeenGuide')
        if (!hasSeenGuide) {
            setIsGuideVisible(true)
        }
    }, [])

    const closeGuide = (e) => {
        if (e.action === 'reset') {
            setIsGuideVisible(false)
            localStorage.setItem('hasSeenGuide', 'true')
        }
    }

    return (
        <>
            {!loading ? (
                <div className='home relative overflow-hidden'>
                    <Background user={user} />
                    <div className='flex flex-col items-center'>
                        {user && (
                            <div className='absolute top-5 left-5 flex items-center border rounded-md px-2 py-1 border-light'>
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
                           <AuthButton />
                        )}
                        {user && (
                            <>
                                <Link
                                    to='/level'
                                    className='guide-start border border-light font-bold font-bn tracking-widest text-white text-3xl bg-gradient-to-r from-tw-4 via-tw-3 to-tw-2 hover:bg-gradient-to-r hover:from-tw-5 hover:via-tw-4 hover:to-tw-3 dark:bg-gradient-to-tr dark:from-dark-blue dark:to-navy py-2 px-10 my-10 uppercase rounded-xl hover:shadow-md transition duration-150 ease-in-out hover:scale-[1.2]'>
                                    Start
                                </Link>
                                <MenuList />
                            </>
                        )}
                    </div>
                    <Copyright />
                </div>
            ) : (
                <Loading />
            )}
            {user && (
                <div className='absolute top-3 right-3'>
                    <ToggleDarkMode />
                </div>
            )}
            {user && (
                <Joyride
                    steps={steps}
                    showSkipButton
                    showProgress
                    run={isGuideVisible}
                    continuous
                    disableScrolling
                    callback={closeGuide}
                />
            )}
        </>
    )
}

export default Home
