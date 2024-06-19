import { Tab } from '@headlessui/react';
import classNames from '../../../helpers/classNames';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function ProfileTabItem({ Title, Icon }) {
    return (
        <Tab
            className={({ selected }) =>
                classNames(
                    'group relative flex w-full items-center py-4 pl-4 pr-2 text-sm font-medium leading-5 text-gray-900 outline-none transition duration-500 ease-out dark:text-white',
                    selected ? 'pointer-events-none shadow' : ''
                )
            }
        >
            <span
                className={`absolute left-0 h-full w-full bg-magenta-500 transition-all duration-500 ease-out max-sm:ui-selected:translate-y-0 max-sm:ui-not-selected:-translate-y-full sm:ui-selected:translate-x-0 sm:ui-not-selected:-translate-x-full lg:group-hover:-translate-x-97`}
            ></span>

            <div className="flex flex-1 items-center space-x-2 ui-selected:z-10">
                <div>{Icon}</div>
                <span className="font-semibold">{Title}</span>
            </div>
            <div className="ui-selected:z-10 max-sm:invisible">
                <ChevronRightIcon className="h-5 w-5" />
            </div>
        </Tab>
    );
}
