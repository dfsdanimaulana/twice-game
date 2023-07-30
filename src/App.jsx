import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Level from './pages/level/Level'
import Game from './pages/game/Game'
import Profile from './pages/profile/Profile'
import Setting from './pages/setting/Setting'
import ErrorPage from './pages/ErrorPage'
import ProtectedRoute from './pages/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import Collection from './pages/collection/Collection'
import ForgetPassword from './pages/auth/ForgetPassword'
import ScoreBoard from './pages/scoreboard/ScoreBoard'

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode')
        setIsDarkMode(storedDarkMode === 'true')
        setIsInitialLoad(false)
    }, [])

    useEffect(() => {
        if (!isInitialLoad) {
            localStorage.setItem('darkMode', isDarkMode.toString())
            document.documentElement.classList.toggle('dark', isDarkMode)
        }
    }, [isDarkMode, isInitialLoad])

    const handleRightClick = (e) => {
        e.preventDefault()
        // Optionally, you can perform additional actions here.
        // For example, show a custom context menu or display a message.
    }

    useEffect(() => {
        // Attach the event listener when the component mounts.
        document.addEventListener('contextmenu', handleRightClick)

        // Clean up the event listener when the component unmounts.
        return () => {
            document.removeEventListener('contextmenu', handleRightClick)
        }
    }, [])

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/level' element={<Level />} />
                    <Route path='/login' element={<Login />} />
                    <Route
                        path='/forget-password'
                        element={<ForgetPassword />}
                    />
                    <Route path='/register' element={<Register />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path='/game/:level' element={<Game />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/collection' element={<Collection />} />
                        <Route path='/scoreboard' element={<ScoreBoard />} />
                        <Route path='/setting' element={<Setting />} />
                        <Route path='*' element={<ErrorPage />} />
                    </Route>
                    <Route path='/' element={<Home />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position='top-center'
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
        </>
    )
}

export default App
