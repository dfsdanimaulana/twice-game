import Swal from 'sweetalert2'
import ImageWithFallback from '../../components/ImageWithFallBack'

const ScoreboardList = ({ documents }) => {
    const showImage = (src, name) => {
        Swal.fire({
            imageUrl: src,
            imageWidth: 336,
            imageHeight: 336,
            showConfirmButton: false,
            imageAlt: 'User image',
            text: name,
            showCloseButton: true
        })
    }

    return (
        <ul className='w-11/12 lg:w-1/3 text-sm font-medium text-gray-900 bg-gradient-to-br from-tw-3 to-tw-4 border border-tw-5 rounded-md dark:bg-gradient-to-br dark:from-dark-blue dark:to-navy dark:border-dark-blue dark:text-white'>
            <li className='w-full font-bold  px-4 py-2 border-b border-tw-5 rounded-t-md dark:border-dark-blue flex justify-between shadow-md uppercase bg-tw-4 dark:bg-navy'>
                <span className='basis-1/2 text-center'>User</span>
                <span>|</span>
                <span className='basis-1/2 text-center'>Score</span>
            </li>
            {documents.map((doc, index) => (
                <li
                    key={doc?.id}
                    className={`w-full flex items-center px-4 py-2 border-b border-tw-5 ${
                        index === documents.length - 1 && 'rounded-b-md'
                    } dark:border-dark-blue flex justify-between`}>
                    <div className='basis-1/2 flex justify-between items-center'>
                        <div
                            className='flex items-center cursor-pointer'
                            onClick={() => showImage(doc?.photoURL, doc?.displayName)}>
                            <ImageWithFallback
                                imageUrl={doc?.photoURL}
                                imageClasses='w-10 h-10 object-cover object-top rounded-full border border-tw-5 mr-4'
                            />
                            <span className='truncate'>
                              {doc?.displayName}
                            </span>
                        </div>
                        <span>:</span>
                    </div>
                    <span className='basis-1/2 text-center'>{doc?.exp}</span>
                </li>
            ))}
        </ul>
    )
}

export default ScoreboardList