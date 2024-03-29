import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import useDarkMode from './hooks/useDarkMode'
import ErrorPage from './pages/ErrorPage'
import ProtectedRoute from './pages/ProtectedRoute'
import ForgetPassword from './pages/auth/ForgetPassword'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Chat from './pages/chat/Chat'
import Collection from './pages/collection/Collection'
import Game from './pages/game/Game'
import Home from './pages/home/Home'
import Level from './pages/level/Level'
import Profile from './pages/profile/Profile'
import ScoreBoard from './pages/scoreboard/ScoreBoard'
import Setting from './pages/setting/Setting'

function App() {
    const { isDarkMode } = useDarkMode()

    const [isOnline, setIsOnline] = useState(navigator.onLine)

    const handleOnlineStatus = () => {
        setIsOnline(true)
    }

    const handleOfflineStatus = () => {
        setIsOnline(false)
    }

    useEffect(() => {
        window.addEventListener('online', handleOnlineStatus)
        window.addEventListener('offline', handleOfflineStatus)

        return () => {
            window.removeEventListener('online', handleOnlineStatus)
            window.removeEventListener('offline', handleOfflineStatus)
        }
    }, [])

    return (
        <>
            {isOnline ? (
                <>
                    <BrowserRouter>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/level" element={<Level />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/forget-password"
                                element={<ForgetPassword />}
                            />

                            {/* Protected Routes */}
                            <Route element={<ProtectedRoute />}>
                                <Route path="/game/:level" element={<Game />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route
                                    path="/collection"
                                    element={<Collection />}
                                />
                                <Route
                                    path="/scoreboard"
                                    element={<ScoreBoard />}
                                />
                                <Route path="/setting" element={<Setting />} />
                                <Route path="/chat" element={<Chat />} />
                                <Route path="*" element={<ErrorPage />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                    <ToastContainer
                        position="top-center"
                        autoClose={1500}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme={isDarkMode ? 'dark' : 'light'}
                    />
                </>
            ) : (
                <div className="full-centered">
                    <h1 className="text-2xl font-semibold text-tw-5">
                        Please Connect to Internet.
                    </h1>
                </div>
            )}
        </>
    )
}

export default App
