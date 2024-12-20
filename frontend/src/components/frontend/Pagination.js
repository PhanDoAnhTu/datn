/* eslint-disable no-unused-vars */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
export default function Pagination({
    data,
    currentPage,
    setCurrentPage,
    currentViewData,
    totalData,
}) {
    return (
        <div className="flex items-center justify-between border-t border-gray-300  px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    to="#"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className={`relative ${currentPage === 1 ? 'pointer-events-none' : ''} inline-flex items-center border-2 border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-magenta-500 hover:text-magenta-500 dark:text-white`}
                >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                    to="#"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className={`relative ml-3 inline-flex ${currentPage >= data?.length ? 'pointer-events-none' : ''} items-center border-2 border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-magenta-500 hover:text-magenta-500 dark:text-white`}
                >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </Link>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700 dark:text-stone-200">
                        Đang xem{' '}
                        <span className="font-medium">{currentViewData}</span>{' '}
                        trong <span className="font-medium">{totalData}</span>{' '}
                        sản phẩm
                    </p>
                </div>
                <div>
                    <nav
                        className="isolate inline-flex space-x-2 rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <Link
                            to="#"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className={`rounded-md shadow-md ${currentPage === 1 ? 'pointer-events-none relative inline-flex items-center bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 brightness-75 transition duration-200  ease-out hover:bg-gray-50 focus:outline-offset-0 dark:bg-magenta-500/50 dark:text-white dark:ring-magenta-700 dark:hover:bg-magenta-700' : 'relative inline-flex items-center bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 transition duration-200 ease-out hover:bg-gray-50  focus:outline-offset-0 dark:bg-magenta-500/50 dark:text-white dark:ring-magenta-700 dark:hover:bg-magenta-700'}`}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </Link>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        {data &&
                            data?.map((item, index) => (
                                <Link
                                    key={index}
                                    to="#"
                                    onClick={() => setCurrentPage(item)}
                                    className={`rounded-md shadow-md ${currentPage === item ? 'pointer-events-none relative z-10 inline-flex items-center bg-white px-4 py-2 text-sm font-semibold text-gray-900 brightness-75  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-xanthous-600' : 'relative inline-flex items-center bg-white px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:brightness-90  focus:outline-offset-0 dark:bg-magenta-500/50 dark:text-white dark:ring-magenta-700 dark:hover:bg-magenta-700'}`}
                                >
                                    {item}
                                </Link>
                            ))}

                        <Link
                            to="#"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className={`rounded-md shadow-md ${currentPage >= data?.length ? 'pointer-events-none relative inline-flex items-center bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 brightness-75 transition duration-200  ease-out hover:bg-gray-50 focus:outline-offset-0 dark:bg-magenta-500/50 dark:text-white dark:ring-magenta-700 dark:hover:bg-magenta-700' : 'relative inline-flex items-center bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 transition duration-200 ease-out hover:bg-gray-50  focus:outline-offset-0 dark:bg-magenta-500/50 dark:text-white dark:ring-magenta-700 dark:hover:bg-magenta-700'}`}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
