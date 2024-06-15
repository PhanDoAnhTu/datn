import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getListPosts } from '../../../store/actions/post-actions';
import moment from 'moment';
import 'moment/locale/vi';

export default function Blog() {
    const dispatch = useDispatch();
    const { all_posts } = useSelector((state) => state.postReducer);
    useEffect(() => {
        if (!all_posts) dispatch(getListPosts({ isPublished: true }));
        console.log(all_posts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [all_posts]);
    return (
        <div className="border-none px-4 py-16 sm:px-6 sm:py-10 lg:px-8">
            <div className="mx-auto max-w-screen-2xl ">
                <div className="flex items-center">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Khám phá thêm tin tức sau đây
                        </h2>
                    </div>

                    <Link
                        to="/bai-viet"
                        className="flex items-center space-x-2 text-xl font-bold text-gray-900 transition duration-200 ease-out hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
                    >
                        <p>Xem thêm</p>
                        <ArrowRightIcon className="h-5 w-5" />
                    </Link>
                </div>
                <div className="flex  flex-nowrap overflow-hidden py-5 max-sm:flex-col max-sm:space-y-3 sm:mt-8 sm:space-x-2 sm:pt-4 md:space-x-3 lg:mx-0 lg:max-w-none lg:flex-row dark:border-gray-500">
                    {all_posts?.map((item, index) => {
                        if (index !== 3) {
                            return (
                                <Link
                                    to={`/new/d/${item.post_slug}`}
                                    key={item._id}
                                    className={`all-ease group relative flex h-56 w-full snap-start flex-col justify-between overflow-hidden rounded-md p-3 shadow-md transition duration-200`}
                                >
                                    <img
                                        src={item.post_image}
                                        className="absolute left-0 top-0 max-h-screen max-w-full object-cover object-center brightness-75 transition duration-500 ease-out group-hover:brightness-50"
                                    />
                                    <div className="z-10 flex items-center gap-x-4 text-xs">
                                        <time className="text-gray-500 dark:text-stone-300">
                                            {moment()
                                                .locale('vi')
                                                .format('DD MMMM YYYY')}
                                        </time>
                                    </div>
                                    <div className="group relative transition duration-500 ease-out">
                                        <p className="mt-5 line-clamp-3 text-justify text-sm leading-6 text-gray-600 opacity-0 group-hover:opacity-100 dark:text-gray-100">
                                            {item.post_short_description}
                                        </p>
                                        <h3 className="mt-3 text-xl font-semibold leading-6 text-white transition duration-200 ease-out">
                                            <div>
                                                <span className="absolute inset-0" />
                                                {item.post_title}
                                            </div>
                                        </h3>
                                    </div>
                                </Link>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
}
