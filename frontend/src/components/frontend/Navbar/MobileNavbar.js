import { Dialog, Tab, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from '../../../helpers/classNames';
import { navigation } from '../../../test/categories';

export default function MobileNavbar({ category, open, setOpen }) {
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
                                <input type="text" className="w-full" />
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
                                                    {navigation.categories[0].featured.map(
                                                        (item) => (
                                                            <div
                                                                key={item.name}
                                                                className="group relative text-sm"
                                                            >
                                                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                    <img
                                                                        src={
                                                                            item.imageSrc
                                                                        }
                                                                        alt={
                                                                            item.imageAlt
                                                                        }
                                                                        className="object-cover object-center"
                                                                    />
                                                                </div>
                                                                <Link
                                                                    to={item.to}
                                                                    className="mt-6 block font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white"
                                                                >
                                                                    <span
                                                                        className="absolute inset-0 z-10"
                                                                        aria-hidden="true"
                                                                    />
                                                                    {item.name}
                                                                </Link>
                                                                <p
                                                                    aria-hidden="true"
                                                                    className="mt-1 transition-colors duration-200 ease-out dark:text-gray-400"
                                                                >
                                                                    Shop now
                                                                </p>
                                                            </div>
                                                        )
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
                                                            <p
                                                                id={`${item._id}-${subitem._id}-heading-mobile`}
                                                                className="font-medium text-gray-900 dark:text-magenta-600"
                                                            >
                                                                {
                                                                    subitem.category_name
                                                                }
                                                            </p>
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
                                                                                    to={
                                                                                        '#'
                                                                                    }
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
                                {navigation.pages.map((page) => (
                                    <div key={page.name} className="flow-root">
                                        <Link
                                            to={page.to}
                                            className="-m-2 block p-2 font-medium text-gray-900 dark:text-magenta-600"
                                        >
                                            {page.name}
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
