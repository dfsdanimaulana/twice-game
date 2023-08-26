import { useState, forwardRef } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const PasswordInput = forwardRef((props, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className='relative' ref={ref}>
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder='password'
                className='w-full border border-tw-1 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-tw-5 focus:border-tw-5 bg-light text-dark'
                {...props}
            />
            <button
                className='absolute top-3 right-2 focus:outline-none text-xl'
                type='button'
                onClick={handleTogglePassword}>
                {!showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
        </div>
    )
})

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
