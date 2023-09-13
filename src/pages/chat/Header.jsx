import PropTypes from 'prop-types'
import { BsQuestionCircle } from 'react-icons/bs'
import { Tooltip } from 'react-tooltip'

function Header({ user }) {
    return (
        <header className="pt-3 pb-2 px-5 border-b border-tw-5 dark:border-light ">
            <div className="flex justify-between items-center">
                {/* Image + name */}
                <div className="flex items-center">
                    <a className="inline-flex items-start mr-3" href="#0">
                        <img
                            className="rounded-full w-11 h-11 object-cover object-top"
                            src={user?.photoURL}
                            alt="photoURL"
                        />
                    </a>
                    <div className="pr-1">
                        <a
                            className="inline-flex text-gray-800 hover:text-gray-900"
                            href="#0"
                        >
                            <h2 className="text-xl leading-snug font-bold">
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
                    <button className="text-2xl text-dark dark:text-light rounded-full focus:ring-0 outline-none focus:outline-none">
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
    user: PropTypes.object
}

export default Header
