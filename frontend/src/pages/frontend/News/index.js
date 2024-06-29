/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, Transition } from '@headlessui/react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../../components/frontend/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getListTopic } from '../../../store/actions/topic-actions';
import { getListPosts } from '../../../store/actions/post-actions';
import moment from 'moment';
import 'moment/locale/vi';
import DocumentTitle from '../../../components/frontend/DocumentTitle';

export default function News() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('all');
    const dispatch = useDispatch();
    const { topic } = useSelector((state) => state.topicReducer);
    const { all_posts } = useSelector((state) => state.postReducer);
    const [posts, setPosts] = useState(null);
    const limit = 6;
    const [page, setPage] = useState(1);
    const [current_posts, setCurrentPosts] = useState(null);
    useEffect(() => {
        if (!topic) dispatch(getListTopic());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topic]);
    useEffect(() => {
        dispatch(getListPosts({ isPublished: true }));
    }, []);
    useEffect(() => {
        setPage(1);
        if (selectedTopic === 'all') {
            setPosts(all_posts?.slice());
        } else {
            const filteredPosts = all_posts
                ?.slice()
                .filter(
                    (item) =>
                        item.topic_id ===
                        topic
                            ?.slice()
                            .find((item) => item._id === selectedTopic)._id
                );
            setPosts(filteredPosts);
        }
    }, [all_posts, selectedTopic]);
    useEffect(() => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        setCurrentPosts(posts?.slice(startIndex, endIndex));
    }, [posts, page]);
    return (
        <div>
            <DocumentTitle title="Tin tức" />

            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-40 lg:hidden"
                        onClose={setMobileFiltersOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl dark:bg-neutral-900">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                                            Lọc
                                        </h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-transparent p-2 text-gray-400 dark:text-white"
                                            onClick={() =>
                                                setMobileFiltersOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close menu
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200 ">
                                        <h3 className="sr-only">Categories</h3>
                                        <ul className="px-2 py-3 font-medium text-gray-900">
                                            <li>
                                                <button
                                                    onClick={() => {
                                                        setSelectedTopic('all');

                                                        setMobileFiltersOpen(
                                                            false
                                                        );
                                                    }}
                                                    disabled={
                                                        selectedTopic === 'all'
                                                    }
                                                    className="block px-2 py-3 disabled:text-magenta-500 dark:text-white"
                                                >
                                                    Tất cả bài viết
                                                </button>
                                            </li>
                                            {topic?.map((item) => (
                                                <li key={item.topic_name}>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedTopic(
                                                                item._id
                                                            );

                                                            setMobileFiltersOpen(
                                                                false
                                                            );
                                                        }}
                                                        disabled={
                                                            selectedTopic ===
                                                            item._id
                                                        }
                                                        className="block px-2 py-3 disabled:text-magenta-500 dark:text-white"
                                                    >
                                                        {item.topic_name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-300 pb-6 pt-24">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            Tin tức
                        </h1>
                        <div className="flex items-center">
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 transition duration-200 ease-out hover:text-gray-500 sm:ml-6 lg:hidden dark:text-white dark:hover:text-stone-300"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>

                    <section
                        aria-labelledby="products-heading"
                        className="pb-24 pt-6"
                    >
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden h-fit rounded-md bg-white p-4 shadow-md lg:block dark:bg-zinc-800">
                                <h3 className="sr-only">Categories</h3>
                                <ul className="space-y-4 pb-6 text-sm font-medium text-gray-900 dark:text-white">
                                    <li>
                                        <button
                                            className="disabled:text-magenta-500"
                                            disabled={selectedTopic === 'all'}
                                            onClick={() => {
                                                setSelectedTopic('all');

                                                setMobileFiltersOpen(false);
                                            }}
                                        >
                                            Tất cả bài viết
                                        </button>
                                    </li>
                                    {topic?.map((item) => (
                                        <li key={item.topic_slug}>
                                            <button
                                                className="disabled:text-magenta-500"
                                                disabled={
                                                    selectedTopic === item._id
                                                }
                                                onClick={() => {
                                                    setSelectedTopic(item._id);

                                                    setMobileFiltersOpen(false);
                                                }}
                                            >
                                                {item.topic_name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </form>

                            {/* Product grid */}
                            <div className="col-span-3 grid grid-rows-1">
                                <div className="col-span-3 grid gap-x-4 gap-y-4 md:grid-cols-2">
                                    {all_posts && current_posts?.length > 0 ? (
                                        current_posts?.map((item, index) => (
                                            <Link
                                                to={`/bai-viet/${item.post_slug}`}
                                                key={index}
                                                className={`all-ease group relative flex h-56 w-full snap-start flex-col justify-between overflow-hidden rounded-md p-3 shadow-md transition duration-200`}
                                            >
                                                <img
                                                    src={item.post_image}
                                                    className="absolute left-0 top-0 h-full w-full object-cover object-center brightness-75 transition duration-500 ease-out group-hover:brightness-50"
                                                />
                                                <div className="z-10 flex items-center gap-x-4 text-xs">
                                                    <time className="text-stone-300">
                                                        {moment(item.createdAt)
                                                            .locale('vi')
                                                            .format(
                                                                'DD MMMM YYYY'
                                                            )}
                                                    </time>
                                                </div>
                                                <div className="group relative transition duration-500 ease-out">
                                                    <p className="mt-5 line-clamp-3 text-justify text-sm leading-6 text-gray-100 opacity-0 group-hover:opacity-100">
                                                        {
                                                            item.post_short_description
                                                        }
                                                    </p>
                                                    <h3 className="mt-3 text-xl font-semibold leading-6 text-white transition duration-200 ease-out">
                                                        <div>
                                                            <span className="absolute inset-0" />
                                                            {item.post_title}
                                                        </div>
                                                    </h3>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div>khong co j het</div>
                                    )}
                                </div>
                                {posts && posts?.length > 6 ? (
                                    <div className="col-span-3 pt-5">
                                        <Pagination
                                            className="col-span-3"
                                            currentPage={page}
                                            setCurrentPage={setPage}
                                            data={Array.from(
                                                {
                                                    length: Math.ceil(
                                                        posts?.length / limit
                                                    ),
                                                },
                                                (_, index) => index + 1
                                            )}
                                        />
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
