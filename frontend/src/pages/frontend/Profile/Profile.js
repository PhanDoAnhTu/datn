import {
    HeartIcon,
    HomeIcon,
    ShoppingBagIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { Tab } from '@headlessui/react';
import ProfileTabItem from '../../../components/frontend/Profile/ProfileTabItem';
import Information from './Information';
import Address from './Address';
// import { useEffect } from 'react';
import Order from './Order';
import Favorites from './Favorites';
import DocumentTitle from '../../../components/frontend/DocumentTitle';

export default function Profile() {
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <DocumentTitle title="Trang cá nhân" />

            <div className="flex flex-col items-baseline justify-between pb-7 pt-24">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                    Hồ sơ của tôi
                </h1>
            </div>
            <section className="mb-10 flex max-sm:flex-col max-sm:space-y-2 sm:space-x-3">
                <Tab.Group>
                    <Tab.List className="no-scrollbar flex h-fit divide-stone-600 rounded-md bg-white shadow-md max-sm:flex-row max-sm:overflow-x-scroll sm:w-1/4 sm:flex-col sm:overflow-hidden dark:bg-zinc-900 dark:shadow-inner dark:shadow-white/25">
                        <ProfileTabItem
                            Icon={
                                <UserIcon className="h-6 w-6 text-gray-900 dark:text-white" />
                            }
                            Title={'Thông tin'}
                        />
                        <ProfileTabItem
                            Icon={
                                <ShoppingBagIcon className="h-6 w-6 text-gray-900 dark:text-white" />
                            }
                            Title={'Đơn hàng'}
                        />
                        <ProfileTabItem
                            Icon={
                                <HeartIcon className="h-6 w-6 text-gray-900 dark:text-white" />
                            }
                            Title={'Yêu thích'}
                        />
                        <ProfileTabItem
                            Icon={
                                <HomeIcon className="h-6 w-6 text-gray-900 dark:text-white" />
                            }
                            Title={'Địa chỉ'}
                        />
                    </Tab.List>
                    <Tab.Panels className="h-fit flex-1 rounded-md bg-white shadow-md dark:bg-zinc-900 dark:shadow-inner dark:shadow-white/25">
                        <Information />
                        <Order />
                        <Favorites />
                        <Address />
                    </Tab.Panels>
                </Tab.Group>
            </section>
        </main>
    );
}
