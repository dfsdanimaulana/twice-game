    const reservedNames = [
        'nayeon',
        'jeongyeon',
        'momo',
        'sana',
        'jihyo',
        'mina',
        'dahyun',
        'chaeyoung',
        'tzuyu',
        'twice',
        'jyp'
    ]

    export const validateUsername = (value) => {
        const regex = /^[a-zA-Z0-9 ]+$/ // Alphanumeric characters only and space
        const isValidLength = value.length >= 4 && value.length <= 20
        const isReservedName = reservedNames.includes(value.toLowerCase())

        if (!regex.test(value)) {
            return 'Username must contain only alphanumeric characters'
        } else if (!isValidLength) {
            return 'Username must be between 4 and 20 characters long'
        } else if (isReservedName) {
            return 'Username is reserved'
        }

        return true
    }

    