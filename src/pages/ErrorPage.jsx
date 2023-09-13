import { Link } from 'react-router-dom'

export default function ErrorPage() {
    return (
        <>
            <div className="flex h-screen w-full items-center justify-center">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold text-blue-600 lg:text-6xl">
                        404
                    </h1>

                    <h6 className="text-gray-800 mb-2 text-center text-2xl font-bold md:text-3xl">
                        <span className="text-red-500">Oops!</span> Page Not
                        Found
                    </h6>

                    <p className="text-gray-500 mb-4 text-center md:text-lg">
                        The page you’re looking for doesn’t exist.
                    </p>

                    <Link
                        to="/"
                        className="rounded-md bg-blue-600 px-5 py-2 text-blue-100 hover:bg-blue-700"
                    >
                        Go home
                    </Link>
                </div>
            </div>
        </>
    )
}
