import { Tab } from '@headlessui/react';
import Pagination from '../../../components/frontend/Pagination';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { findOrderByUserId } from '../../../store/actions/order-actions';
import { NumericFormat } from 'react-number-format';
import dayjs from 'dayjs';
import DocumentTitle from '../../../components/frontend/DocumentTitle';

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
    const statusOrder = (item) => {
        switch (item.order_status) {
            case 'confirmed':
                return (
                    <span className="font-bold text-green-400">
                        Đã xác nhận
                    </span>
                );
            case 'shipping':
                return (
                    <span className="font-bold text-green-400">Đang giao</span>
                );
            case 'review':
                return (
                    <span className="font-bold text-xanthous-400">
                        Đã đánh giá
                    </span>
                );
            case 'cancelled':
                return <span className="font-bold text-rose-500">Đã hủy</span>;
            case 'successful':
                return (
                    <span className="font-bold text-green-400">Đã nhận</span>
                );
            default:
                return (
                    <span className="font-bold text-gray-400">
                        Chờ xác nhận
                    </span>
                );
        }
    };
    return (
        <Tab.Panel className={'px-7 pt-4 text-gray-900 dark:text-white'}>
            <DocumentTitle title="Hóa đơn" />

            <div className="mb-4">
                <div className="grid gap-y-3 divide-y">
                    {orders && orders.length !== 0 ? (
                        orders?.map((item) => {
                            return (
                                <div className="flex py-4 " key={item._id}>
                                    <div className="flex  flex-col justify-around">
                                        <div className="text-gray-900 dark:text-white">
                                            <p className="font-bold">
                                                {' '}
                                                Mã đơn hàng:{'  #'}
                                                {item.order_trackingNumber}
                                            </p>
                                        </div>
                                        <div className=" text-gray-900 dark:text-white">
                                            Địa chỉ nhận:{' '}
                                            {
                                                item?.order_shipping.ship_to
                                                    .address
                                            }
                                        </div>
                                        <div className=" text-gray-900 dark:text-white">
                                            Tổng tiền thanh toán:{' '}
                                            <NumericFormat
                                                value={
                                                    item?.order_checkout
                                                        ?.totalCheckout
                                                }
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                decimalScale={0}
                                                id="price"
                                                suffix={'đ'}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-1 flex-col justify-around">
                                        <div className="text-md flex justify-end space-x-2 text-gray-900 dark:text-white">
                                            <span className="border-r-2 pr-2 ">
                                                {item.createdOn &&
                                                dayjs(item.createdOn).format(
                                                    'hh:mm DD/MM/YYYY'
                                                )
                                                    ? dayjs().diff(
                                                          dayjs(item.createdOn),
                                                          'minute'
                                                      ) < 60
                                                        ? `${dayjs().diff(dayjs(item.createdOn), 'minute')} phút trước`
                                                        : dayjs().diff(
                                                                dayjs(
                                                                    item.createdOn
                                                                ),
                                                                'hour'
                                                            ) < 24
                                                          ? `${dayjs().diff(dayjs(item.createdOn), 'hour')} giờ trước`
                                                          : dayjs(
                                                                item.createdOn
                                                            ).format(
                                                                'hh:mmA DD/MM/YYYY'
                                                            )
                                                    : ''}
                                            </span>

                                            {statusOrder(item)}
                                        </div>
                                        <div className="mt-5 flex justify-end">
                                            <Link
                                                to={`/chi-tiet-don-hang/${item.order_trackingNumber}`}
                                                className="rounded-md border-2 border-magenta-500 bg-magenta-500 px-5 py-1 text-white shadow-md transition duration-500 ease-out hover:-translate-y-0.5 hover:border-magenta-500"
                                            >
                                                Xem chi tiết
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="font-bold text-gray-900 dark:text-white">
                            Hiện không có hóa đơn để hiển thị!
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
