import { Popover, Transition } from '@headlessui/react';
import {
    ArrowLeftEndOnRectangleIcon,
    ArrowLeftStartOnRectangleIcon,
    UserCircleIcon,
    UserIcon,
    UserPlusIcon,
} from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onLogout } from '../../../store/actions';
import { toast } from 'react-toastify';

export default function UserPopover() {
    const { userInfo } = useSelector((state) => state.userReducer);
    // console.log('userInfo', userInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async (close) => {
        try {
            await dispatch(onLogout());
            toast.success('Đăng xuất thành công', {
                className: 'black-background',
                bodyClassName: 'grow-font-size',
                progressClassName: 'fancy-progress-bar',
                autoClose: 2000
            });

            close();
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="px-2">
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <Popover.Button
                            className={`${open ? ' dark:text-gray-500' : 'text-gray-500 dark:text-white'}
                group inline-flex items-center py-2 font-medium transition-colors duration-200 ease-out hover:text-gray-900 focus:outline-none dark:hover:text-gray-500`}
                        >
                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 scale-50"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-50"
                        >
                            <Popover.Panel className="left-1/5 absolute z-10 mt-3 w-52 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                <div className="overflow-hidden rounded-md shadow-lg ring-1 ring-black/5">
                                    <div className="relative flex flex-col bg-stone-100 p-2 dark:bg-neutral-900">
                                        {userInfo ? (
                                            <>
                                                <div className="flex flex-col items-center justify-items-center space-y-2 px-2 py-4 pb-10 text-white">
                                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-300 text-gray-500 dark:bg-magenta-400 dark:text-white">
                                                        <UserIcon className="h-10 w-10 drop-shadow-md" />
                                                    </div>

                                                    <p className="text-md text-center font-bold text-gray-500 dark:text-white">
                                                        {userInfo?.customer_name}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col space-y-2">
                                                    <button
                                                        onClick={() => {
                                                            close();
                                                            navigate(
                                                                '/trang-ca-nhan/profile'
                                                            );
                                                        }}
                                                        className="group flex h-12 w-full items-center justify-center overflow-hidden rounded-md"
                                                    >
                                                        <div className="flex h-full flex-1 items-center justify-center bg-stone-300 transition duration-200 ease-out group-hover:bg-stone-300/50 dark:bg-stone-800 dark:group-hover:bg-magenta-600/80">
                                                            <p className="text-xs font-semibold text-gray-900 group-hover:text-gray-900/50 sm:text-sm dark:text-white dark:group-hover:text-gray-900">
                                                                Hồ sơ
                                                            </p>
                                                        </div>

                                                        <div className="flex h-full basis-1/5 items-center justify-center overflow-hidden bg-stone-400 transition duration-200 ease-out group-hover:bg-stone-400/50 dark:bg-stone-900/70 dark:text-white dark:group-hover:bg-magenta-500/100 dark:group-hover:text-gray-900">
                                                            <UserCircleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                                                        </div>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            logoutHandler(close)
                                                        }
                                                        className="group flex h-12 w-full items-center  justify-center overflow-hidden rounded-md "
                                                    >
                                                        <div className="flex h-full flex-1 items-center justify-center bg-stone-300 transition duration-200 ease-out group-hover:bg-stone-300/50 dark:bg-stone-800 dark:group-hover:bg-magenta-600/80">
                                                            <p className="text-xs font-semibold text-gray-900 group-hover:text-gray-900/50 sm:text-sm dark:text-white dark:group-hover:text-gray-900">
                                                                Đăng xuất
                                                            </p>
                                                        </div>
                                                        <div className="flex h-full basis-1/5 items-center justify-center overflow-hidden bg-stone-400 transition duration-200 ease-out group-hover:bg-stone-400/50 dark:bg-stone-900/70 dark:text-white dark:group-hover:bg-magenta-500/100 dark:group-hover:text-gray-900">
                                                            <ArrowLeftStartOnRectangleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                                                        </div>
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex flex-col items-center justify-items-center space-y-2 px-2 py-4 pb-10 text-white">
                                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-300 text-gray-500 dark:bg-magenta-400 dark:text-white">
                                                        <UserIcon className="h-10 w-10 drop-shadow-md" />
                                                    </div>
                                                    <p className="text-md font-bold text-gray-500 dark:text-white">
                                                        Ẩn danh
                                                    </p>
                                                </div>
                                                <div className="flex flex-col space-y-2">
                                                    <button
                                                        onClick={() => {
                                                            close();
                                                            navigate('/dang-nhap');
                                                        }}
                                                        className="group flex h-12 w-full items-center justify-center overflow-hidden rounded-md"
                                                    >
                                                        <div className="flex h-full flex-1 items-center justify-center bg-stone-300 transition duration-200 ease-out group-hover:bg-stone-300/50 dark:bg-stone-800 dark:group-hover:bg-magenta-600/80">
                                                            <p className="text-xs font-semibold text-gray-900 group-hover:text-gray-900/50 sm:text-sm dark:text-white dark:group-hover:text-gray-900">
                                                                Đăng nhập
                                                            </p>
                                                        </div>

                                                        <div className="flex h-full basis-1/5 items-center justify-center overflow-hidden bg-stone-400 transition duration-200 ease-out group-hover:bg-stone-400/50 dark:bg-stone-900/70 dark:text-white dark:group-hover:bg-magenta-500/100 dark:group-hover:text-gray-900">
                                                            <ArrowLeftEndOnRectangleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                                                        </div>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            close();
                                                            navigate('/dang-ky');
                                                        }}
                                                        className="group flex h-12 w-full items-center  justify-center overflow-hidden rounded-md "
                                                    >
                                                        <div className="flex h-full flex-1 items-center justify-center bg-stone-300 transition duration-200 ease-out group-hover:bg-stone-300/50 dark:bg-stone-800 dark:group-hover:bg-magenta-600/80">
                                                            <p className="text-xs font-semibold text-gray-900 group-hover:text-gray-900/50 sm:text-sm dark:text-white dark:group-hover:text-gray-900">
                                                                Tạo tài khoản
                                                            </p>
                                                        </div>
                                                        <div className="flex h-full basis-1/5 items-center justify-center overflow-hidden bg-stone-400 transition duration-200 ease-out group-hover:bg-stone-400/50 dark:bg-stone-900/70 dark:text-white dark:group-hover:bg-magenta-500/100 dark:group-hover:text-gray-900">
                                                            <UserPlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                                                        </div>
                                                    </button>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
}
