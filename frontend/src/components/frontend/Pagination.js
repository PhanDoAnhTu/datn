import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

export default function Pagination() {
    return (
        <div className="flex items-center justify-between border-t border-gray-200  px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    to="#"
                    className="relative inline-flex items-center border-2 border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-magenta-500 hover:text-magenta-500 dark:text-white"
                >
                    Previous
                </Link>
                <Link
                    to="#"
                    className="relative ml-3 inline-flex items-center border-2 border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-magenta-500 hover:text-magenta-500 dark:text-white"
                >
                    Next
                </Link>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700 dark:text-stone-200">
                        Showing <span className="font-medium">1</span> to{' '}
                        <span className="font-medium">10</span> of{' '}
                        <span className="font-medium">97</span> results
                    </p>
                </div>
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <Link
                            to="#"
                            className="relative inline-flex items-center bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 transition duration-200 ease-out hover:bg-gray-50  focus:outline-offset-0 dark:bg-magenta-500/50 dark:text-white dark:ring-magenta-700 dark:hover:bg-magenta-700"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </Link>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        <Link
                            to="#"
                            aria-current="page"
                            className="relative z-10 inline-flex items-center bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-xanthous-600"
                        >
                            1
                        </Link>
                        <Link
                            to="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:outline-offset-0 dark:bg-magenta-500/50 dark:text-white dark:ring-magenta-700 dark:hover:bg-magenta-700"
                        >
                            2
                        </Link>
                        <Link
                            to="#"
                            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:outline-offset-0 md:inline-flex dark:bg-magenta-500/50 dark:text-white dark:ring-magenta-700 dark:hover:bg-magenta-700"
                        >
                            3
                        </Link>
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 dark:bg-magenta-500/50 dark:text-white dark:ring-magenta-700 dark:hover:bg-magenta-700">
                            ...
                        </span>
                        <Link
                            to="#"
                            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:outline-offset-0 md:inline-flex dark:bg-magenta-500/50 dark:text-white dark:ring-magenta-700 dark:hover:bg-magenta-700"
                        >
                            8
                        </Link>
                        <Link
                            to="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:outline-offset-0 dark:bg-magenta-500/50 dark:text-white dark:ring-magenta-700 dark:hover:bg-magenta-700"
                        >
                            9
                        </Link>
                        <Link
                            to="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:outline-offset-0 dark:bg-magenta-500/50 dark:text-white dark:ring-magenta-700 dark:hover:bg-magenta-700"
                        >
                            10
                        </Link>
                        <Link
                            to="#"
                            className="relative inline-flex items-center  px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:outline-offset-0 dark:bg-magenta-500/50 dark:text-white dark:ring-magenta-700 dark:hover:bg-magenta-700"
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
