import PropTypes from 'prop-types'
function Background({ user }) {
    return (
        <>
            {user ? (
                <>
                    <div className='absolute -z-20 min-h-screen w-full bg-[url("/img/bg/bg-sm-2.jpg")] bg-cover bg-center dark:bg-[url("/img/bg/bg-sm-dark.jpg")] md:bg-[url("/img/bg/all.jpeg")] dark:md:bg-[url(/img/bg/bg-1.jpg)]'></div>
                    <div className="absolute -z-10 min-h-screen w-full bg-[rgba(0,0,0,0.2)] bg-cover bg-center"></div>
                </>
            ) : (
                <>
                    <video
                        className="absolute -z-20 hidden h-auto w-full object-cover md:block"
                        autoPlay
                        loop
                        muted
                    >
                        <source
                            src="/video/videoplayback.mp4"
                            type="video/mp4"
                        />
                    </video>
                    <video
                        className="absolute -z-20 block h-auto w-full object-cover md:hidden"
                        autoPlay
                        loop
                        muted
                    >
                        <source
                            src="/video/videoplayback-sm.mp4"
                            type="video/mp4"
                        />
                    </video>
                    <div className="absolute -z-10 min-h-screen w-full bg-[rgba(0,0,0,0.4)]"></div>
                </>
            )}
        </>
    )
}

Background.propTypes = {
    user: PropTypes.object,
}

export default Background
