import BackButton from '../../components/BackButton'
import useDocument from '../../hooks/useDocument'
import useFirebaseAuth from '../../hooks/useFirebaseAuth'
import Loading from '../../components/Loading'
import Swal from 'sweetalert2'

const Collection = () => {
    const { user } = useFirebaseAuth()
    const { document, loading, error } = useDocument('Users', user?.uid)

    const showImage = (src) => {
        Swal.fire({
            imageUrl: src,
            imageWidth: 300,
            imageHeight: 400,
            showConfirmButton: false,
            imageAlt: 'Custom image'
        })
    }

    return (
        <>
            <div className='full-centered'>
                {document && (
                    <div className='flex flex-wrap max-w-full justify-center gap-x-3 m-10'>
                        {document?.collections.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                className='flex flex-wrap justify-around gap-2 my-3 lg:my-2 p-3 rounded-lg bg-gradient-to-tr from-tw-2 to-tw-3 shadow-md dark:bg-gradient-to-tr dark:from-dark-blue dark:to-navy '>
                                {row.images.map((image, columnIndex) => (
                                    <div
                                        key={columnIndex}
                                        className='aspect-w-3 aspect-h-4 w-28 rounded-md overflow-hidden shadow-md hover:scale-[1.05]'>
                                        {image.locked ? (
                                            <img
                                                className='w-full h-full object-cover object-top'
                                                src='/img/collection/back.png'
                                                alt='collection image'
                                            />
                                        ) : (
                                            <img
                                                className='w-full h-full object-cover object-top cursor-pointer'
                                                src={image.src}
                                                alt='collection image'
                                                onClick={() =>
                                                    showImage(image.src)
                                                }
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
                {loading && <Loading />}
                {error && <div>{error}</div>}
            </div>
            <div className='fixed top-1 left-1'>
                <BackButton to='/' />
            </div>
        </>
    )
}

export default Collection
