function Background({ user }) {
    return (
        <>
            {user ? (
                <>
                    <div className='absolute w-full min-h-screen bg-[url("/img/bg/bg-sm-2.jpg")] dark:bg-[url("/img/bg/bg-sm-dark.jpg")] md:bg-[url("/img/bg/all.jpeg")] dark:md:bg-[url(/img/bg/bg-1.jpg)] bg-cover bg-center -z-20'></div>
                    <div className='absolute w-full min-h-screen bg-[rgba(0,0,0,0.2)] bg-cover bg-center -z-10'></div>
                </>
            ) : (
                <>
                    <video
                        className='absolute w-full h-auto object-cover -z-20 hidden md:block'
                        autoPlay
                        loop
                        muted>
                        <source
                            src='/video/videoplayback.mp4'
                            type='video/mp4'
                        />
                    </video>
                    <video
                        className='absolute w-full h-auto object-cover -z-20 block md:hidden'
                        autoPlay
                        loop
                        muted>
                        <source
                            src='/video/videoplayback-sm.mp4'
                            type='video/mp4'
                        />
                    </video>
                    <div className='absolute w-full min-h-screen bg-[rgba(0,0,0,0.4)] -z-10'></div>
                </>
            )}
        </>
    )
}

export default Background
