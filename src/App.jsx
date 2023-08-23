import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import useDarkMode from './hooks/useDarkMode'
import Home from './pages/home/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Level from './pages/level/Level'
import Game from './pages/game/Game'
import Profile from './pages/profile/Profile'
import Setting from './pages/setting/Setting'
import ErrorPage from './pages/ErrorPage'
import ProtectedRoute from './pages/ProtectedRoute'
import Collection from './pages/collection/Collection'
import ForgetPassword from './pages/auth/ForgetPassword'
import ScoreBoard from './pages/scoreboard/ScoreBoard'

function App() {
    const _ = useDarkMode()

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path='/' element={<Home />} />
                    <Route path='/level' element={<Level />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route
                        path='/forget-password'
                        element={<ForgetPassword />}
                    />

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path='/game/:level' element={<Game />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/collection' element={<Collection />} />
                        <Route path='/scoreboard' element={<ScoreBoard />} />
                        <Route path='/setting' element={<Setting />} />
                        <Route path='*' element={<ErrorPage />} />
                    </Route>
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
