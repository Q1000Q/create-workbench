import { Link } from "react-router"

export default () => {
    return (
        <>
            <Link to="/">
                <div className="absolute top-4 left-4 border border-gray-200 dark:border-gray-700 py-4 px-8 rounded-xl hover:bg-gray-700 hover:dark:bg-gray-200 hover:text-gray-200 hover:dark:text-gray-700 transition-all">
                    ← Back
                </div>
            </Link>
        </>
    )
}