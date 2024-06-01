import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';
import classNames from '../../../helpers/classNames';
import { ReactComponent as LightLogo } from '../../../assets/lightlogo.svg';
import { ReactComponent as DarkLogo } from '../../../assets/darklogo.svg';
import SearchBar from './SearchBar';
import CartPopover from './CartPopover';
import UserPopover from './UserPopover';
import Logo from '../../../assets/Logo';

export default function PCNavbar({ navigation, setOpen }) {
    ////////////////
    const [scrollY, setScrollY] = useState(window.scrollY);
    const [bgWhite, setBgWhite] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );

        const handleDarkModeChange = (event) => {
            setIsDarkMode(event.matches);
        };

        darkModeMediaQuery.addEventListener('change', handleDarkModeChange);
        setIsDarkMode(darkModeMediaQuery.matches);

        return () => {
            darkModeMediaQuery.removeEventListener(
                'change',
                handleDarkModeChange
            );
        };
    }, []);

    return (
        <nav
            aria-label="Top"
            className={`${scrollY > 299 ? 'lg:bg-stone-100 dark:bg-zinc-950' : 'lg:bg-stone-100/50 lg:dark:bg-zinc-950/50'} lg:fixed  ${bgWhite ? 'duration-75 lg:fixed lg:bg-stone-100/100  lg:dark:bg-zinc-950/100' : '  duration-200 lg:delay-100 '} bg-opacityy-50 left-0 right-0 top-0 z-20 mx-auto max-w-full  px-4 transition ease-in-out max-lg:bg-stone-100 sm:px-6 lg:px-8 dark:max-lg:bg-zinc-950`}
        >
            <div className="border-b border-gray-200 transition duration-500 ease-in-out dark:border-gray-700">
                <div className="flex h-16 items-center">
                    <button
                        type="button"
                        className="relative  rounded-md  p-2 text-gray-400 lg:hidden "
                        onClick={() => setOpen(true)}
                    >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open menu</span>
                        <Bars3Icon
                            className="h-6 w-6 dark:text-white"
                            aria-hidden="true"
                        />
                    </button>

                    {/* Logo */}
                    <div className="ml-4 flex basis-1/2 lg:ml-0">
                        <Link to="/" className="flex outline-none">
                            <span className="sr-only">Your Company</span>
                            {isDarkMode ? (
                                <LightLogo
                                    className={`z-10 h-12 w-12 transition duration-500 ease-in-out ${scrollY < 350 ? 'scale-100' : 'lg:translate-x-7 lg:scale-125'}`}
                                />
                            ) : (
                                <DarkLogo
                                    className={`z-10 h-12 w-12 transition duration-500 ease-in-out ${scrollY < 350 ? 'scale-100' : 'lg:translate-x-7 lg:scale-125'}`}
                                />
                            )}

                            <div
                                className={`z-0 translate-x-0 self-center text-lg transition delay-75 ease-in-out ${scrollY < 350 ? ' lg:opacity-100 lg:duration-500' : 'lg:-translate-x-5 lg:opacity-0 lg:duration-150'}`}
                            >
                                <Logo className={'w-13 h-5 sm:h-12 sm:w-36'} />
                            </div>
                        </Link>
                    </div>

                    {/* Flyout menus */}
                    <Popover.Group className="hidden lg:block lg:self-stretch">
                        <div className="flex h-full  space-x-8">
                            {navigation.categories.map((category) => (
                                <Popover key={category.name} className="flex">
                                    {({ open, close }) => (
                                        <>
                                            <div className="relative flex">
                                                <Popover.Button
                                                    className={classNames(
                                                        open
                                                            ? 'border-magenta-500 text-magenta-500'
                                                            : 'border-transparent text-gray-700 hover:text-gray-800 dark:text-gray-100',
                                                        'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium outline-none transition-colors duration-200 ease-out hover:border-magenta-500 hover:text-magenta-500'
                                                    )}
                                                    onClick={() =>
                                                        setBgWhite(!open)
                                                    }
                                                >
                                                    {category.name}
                                                </Popover.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="-translate-y-6 opacity-0"
                                                enterTo="translate-y-0 opacity-100"
                                                leave="transition ease-in duration-150"
                                                leaveFrom="translate-y-0 opacity-100"
                                                leaveTo="-translate-y-6 opacity-0"
                                            >
                                                <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500 dark:text-white">
                                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                    <div
                                                        className="absolute inset-0 top-1/2 bg-stone-100 shadow"
                                                        aria-hidden="true"
                                                    />

                                                    <div className="relative bg-stone-100 dark:bg-zinc-950">
                                                        <div className="mx-auto max-w-7xl px-8">
                                                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                                <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                    {category.featured.map(
                                                                        (
                                                                            item
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    item.name
                                                                                }
                                                                                className="group relative text-base sm:text-sm"
                                                                            >
                                                                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 transition-opacity duration-300 ease-out group-hover:opacity-75">
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
                                                                                    to={
                                                                                        item.to
                                                                                    }
                                                                                    className="mt-6 block font-medium text-gray-900 dark:text-white"
                                                                                    onClick={async () => {
                                                                                        close();
                                                                                    }}
                                                                                >
                                                                                    <span
                                                                                        className="absolute inset-0 z-10"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </Link>

                                                                                <p
                                                                                    aria-hidden="true"
                                                                                    className="mt-1"
                                                                                >
                                                                                    Shop
                                                                                    now
                                                                                </p>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                                <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                    {category.sections.map(
                                                                        (
                                                                            section
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    section.name
                                                                                }
                                                                            >
                                                                                <p
                                                                                    id={`${section.name}-heading`}
                                                                                    className="font-medium text-gray-500 dark:text-magenta-600"
                                                                                >
                                                                                    {
                                                                                        section.name
                                                                                    }
                                                                                </p>
                                                                                <ul
                                                                                    aria-labelledby={`${section.name}-heading`}
                                                                                    className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                >
                                                                                    {section.items.map(
                                                                                        (
                                                                                            item
                                                                                        ) => (
                                                                                            <li
                                                                                                key={
                                                                                                    item.name
                                                                                                }
                                                                                                className="flex"
                                                                                            >
                                                                                                <Link
                                                                                                    to={
                                                                                                        item.to
                                                                                                    }
                                                                                                    onClick={async () => {
                                                                                                        close();
                                                                                                    }}
                                                                                                    className="transition-color duration-200 ease-out hover:text-gray-800 hover:dark:text-magenta-700"
                                                                                                >
                                                                                                    {
                                                                                                        item.name
                                                                                                    }
                                                                                                </Link>
                                                                                            </li>
                                                                                        )
                                                                                    )}
                                                                                </ul>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Popover>
                            ))}

                            {navigation.pages.map((page) => (
                                <Link
                                    key={page.name}
                                    to={page.to}
                                    className="flex items-center text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 dark:text-gray-100 dark:hover:text-magenta-500"
                                >
                                    {page.name}
                                </Link>
                            ))}
                        </div>
                    </Popover.Group>

                    <div className="ml-auto flex basis-1/2  items-center justify-end">
                        {/* Search */}
                        <SearchBar
                            Button={
                                <button
                                    className={`p-2  text-gray-300 outline-none transition-colors duration-200 ease-out hover:text-gray-900 max-lg:text-gray-300 dark:text-white dark:hover:text-gray-500`}
                                >
                                    <span className="sr-only">Search</span>
                                    <MagnifyingGlassIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>
                            }
                        />

                        <UserPopover />

                        {/* Cart */}
                        <CartPopover
                            Button={
                                <button className="group -m-2 flex items-center p-2">
                                    <ShoppingBagIcon
                                        className={`h-6 w-6 flex-shrink-0 text-gray-300 transition-colors duration-200 ease-out group-hover:text-gray-800 max-lg:text-gray-300 dark:text-white dark:group-hover:text-gray-500`}
                                        aria-hidden="true"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700 transition-colors duration-200 ease-out group-hover:text-gray-800 dark:text-gray-100 dark:group-hover:text-gray-500">
                                        0
                                    </span>
                                    <span className="sr-only">
                                        items in cart, view bag
                                    </span>
                                </button>
                            }
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
