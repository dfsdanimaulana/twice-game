import Swal from 'sweetalert2'
import ImageWithFallback from './ImageWithFallBack'

const ScoreboardList = ({ documents }) => {
    const showImage = (src) => {
        Swal.fire({
            imageUrl: src,
            imageWidth: 336,
            imageHeight: 336,
            showConfirmButton: false,
            imageAlt: 'User image',
            showCloseButton: true
        })
    }

    return (
        <ul className='w-10/12 lg:w-1/3 text-sm font-medium text-gray-900 bg-tw-3 border border-tw-5 rounded-lg dark:bg-navy dark:border-dark-blue dark:text-white'>
            <li className='w-full font-bold  px-4 py-2 border-b border-tw-5 rounded-t-lg dark:border-dark-blue flex justify-between'>
                <span className='basis-1/2 text-center'>User</span>
                <span>|</span>
                <span className='basis-1/2 text-center'>Score</span>
            </li>
            {documents.map((doc, index) => (
                <li
                    key={doc?.id}
                    className={`w-full flex items-center px-4 py-2 border-b border-tw-5 ${
                        index === 0 && 'rounded-t-lg'
                    } ${
                        index === documents.length - 1 && 'rounded-b-lg'
                    } dark:border-dark-blue flex justify-between`}>
                    <div className='text-1xl basis-1/2 flex justify-between items-center'>
                        <div
                            className='flex items-center cursor-pointer'
                            onClick={() => showImage(doc?.photoURL)}>
                            <ImageWithFallback
                                imageUrl={doc?.photoURL}
                                imageClasses='w-10 h-10 object-cover object-top rounded-full border border-tw-5 mr-4'
                            />
                            {doc?.displayName}
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
