import PropTypes from 'prop-types'
import Swal from 'sweetalert2'

import ImageWithFallBack from '@components/ImageWithFallBack'

const ScoreboardList = ({ documents }) => {
    const showImage = (src, name) => {
        Swal.fire({
            imageUrl: src,
            imageWidth: 336,
            imageHeight: 336,
            showConfirmButton: false,
            imageAlt: 'User image',
            text: name,
            showCloseButton: true,
        })
    }

    return (
        <ul className="max-h-[580px] w-11/12 overflow-auto rounded-md border border-tw-5 bg-gradient-to-br from-tw-3 to-tw-4 text-sm font-medium text-light dark:border-dark-blue dark:bg-gradient-to-br dark:from-dark-blue dark:to-navy lg:w-1/2">
            <li className="sticky top-0 flex rounded-t-md border-b border-tw-5 bg-tw-4 py-2 text-center font-bold uppercase shadow-md dark:border-dark-blue dark:bg-navy">
                <span className="basis-1/12">No</span>
                <span className="basis-7/12 border-x border-tw-5 dark:border-dark-blue">
                    User
                </span>
                <span className="basis-4/12">Score</span>
            </li>
            {documents.map((doc, index) => (
                <li
                    key={doc?.id}
                    className={`flex items-center border-b border-tw-5 py-1 text-center font-semibold dark:border-dark-blue ${
                        index === documents.length - 1 && 'rounded-b-md'
                    }`}
                >
                    <span className="basis-1/12">{index + 1}</span>
                    <div
                        className="flex basis-7/12 items-center overflow-hidden border-x border-tw-5 dark:border-dark-blue"
                        onClick={() =>
                            showImage(doc?.photoURL, doc?.displayName)
                        }
                    >
                        <ImageWithFallBack
                            imageUrl={doc?.photoURL}
                            imageClasses="mx-2 h-10 w-10 rounded-full border border-tw-5 object-cover object-top"
                        />
                        <span className="truncate">{doc?.displayName}</span>
                    </div>
                    <span className="basis-4/12">{doc?.exp}</span>
                </li>
            ))}
        </ul>
    )
}

ScoreboardList.propTypes = {
    documents: PropTypes.array,
}

export default ScoreboardList
