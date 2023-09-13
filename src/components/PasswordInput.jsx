import { useState, forwardRef } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const PasswordInput = forwardRef((props, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="relative" ref={ref}>
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder="password"
                className="w-full rounded-md border border-tw-1 bg-light px-4 py-2 pr-10 text-dark focus:border-tw-5 focus:outline-none focus:ring-tw-5"
                {...props}
            />
            <button
                className="absolute right-2 top-3 text-xl focus:outline-none"
                type="button"
                onClick={handleTogglePassword}
            >
                {!showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
        </div>
    )
})

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
