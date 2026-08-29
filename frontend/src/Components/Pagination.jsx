import { Link } from "react-router-dom";

function Pagination({
                        route = "",
                        currentPageNum,
                        totalPages,
                        location = "",
                        limit = 8
                    }) {
    const middlePage = Math.ceil(totalPages / 2);
    const createUrl = (page) => {
        const params = new URLSearchParams();

        if (location) {
            params.set("Location", location);
        }

        params.set("page", page);
        params.set("limit", limit);

        return `${route}?${params.toString()}`;
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-6 mb-8">

            {/* Previous */}
            <Link
                to={createUrl(
                    currentPageNum > 1
                        ? currentPageNum - 1
                        : 1
                )}
                className={`px-3 py-2 rounded
                    ${
                    currentPageNum === 1
                        ? "pointer-events-none opacity-50"
                        : "hover:bg-gray-400"
                }`}
            >
                &lt;&lt;&lt;
            </Link>


            {/* Pages */}
            {totalPages <= 3 ? (

                Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                ).map((page) => (

                    <Link
                        key={page}
                        to={createUrl(page)}
                        className={`px-3 py-2 rounded
                            ${
                            page === currentPageNum
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-400"
                        }`}
                    >
                        {page}
                    </Link>

                ))

            ) : (

                <>
                    {/* First page */}
                    <Link
                        to={createUrl(1)}
                        className={`px-3 py-2 rounded
                            ${
                            currentPageNum === 1
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-400"
                        }`}
                    >
                        1
                    </Link>


                    {/* Dots before current page */}
                    {currentPageNum > middlePage &&
                        currentPageNum > 2 && (
                            <span className="px-2">
                                ...
                            </span>
                        )}

                    {/* Current / middle page */}
                    {currentPageNum > 1 &&
                        currentPageNum < totalPages && (

                            <Link
                                to={createUrl(currentPageNum)}
                                className="px-3 py-2 rounded bg-blue-600 text-white"
                            >
                                {currentPageNum}
                            </Link>

                        )}


                    {/* Page 2 when current page is 1 */}
                    {currentPageNum === 1 && (
                        <Link
                            to={createUrl(2)}
                            className="px-3 py-2 rounded hover:bg-gray-400"
                        >
                            2
                        </Link>
                    )}


                    {/* Dots after current page */}
                    {currentPageNum <= middlePage && currentPageNum < totalPages - 1 && (
                            <span className="px-2">
                                ...
                            </span>
                        )}


                    {/* Last page */}
                    <Link
                        to={createUrl(totalPages)}
                        className={`px-3 py-2 rounded
                            ${
                            currentPageNum === totalPages
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-400"
                        }`}
                    >
                        {totalPages}
                    </Link>

                </>
            )}


            {/* Next */}
            <Link
                to={createUrl(
                    currentPageNum < totalPages
                        ? currentPageNum + 1
                        : totalPages
                )}
                className={`px-3 py-2 rounded
                    ${
                    currentPageNum === totalPages
                        ? "pointer-events-none opacity-50"
                        : "hover:bg-gray-400"
                }`}
            >
                &gt;&gt;&gt;
            </Link>

        </div>
    );
}

export default Pagination;