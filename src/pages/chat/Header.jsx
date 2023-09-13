import PropTypes from 'prop-types'
import { BsQuestionCircle } from 'react-icons/bs'
import { Tooltip } from 'react-tooltip'

function Header({ user }) {
    return (
        <header className="border-b border-tw-5 px-5 pb-2 pt-3 dark:border-light ">
            <div className="flex items-center justify-between">
                {/* Image + name */}
                <div className="flex items-center">
                    <a className="mr-3 inline-flex items-start" href="#0">
                        <img
                            className="h-11 w-11 rounded-full object-cover object-top"
                            src={user?.photoURL}
                            alt="photoURL"
                        />
                    </a>
                    <div className="pr-1">
                        <a
                            className="text-gray-800 hover:text-gray-900 inline-flex"
                            href="#0"
                        >
                            <h2 className="text-xl font-bold leading-snug">
                                {user?.displayName}
                            </h2>
                        </a>
                        <a
                            className="hidden text-sm font-medium hover:text-indigo-500"
                            href="#0"
                        >
                            @lauren.mars
                        </a>
                    </div>
                </div>
                {/* Settings button */}
                <div className="relative inline-flex flex-shrink-0" id="q-chat">
                    <button className="rounded-full text-2xl text-dark outline-none focus:outline-none focus:ring-0 dark:text-light">
                        <span className="sr-only">Guide</span>
                        <BsQuestionCircle />
                    </button>
                    <Tooltip anchorSelect="#q-chat" place="bottom-end">
                        <ul className="list-disc pl-2">
                            <li> Click message for more options</li>
                            <li> Click photo profile for zoom</li>
                        </ul>
                    </Tooltip>
                </div>
            </div>
        </header>
    )
}

Header.propTypes = {
    user: PropTypes.object,
}

export default Header
