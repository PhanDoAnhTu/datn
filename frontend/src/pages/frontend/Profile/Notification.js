import { Tab } from '@headlessui/react';

export default function Notification() {
    return (
        <Tab.Panel className="px-5 py-3 focus:outline-none">
            <div className="grid gap-4">
                <div className="flex justify-between text-white">
                    <div>Allow us to collect information about </div>
                    <div>
                        <label className="inline-flex cursor-pointer items-center">
                            <input
                                type="checkbox"
                                defaultValue=""
                                className="peer sr-only"
                            />
                            <div className="peer relative h-6 w-11 rounded-full bg-zinc-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-xanthous-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-xanthous-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-zinc-700 dark:peer-focus:ring-xanthous-800" />
                        </label>
                    </div>
                </div>
                <div className="flex justify-between text-white">
                    <div>Allow us to collect information about </div>
                    <div>
                        <label className="inline-flex cursor-pointer items-center">
                            <input
                                type="checkbox"
                                defaultValue=""
                                className="peer sr-only"
                            />
                            <div className="peer relative h-6 w-11 rounded-full bg-zinc-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-xanthous-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-xanthous-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-zinc-700 dark:peer-focus:ring-xanthous-800" />
                        </label>
                    </div>
                </div>
                <div className="flex justify-between text-white">
                    <div>Allow us to collect information about </div>
                    <div>
                        <label className="inline-flex cursor-pointer items-center">
                            <input
                                type="checkbox"
                                defaultValue=""
                                className="peer sr-only"
                            />
                            <div className="peer relative h-6 w-11 rounded-full bg-zinc-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-xanthous-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-xanthous-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-zinc-700 dark:peer-focus:ring-xanthous-800" />
                        </label>
                    </div>
                </div>
                <div className="flex justify-between text-white">
                    <div>Allow us to collect information about </div>
                    <div>
                        <label className="inline-flex cursor-pointer items-center">
                            <input
                                type="checkbox"
                                defaultValue=""
                                className="peer sr-only"
                            />
                            <div className="peer relative h-6 w-11 rounded-full bg-zinc-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-xanthous-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-xanthous-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-zinc-700 dark:peer-focus:ring-xanthous-800" />
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex justify-end pt-5">
                <button className="border-2 border-white px-5 py-2 text-white transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500">
                    Save
                </button>
            </div>
        </Tab.Panel>
    );
}
