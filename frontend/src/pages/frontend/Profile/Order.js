import { Tab } from '@headlessui/react';
import { products } from '../../../test/products';
import Pagination from '../../../components/frontend/Pagination';
import { useState } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

export default function Order() {
    const [isView, setIsView] = useState(null);
    return (
        <Tab.Panel className={'p-3 px-7'}>
            {isView ? (
                <div className="py-4 text-white">
                    <button
                        onClick={() => setIsView(null)}
                        className="group flex items-center pl-0 text-white"
                    >
                        <ChevronLeftIcon className="h-7 w-7 transition duration-500 ease-out group-hover:text-magenta-500" />
                        <span className="text-lg transition duration-500 ease-out group-hover:text-magenta-500">
                            Back
                        </span>
                    </button>
                    <div className="text-white">
                        {isView ? isView.name : ''}
                    </div>
                </div>
            ) : (
                <div className="mb-4">
                    <div className="grid gap-y-3 divide-y">
                        {products.map((item, index) => {
                            return (
                                <div className="flex py-4 pt-6" key={index}>
                                    <div className="flex space-x-2">
                                        <div className="w-24 overflow-hidden rounded-lg shadow-md transition duration-200 ease-out sm:w-24 md:w-32">
                                            <img
                                                src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                                                alt=""
                                                className="h-full w-full object-contain object-center"
                                            />
                                        </div>
                                        <div className="w-20 overflow-hidden rounded-lg shadow-md transition duration-200 ease-out max-sm:hidden sm:w-24 md:w-32">
                                            <img
                                                src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                                                alt=""
                                                className="h-full w-full object-contain object-center"
                                            />
                                        </div>
                                        <div className="hidden w-20 overflow-hidden rounded-lg shadow-md transition duration-200 ease-out sm:w-24 md:w-32 lg:block">
                                            <img
                                                src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                                                alt=""
                                                className="h-full w-full object-contain object-center"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col px-2">
                                        <div className="text-md flex justify-end space-x-2 py-1 text-white">
                                            <span className="border-r-2 pr-2">
                                                1 March 2024, 11:21PM
                                            </span>
                                            <span className="font-bold text-green-400">
                                                Delivered
                                            </span>
                                        </div>
                                        <div className="flex-1 py-1 text-end text-white">
                                            Qty: 3
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => setIsView(item)}
                                                className="border-2 border-white px-5 py-1 text-white transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500"
                                            >
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <Pagination />
                </div>
            )}
        </Tab.Panel>
    );
}
