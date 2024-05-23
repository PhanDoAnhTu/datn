import {
    BellIcon,
    CreditCardIcon,
    HeartIcon,
    HomeIcon,
    ShoppingBagIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { Tab } from '@headlessui/react';
import ProfileTabItem from '../../../components/frontend/Profile/ProfileTabItem';
import Information from './Information';
import Pagination from '../../../components/frontend/Pagination';
import { products } from '../../../test/products';
import Address from './Address';
import Payment from './Payment';
import Notification from './Notification';
import { useEffect } from 'react';
import Order from './Order';

export default function Profile() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-baseline justify-between pb-7 pt-24">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                    My account
                </h1>
            </div>
            <section className="mb-10 flex max-sm:flex-col max-sm:space-y-2 sm:space-x-3">
                <Tab.Group>
                    <Tab.List className="no-scrollbar flex h-fit divide-stone-600 bg-stone-900/50 max-sm:flex-row max-sm:overflow-x-scroll sm:w-1/4 sm:flex-col sm:overflow-hidden">
                        <ProfileTabItem
                            Icon={<UserIcon className="h-6 w-6" />}
                            Title={'Information'}
                        />
                        <ProfileTabItem
                            Icon={<ShoppingBagIcon className="h-6 w-6" />}
                            Title={'Orders'}
                        />
                        <ProfileTabItem
                            Icon={<HeartIcon className="h-6 w-6" />}
                            Title={'Favorites'}
                        />
                        <ProfileTabItem
                            Icon={<HomeIcon className="h-6 w-6" />}
                            Title={'Addresses'}
                        />
                        <ProfileTabItem
                            Icon={<CreditCardIcon className="h-6 w-6" />}
                            Title={'Payment'}
                        />
                        <ProfileTabItem
                            Icon={<BellIcon className="h-6 w-6" />}
                            Title={'Notification'}
                        />
                    </Tab.List>
                    <Tab.Panels className="h-fit flex-1 bg-stone-900/30 dark:bg-stone-900/50">
                        <Information />
                        <Order />
                        <Tab.Panel className={'p-3 px-7'}>
                            <div className="mb-4 grid gap-y-4 divide-y">
                                {products.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex w-full pt-6 sm:space-x-2"
                                        >
                                            <div className="h-fit w-32 overflow-hidden rounded-md md:w-40">
                                                <img
                                                    src={item.imageSrc}
                                                    className="object-contain object-center"
                                                />
                                            </div>
                                            <div className="flex flex-1 text-white">
                                                <div className="flex flex-1 flex-col space-y-1 overflow-hidden px-2">
                                                    <div className="flex">
                                                        <div className="flex-1">
                                                            <h1 className="truncate text-wrap text-sm font-bold max-sm:w-36 md:text-xl">
                                                                {item.name}
                                                            </h1>
                                                            <div className="text-md text-gray-300">
                                                                Brand
                                                            </div>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="font-bold md:text-2xl">
                                                                {item.price}
                                                            </span>
                                                            <span className="text-xs font-semibold line-through md:text-lg">
                                                                {item.price}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="text-md pt-2 text-justify ">
                                                        Lorem ipsum dolor sit
                                                        amet consectetur,
                                                        adipisicing elit. Soluta
                                                        rerum asperiores
                                                        molestiae sit
                                                        accusantium consectetur.
                                                        Accusantium unde
                                                        accusamus in. Expedita
                                                        praesentium fuga
                                                        voluptatibus numquam
                                                        aliquid, reiciendis iste
                                                        ad quisquam, dolorem
                                                        aut, cumque dolor a eum
                                                        assumenda? Repellendus
                                                        officiis, unde a
                                                        consequatur provident
                                                        saepe, asperiores in ab
                                                        et est voluptatum quam!
                                                    </div>
                                                    <div className="flex justify-end space-x-2 pt-1">
                                                        <button className="border-2 px-3 py-2 font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 max-sm:text-xs">
                                                            Add to cart
                                                        </button>
                                                        <button className="border-2 px-3 py-2 font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 max-sm:text-xs">
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <Pagination />
                        </Tab.Panel>
                        <Address />
                        <Payment />
                        <Notification />
                    </Tab.Panels>
                </Tab.Group>
            </section>
        </main>
    );
}
