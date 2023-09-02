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
            showCloseButton: true
        })
    }

    return (
        <ul className='max-h-[580px] overflow-auto w-11/12 lg:w-1/2 text-light text-sm font-medium bg-gradient-to-br from-tw-3 to-tw-4 border border-tw-5 rounded-md dark:bg-gradient-to-br dark:from-dark-blue dark:to-navy dark:border-dark-blue'>
            <li className='flex text-center sticky top-0 font-bold py-2 border-b border-tw-5 rounded-t-md dark:border-dark-blue shadow-md uppercase bg-tw-4 dark:bg-navy'>
                <span className='basis-1/12'>No</span>
                <span className='basis-7/12 border-x border-tw-5 dark:border-dark-blue'>User</span>
                <span className='basis-4/12'>Score</span>
            </li>
            {documents.map((doc, index) => (
                <li
                    key={doc?.id}
                    className={`flex text-center font-semibold py-1 items-center border-b border-tw-5 dark:border-dark-blue ${
                        index === documents.length - 1 && 'rounded-b-md'
                    }`}>
                    <span className='basis-1/12'>{index+1}</span>
                    <div 
                      className='basis-7/12 flex items-center overflow-hidden border-x border-tw-5 dark:border-dark-blue'
                      onClick={() => showImage(doc?.photoURL, doc?.displayName)}
                    >
                      <ImageWithFallBack
                          imageUrl={doc?.photoURL}
                          imageClasses='w-10 h-10 object-cover object-top rounded-full border border-tw-5 mx-2'
                      />
                      <span className='truncate'>
                        {doc?.displayName}
                      </span>
                    </div>
                    <span className='basis-4/12'>
                        {doc?.exp}
                    </span>
                </li>
            ))}
        </ul>
    )
}

export default ScoreboardList
