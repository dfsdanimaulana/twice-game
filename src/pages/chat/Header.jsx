function Header({ user }) {
    return (
        <header className='pt-6 pb-4 px-5 border-b border-dark'>
            <div className='flex justify-between items-center'>
                {/* Image + name */}
                <div className='flex items-center'>
                    <a className='inline-flex items-start mr-3' href='#0'>
                        <img
                            className='rounded-full w-14 h-14 object-cover object-top'
                            src={user?.photoURL}
                            alt='photoURL'
                        />
                    </a>
                    <div className='pr-1'>
                        <a
                            className='inline-flex text-gray-800 hover:text-gray-900'
                            href='#0'>
                            <h2 className='text-xl leading-snug font-bold'>
                                {user?.displayName}
                            </h2>
                        </a>
                        <a
                            className='hidden text-sm font-medium hover:text-indigo-500'
                            href='#0'>
                            @lauren.mars
                        </a>
                    </div>
                </div>
                {/* Settings button */}
                <div className='relative inline-flex flex-shrink-0'>
                    <button className='text-gray-400 hover:text-gray-500 rounded-full focus:ring-0 outline-none focus:outline-none'>
                        <span className='sr-only'>Settings</span>
                        <svg
                            className='w-4 h-4 fill-current'
                            viewBox='0 0 16 16'>
                            <path d='m15.621 7.015-1.8-.451A5.992 5.992 0 0 0 13.13 4.9l.956-1.593a.5.5 0 0 0-.075-.611l-.711-.707a.5.5 0 0 0-.611-.075L11.1 2.87a5.99 5.99 0 0 0-1.664-.69L8.985.379A.5.5 0 0 0 8.5 0h-1a.5.5 0 0 0-.485.379l-.451 1.8A5.992 5.992 0 0 0 4.9 2.87l-1.593-.956a.5.5 0 0 0-.611.075l-.707.711a.5.5 0 0 0-.075.611L2.87 4.9a5.99 5.99 0 0 0-.69 1.664l-1.8.451A.5.5 0 0 0 0 7.5v1a.5.5 0 0 0 .379.485l1.8.451c.145.586.378 1.147.691 1.664l-.956 1.593a.5.5 0 0 0 .075.611l.707.707a.5.5 0 0 0 .611.075L4.9 13.13a5.99 5.99 0 0 0 1.664.69l.451 1.8A.5.5 0 0 0 7.5 16h1a.5.5 0 0 0 .485-.379l.451-1.8a5.99 5.99 0 0 0 1.664-.69l1.593.956a.5.5 0 0 0 .611-.075l.707-.707a.5.5 0 0 0 .075-.611L13.13 11.1a5.99 5.99 0 0 0 .69-1.664l1.8-.451A.5.5 0 0 0 16 8.5v-1a.5.5 0 0 0-.379-.485ZM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z' />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
