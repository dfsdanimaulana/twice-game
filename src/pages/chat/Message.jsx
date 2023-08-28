import { formatDistanceToNow } from 'date-fns'
import Swal from 'sweetalert2'
import ImageWithFallback from '../../components/ImageWithFallBack'

function Message({ chat }) {
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
        <div className='w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50'>
            <div
                className='flex items-start cursor-pointer'
                onClick={() => showImage(chat?.photoURL)}>
                <ImageWithFallback
                    imageClasses='rounded-full items-start flex-shrink-0 mr-3 mt-1 w-8 h-8 object-cover object-top'
                    imageUrl={chat?.photoURL}
                />
                <div className='w-full'>
                    <h4 className='text-sm font-semibold text-gray-900'>
                        {chat?.displayName}
                    </h4>
                    <div className='text-[14px] flex flex-col'>
                        <span className='text-start'>{chat?.message} </span>
                        <span className='text-[12px] text-end'>
                            {chat?.createdAt !== null &&
                                formatDistanceToNow(chat?.createdAt?.toDate(), {
                                    addSuffix: true
                                })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message
