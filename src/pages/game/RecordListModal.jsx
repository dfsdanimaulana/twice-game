import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import Swal from 'sweetalert2'
import { AiOutlineClose } from 'react-icons/ai'
import useCollection from '@hooks/useCollection'
import ImageWithFallBack from '@components/ImageWithFallBack'

const RecordListModal = ({ recordListOpen, setRecordListOpen, level}) => {
    const { documents, error, loading } = useCollection(
        'Users',
        ['exp', '>=', 1],
        ['exp', 'desc']
    )
    
    const handleCloseModal = () => {
        setRecordListOpen(false)
    }
    
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

    const filterDocuments = () => {
      return documents.filter((doc)=> doc.levels[level - 1]?.completed)
    }
    
    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={recordListOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={handleCloseModal}
            className='modal-content'
            overlayClassName='modal-overlay'>
            <div className='text-light min-w-[300px]'>
                <ul className='text-sm text-gray-900 max-h-64 overflow-auto bg-gradient-to-br from-tw-3 to-tw-4 border border-tw-5 rounded-md dark:bg-gradient-to-br dark:from-dark-blue dark:to-navy dark:border-dark-blue dark:text-white'>
                  <li className='font-semibold sticky top-0 border-b px-1 py-2 border-tw-5 rounded-t-md dark:border-dark-blue flex justify-between shadow-md bg-tw-4 dark:bg-navy'>
                      <span className='basis-1/3 text-center'>User</span>
                      <span>|</span>
                      <div className='basis-2/3 text-center flex justify-center'>
                        <span className='basis-1/2 text-center'>Best Time</span>
                        <span>|</span>
                        <span className='basis-1/2 text-center'>Best Turns</span>
                      </div>
                  </li>
                  {documents && filterDocuments().map((doc, index) => (
                      <li
                          key={doc?.id}
                          className={`flex items-center px-2 py-1 border-b border-tw-5 ${
                              index === documents.length - 1 && 'rounded-b-md'
                          } dark:border-dark-blue flex justify-between`}>
                          <div className='basis-1/3 flex overflow-hidden justify-between items-center border-r border-tw-5 dark:border-dark-blue'>
                              <div
                                  className='flex items-center cursor-pointer'
                                  onClick={() => showImage(doc?.photoURL, doc?.displayName)}>
                                  <ImageWithFallBack
                                      imageUrl={doc?.photoURL}
                                      imageClasses='w-5 h-5 object-cover object-top rounded-full border border-tw-5 mr-4'
                                  />
                                  <span className='truncate'>
                                    {doc?.displayName}
                                  </span>
                              </div>
                          </div>
                          <div className='basis-2/3 text-center flex justify-center'>
                            <span className='basis-1/2 text-center border-r border-tw-5 dark:border-dark-blue'>
                              {doc?.levels[level - 1]?.bestTime}s
                            </span>
                            <span className='basis-1/2 text-center'>
                              {doc?.levels[level - 1]?.bestTurns}
                            </span>
                          </div>                          
                          
                      </li>
                  ))}
                  {loading && <p>Loading...</p>}
              </ul>
            </div>
            <button
                className='absolute top-2 right-2 text-2xl text-dark dark:text-light'
                onClick={handleCloseModal}>
                <AiOutlineClose />
            </button>
        </ReactModal>
    )
}

RecordListModal.propTypes = {
    recordListOpen: PropTypes.bool,
    setRecordListOpen: PropTypes.func
}

export default RecordListModal
