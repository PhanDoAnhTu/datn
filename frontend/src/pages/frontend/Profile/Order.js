import { Tab } from '@headlessui/react';
import { products } from '../../../test/products';
import Pagination from '../../../components/frontend/Pagination';
import { Link } from 'react-router-dom';

export default function Order() {
    return (
        <Tab.Panel className={'p-3 px-7'}>
            <div className="mb-4">
                <div className="grid gap-y-3 divide-y">
                    {products.map((item, index) => {
                        return (
                            <div className="flex py-4 pt-6 " key={index}>
                                <div className="flex space-x-2">
                                    <div className="text-gray-900 dark:text-white">
                                        Mã đơn hàng: testcode
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col px-2">
                                    <div className="text-md flex justify-end space-x-2 py-1 text-white">
                                        <span className="border-r-2 pr-2">
                                            1 March 2024, 11:21PM
                                        </span>
                                        <span className="font-bold text-green-400">
                                            Đã giao hàng
                                        </span>
                                    </div>
                                    <div className="mt-5 flex justify-end">
                                        <Link
                                            to={`/chi-tiet-don-hang/1`}
                                            className="border-2 border-white px-5 py-1 text-white transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500"
                                        >
                                            Xem chi tiết
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <Pagination />
            </div>
        </Tab.Panel>
    );
}
