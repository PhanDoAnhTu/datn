import { Dialog, Tab, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from '../../../helpers/classNames';
import { useSelector } from 'react-redux';

export default function MobileNavbar({ category, navbar, open, setOpen }) {
    const navigate = useNavigate();
    const { all_products } = useSelector((state) => state.productReducer);
    const [search, setSearch] = useState('');
    const handleSearch = () => {
        navigate('/tim-kiem-san-pham/' + search);
    };
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-40 lg:hidden"
                onClose={setOpen}
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
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-stone-100 pb-12 shadow-xl  dark:bg-neutral-900">
                            <div className="flex px-4 pb-2 pt-5">
                                <button
                                    type="button"
                                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition-colors duration-200 ease-out dark:text-white dark:hover:text-gray-500"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>

                            {/* Links */}
                            <Tab.Group as="div" className="mt-2">
                                <div className="flex w-full space-x-2 px-5">
                                    <input
                                        placeholder="Tìm kiếm"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-full border-2 border-gray-900 bg-transparent text-lg text-gray-900 outline-none ring-0 transition duration-500 ease-out placeholder:text-gray-700 focus:border-magenta-500 focus:bg-zinc-900/50 focus:ring-0 dark:border-white dark:text-white dark:placeholder:text-gray-400"
                                    />
                                    <button
                                        type="submit"
                                        onClick={handleSearch}
                                        className="rounded-md px-1 text-sm text-gray-900 transition duration-500 ease-out hover:text-magenta-500 dark:text-white"
                                    >
                                        <MagnifyingGlassIcon
                                            className="h-7 w-7"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                                <div className="border-b border-gray-200 transition-colors duration-200 ease-out dark:border-stone-700">
                                    <Tab.List className="-mb-px flex space-x-8 px-4">
                                        {category
                                            ?.slice()
                                            .filter(
                                                (og) => og.parent_id == null
                                            )
                                            .map((category) => (
                                                <Tab
                                                    key={category.category_name}
                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected
                                                                ? 'border-magenta-600 text-magenta-600'
                                                                : 'border-transparent text-gray-900 dark:text-white',
                                                            'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium transition-colors duration-200 ease-out'
                                                        )
                                                    }
                                                >
                                                    {category.category_name}
                                                </Tab>
                                            ))}
                                    </Tab.List>
                                </div>
                                <Tab.Panels as={Fragment}>
                                    {category
                                        ?.slice()
                                        .filter((og) => og.parent_id == null)
                                        .map((item) => (
                                            <Tab.Panel
                                                key={item.category_name}
                                                className="space-y-10 px-4 pb-8 pt-10"
                                            >
                                                <div className="grid grid-cols-2 gap-x-4">
                                                    {all_products &&
                                                        all_products
                                                            ?.slice()
                                                            .map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => {
                                                                    if (
                                                                        index <
                                                                        2
                                                                    ) {
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    item.product_name
                                                                                }
                                                                                className="group relative text-sm"
                                                                            >
                                                                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                                    <img
                                                                                        src={
                                                                                            item.product_thumb
                                                                                        }
                                                                                        alt={
                                                                                            item.product_name
                                                                                        }
                                                                                        className="object-cover object-center"
                                                                                    />
                                                                                </div>
                                                                                <Link
                                                                                    to={`/san-pham/${item.product_slug}-${item._id}`}
                                                                                    className="mt-6 block font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white"
                                                                                >
                                                                                    <span
                                                                                        className="absolute inset-0 z-10"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                    {
                                                                                        item.product_name
                                                                                    }
                                                                                </Link>
                                                                                <p
                                                                                    aria-hidden="true"
                                                                                    className="mt-1 transition-colors duration-200 ease-out dark:text-gray-400"
                                                                                >
                                                                                    Mua
                                                                                    ngay
                                                                                </p>
                                                                            </div>
                                                                        );
                                                                    }
                                                                }
                                                            )}
                                                </div>
                                                {category
                                                    ?.slice()
                                                    .filter(
                                                        (og) =>
                                                            og.parent_id ===
                                                            item._id
                                                    )
                                                    .map((subitem) => (
                                                        <div
                                                            key={
                                                                subitem.category_name
                                                            }
                                                        >
                                                            <Link
                                                                id={`${item._id}-${subitem._id}-heading-mobile`}
                                                                to={`/san-pham-theo-danh-muc/${item.category_slug}/${subitem.category_slug}`}
                                                                className="font-medium text-gray-900 dark:text-magenta-600"
                                                            >
                                                                {
                                                                    subitem.category_name
                                                                }
                                                            </Link>
                                                            <ul
                                                                aria-labelledby={`${item._id}-${subitem._id}-heading-mobile`}
                                                                className="mt-6 flex flex-col space-y-6"
                                                            >
                                                                {category
                                                                    ?.slice()
                                                                    .filter(
                                                                        (og) =>
                                                                            og.parent_id ===
                                                                            subitem._id
                                                                    )
                                                                    .map(
                                                                        (
                                                                            subsubitem
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    subsubitem.category_name
                                                                                }
                                                                                className="flow-root"
                                                                            >
                                                                                <Link
                                                                                    to={`/san-pham-theo-danh-muc/${item.category_slug}/${subitem.category_slug}/${subsubitem.category_slug}`}
                                                                                    className="-m-2 block p-2 text-gray-500 dark:text-gray-300"
                                                                                >
                                                                                    {
                                                                                        subsubitem.category_name
                                                                                    }
                                                                                </Link>
                                                                            </li>
                                                                        )
                                                                    )}
                                                            </ul>
                                                        </div>
                                                    ))}
                                            </Tab.Panel>
                                        ))}
                                </Tab.Panels>
                            </Tab.Group>

                            <div className="space-y-6 border-t border-gray-200 px-4 py-6 dark:border-stone-700">
                                {navbar?.map((item) => (
                                    <div key={item._id} className="flow-root">
                                        <Link
                                            to={item.menu_path}
                                            className="-m-2 block p-2 font-medium text-gray-900 dark:text-magenta-600"
                                        >
                                            {item.menu_label}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
