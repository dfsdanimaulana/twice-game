import { useEffect, useState } from 'react'
import Joyride from 'react-joyride'
import { Link } from 'react-router-dom'

import ImageWithFallback from '@components/ImageWithFallBack'
import Loading from '@components/Loading'
import ToggleDarkMode from '@components/ToggleDarkMode'
import useFirebaseAuth from '@hooks/useFirebaseAuth'

import AuthButton from './AuthButton'
import Background from './Background'
import Copyright from './Copyright'
import MenuList from './MenuList'
import { steps } from './steps'

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
                <div className="home relative overflow-hidden">
                    <Background user={user} />
                    <div className="flex flex-col items-center">
                        {user && (
                            <div className="absolute left-5 top-5 flex items-center rounded-md border border-light px-2 py-1">
                                <ImageWithFallback
                                    imageUrl={user.photoURL}
                                    imageClasses="mr-2 h-8 w-8 rounded-full object-cover object-top"
                                    alt="photoURL"
                                />
                                <span className="text-1xl font-bold text-light">
                                    {user.displayName}
                                </span>
                            </div>
                        )}
                        <h1 className="mb-5 text-center font-bn text-5xl uppercase text-light drop-shadow-lg md:text-7xl">
                            TWICE MEMORY CARD GAME
                        </h1>

                        {!user && <AuthButton />}
                        {user && (
                            <>
                                <Link
                                    to={isGuideVisible ? '/' : '/level'}
                                    className="guide-start my-10 rounded-xl border border-light bg-gradient-to-r from-tw-4 via-tw-3 to-tw-2 px-10 py-2 font-bn text-3xl font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:scale-[1.2] hover:bg-gradient-to-r hover:from-tw-5 hover:via-tw-4 hover:to-tw-3 hover:shadow-md dark:bg-gradient-to-tr dark:from-dark-blue dark:to-navy"
                                >
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
                <div className="absolute right-3 top-3">
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
