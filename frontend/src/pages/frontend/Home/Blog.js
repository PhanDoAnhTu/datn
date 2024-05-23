import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { posts } from '../../../test/posts';

export default function Blog() {
    return (
        <div className="border-none px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-screen-2xl ">
                <div className="flex items-center">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Explore our news
                        </h2>
                        <h3 className="text-sm text-gray-400 lg:text-lg">
                            Here you can see the update on our products
                        </h3>
                    </div>

                    <Link
                        to="/news/1"
                        className="flex items-center space-x-2 text-xl font-bold text-gray-900 transition duration-200 ease-out hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
                    >
                        <p>See more</p>
                        <ArrowRightIcon className="h-5 w-5" />
                    </Link>
                </div>
                <div className="flex  flex-nowrap overflow-hidden  py-5 max-sm:flex-col max-sm:space-y-3 sm:mt-8 sm:space-x-2 sm:pt-4 md:space-x-3 lg:mx-0 lg:max-w-none lg:flex-row dark:border-gray-500">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="all-ease flex w-full snap-start flex-col justify-between rounded-md bg-white p-3 shadow-md transition duration-200 hover:-translate-y-1 dark:bg-stone-500"
                        >
                            <div className="flex items-center gap-x-4 text-xs">
                                <time
                                    dateTime={post.datetime}
                                    className="text-gray-500 dark:text-stone-300"
                                >
                                    {post.date}
                                </time>
                            </div>
                            <div className="group relative ">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 transition duration-200 ease-out group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
                                    <Link to={post.to}>
                                        <span className="absolute inset-0 " />
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-justify text-sm leading-6 text-gray-600 dark:text-gray-100">
                                    {post.description}
                                </p>
                            </div>
                            <div className="relative mt-8 flex items-center gap-x-4">
                                <img
                                    src={post.author.imageUrl}
                                    alt=""
                                    className="h-10 w-10 rounded-full bg-gray-50"
                                />
                                <div className="text-sm leading-6">
                                    <p className="font-semibold text-gray-900 dark:text-stone-100">
                                        <Link to={post.author.to}>
                                            <span className="absolute inset-0" />
                                            {post.author.name}
                                        </Link>
                                    </p>
                                    <p className="text-gray-600 dark:text-stone-300">
                                        {post.author.role}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
