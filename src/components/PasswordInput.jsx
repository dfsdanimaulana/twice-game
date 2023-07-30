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
                className='form-input'
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
