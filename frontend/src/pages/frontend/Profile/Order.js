import { Tab } from '@headlessui/react';
import Pagination from '../../../components/frontend/Pagination';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { findOrderByUserId } from '../../../store/actions/order-actions';

export default function Order() {
    // eslint-disable-next-line no-unused-vars
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userReducer);
    const [page, setPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await dispatch(
                findOrderByUserId({
                    order_userId: userInfo?._id,
                })
            );
            if (result) {
                setOrders(result.payload.metaData);
            }
        };
        fetchData();
    }, [userInfo]);
    return (
        <Tab.Panel className={'p-3 px-7'}>
            <div className="mb-4">
                <div className="grid gap-y-3 divide-y">
                    {orders && orders.length !== 0 ? (
                        orders?.map((item) => {
                            return (
                                <div className="flex py-4 pt-6 " key={item._id}>
                                    <div className="flex space-x-2">
                                        <div className="text-gray-900 dark:text-white">
                                            Mã đơn hàng:{' '}
                                            {item.order_trackingNumber}
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col px-2">
                                        <div className="text-md flex justify-end space-x-2 py-1 text-white">
                                            <span className="border-r-2 pr-2">
                                                {item.createdOn}
                                            </span>
                                            <span className="font-bold text-green-400">
                                                {() => {
                                                    switch (item.order_status) {
                                                        case 'confirmed':
                                                            return 'Đã xác nhận';
                                                        case 'shipped':
                                                            return 'Đã hoàn thành';
                                                        case 'cancelled':
                                                            return 'Đã hủy';
                                                        default:
                                                            return 'Chờ xác nhận';
                                                    }
                                                }}
                                            </span>
                                        </div>
                                        <div className="mt-5 flex justify-end">
                                            <Link
                                                to={`/chi-tiet-don-hang/${item.order_trackingNumber}`}
                                                className="border-2 border-white px-5 py-1 text-white transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500"
                                            >
                                                Xem chi tiết
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="font-bold text-white">
                            Hiện không có thông tin để hiển thị!
                        </div>
                    )}
                </div>
                {orders && orders?.length > 5 ? (
                    <Pagination
                        data={Array.from(
                            {
                                length: Math.ceil(orders?.length / 5),
                            },
                            (_, index) => index + 1
                        )}
                        setPage={setPage}
                        currentPage={page}
                    />
                ) : (
                    ''
                )}
            </div>
        </Tab.Panel>
    );
}
