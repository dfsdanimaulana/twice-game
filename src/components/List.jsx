const List = ({ documents }) => {
    return (
        <ul class='w-10/12 lg:w-1/3 text-sm font-medium text-gray-900 bg-tw-3 border border-tw-5 rounded-lg dark:bg-navy dark:border-dark-blue dark:text-white'>
            <li class='w-full font-bold  px-4 py-2 border-b border-tw-5 rounded-t-lg dark:border-dark-blue flex justify-between'>
                <div className='text-1xl basis-1/2 flex justify-between'>
                    Name
                    <span>|</span>
                </div>
                <span className='basis-1/2 text-center'>exp</span>
            </li>
            {documents.map((doc, index) => (
                <li
                    key={doc.id}
                    class={`w-full px-4 py-2 border-b border-tw-5 ${
                        index === 0 && 'rounded-t-lg'
                    } ${
                        index === documents.length - 1 && 'rounded-b-lg'
                    } dark:border-dark-blue flex justify-between`}>
                    <div className='text-1xl basis-1/2 flex justify-between'>
                        {doc.displayName}
                        <span>:</span>
                    </div>
                    <span className='basis-1/2 text-center'>{doc.exp}</span>
                </li>
            ))}
        </ul>
    )
}

export default List
