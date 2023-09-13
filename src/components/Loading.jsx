import { BiLoader } from 'react-icons/bi'

const Loading = () => {
    return (
        <div className="full-centered text-xl font-bold text-tw-5 dark:text-light">
            <div className="flex items-center gap-2">
                <BiLoader className="animate-spin" />
                <p className="loading-text">Loading</p>
            </div>
        </div>
    )
}

export default Loading
