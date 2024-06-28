import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePost } from '../../../store/actions/post-actions';
import moment from 'moment';

import 'moment/locale/vi';
import DocumentTitle from '../../../components/frontend/DocumentTitle';
import parse from 'html-react-parser';

export default function NewDetail() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { current_post } = useSelector((state) => state.postReducer);
    useEffect(() => {
        dispatch(getSinglePost({ post_slug: slug }));
        console.log(current_post);
    }, [slug]);
    return (
        <div className="mx-8 pb-7 pt-10 md:pt-24">
            <DocumentTitle title="Chi tiết bài viết" />

            <button
                onClick={() => navigate(-1)}
                className="group mb-4 flex items-center pl-0 text-white"
            >
                <ChevronLeftIcon className="h-7 w-7 transition duration-500 ease-out group-hover:text-magenta-500" />
                <span className="text-lg transition duration-500 ease-out group-hover:text-magenta-500">
                    Back
                </span>
            </button>
            <div className="bg-white dark:bg-zinc-900/70">
                <div className="relative h-96 w-full overflow-hidden max-sm:aspect-h-6 max-sm:aspect-w-16">
                    <img
                        src={current_post?.post.post_image}
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="flex flex-col space-y-2 p-2 md:p-5">
                    <div className="flex h-full w-full justify-start text-wrap text-lg font-extrabold tracking-wide text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                        {current_post?.post.post_name}
                    </div>
                    <div className="md:text-md flex h-full w-full justify-start text-wrap text-sm font-extrabold tracking-wide text-gray-900 dark:text-white">
                        Ngày đăng:{' '}
                        {moment(current_post?.post.createdAt)
                            .locale('vi')
                            .format('DD MMMM YYYY')}
                    </div>
                </div>

                <div className="p-2 text-justify leading-7 tracking-wide text-gray-900 md:p-5 dark:text-zinc-200">
                    {parse(`${current_post?.post.post_content}`)}
                </div>
            </div>
            <div className="pt-7">
                <span className="text-2xl font-bold uppercase text-gray-900 lg:text-3xl dark:text-white">
                    Tin tức cùng chủ đề
                </span>
                <div className="mt-3 grid gap-x-4 gap-y-4 text-white md:grid-cols-3">
                    {current_post?.related_posts
                        .sort(() => Math.random() - 0.5)
                        .map((item, index) => (
                            <Link
                                to={`/new/d/${item.post_slug}`}
                                key={index}
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
                        ))}
                </div>
            </div>
        </div>
    );
}
