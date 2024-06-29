import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import ButtonWithBorder from '../../../components/frontend/ButtonWithBorder';
// import { products } from '../../../test/products';
import { Link, useNavigate } from 'react-router-dom';
import { paymentByMoMo, paymentByZaloPay } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedListFromCart } from '../../../utils';
import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { getCartFromLocalStorage } from '../../../utils/index';
import { createOrder } from '../../../store/actions/order-actions';
import { toast } from 'react-toastify';
import DocumentTitle from '../../../components/frontend/DocumentTitle';
const _ = require('lodash');

export default function Review({
    step,
    setStep,
    information,
    discounts,
    paymentMethod,
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.userReducer);

    const [selectedProductFromCart] = useState(getSelectedListFromCart);
    const [price_total, setprice_total] = useState(0);
    const createNewOrder = async () => {
        const id = toast.loading('Vui lòng chờ...');

        const newOrder = await dispatch(
            createOrder({
                cartId: getCartFromLocalStorage?._id,
                userId: userInfo._id,
                order_shipping: {
                    ship_to: {
                        phone: information.phonenumber,
                        email: information.email,
                        name: information.fullname,
                        address: information.address,
                    },
                },
                user_payment: {
                    payment_method: paymentMethod,
                },
                order_ids: {
                    shop_discounts: discounts,
                    item_products: selectedProductFromCart.map((item) =>
                        _.pick(item, [
                            'productId',
                            'sku_id',
                            'price',
                            'quantity',
                        ])
                    ),
                },
            })
        );
        if (newOrder?.payload?.status === (200 || 201)) {
            toast.update(id, {
                render: 'Đang xử lý đơn hàng',
                type: 'info',
                isLoading: false,
                closeOnClick: true,
                autoClose: 2000,
            });
            return newOrder?.payload?.metaData;
        } else {
            toast.update(id, {
                render: 'Tạo đơn hàng không thành công',
                type: 'error',
                isLoading: false,
                closeOnClick: true,
                autoClose: 3000,
            });
            return null;
        }
    };

    const handlePlaceOrder = async () => {
        if (paymentMethod === 'COD') {
            const onCreate = await createNewOrder();
            if (onCreate) {
                navigate('/khoi-tao-don-hang');
            }
            return;
        }
        if (paymentMethod === 'MOMO') {
            const onCreate = await createNewOrder();
            if (onCreate) {
                const result = await dispatch(
                    paymentByMoMo({
                        orderInfo: 'Thanh toán đơn hàng OUTRUNNER',
                        amount: information.price_total,
                        order_trackingNumber: onCreate?.order_trackingNumber,
                    })
                );
                result && window.location.replace(result.payload.payUrl);
            }
            return;
        }
        if (paymentMethod === 'ZALOPAY') {
            const onCreate = await createNewOrder();
            if (onCreate) {
                const result = await dispatch(
                    paymentByZaloPay({
                        orderInfo: 'Thanh toán đơn hàng OUTRUNNER',
                        amount: information.price_total,
                        order_trackingNumber: onCreate?.order_trackingNumber,
                    })
                );
                result && window.location.replace(result.payload.order_url);
            }
        }
    };

    useEffect(() => {
        setprice_total(
            selectedProductFromCart?.reduce(
                (accumulator, currentValue) =>
                    accumulator + (currentValue.price_sale ? currentValue.price_sale : currentValue.price) * currentValue.quantity,
                0
            )
        );
    }, [selectedProductFromCart]);

    return (
        <div
            className={`w-screen flex-shrink-0 px-4 md:px-32 ${step === 3 ? '' : 'hidden'}`}
        >
            <DocumentTitle title="Kiểm tra trước thanh toán" />

            <button
                onClick={() => setStep(step - 1)}
                className="mb-6 flex items-center text-gray-900 dark:text-white"
            >
                <ChevronLeftIcon className="h-6 w-6" />
                <span className="text-lg font-bold">Quay lại</span>
            </button>
            <div className="grid md:gap-16">
                <div>
                    <div className="h-fit rounded-md bg-white p-10 shadow-md dark:bg-zinc-900/100 dark:shadow-inner dark:shadow-white/25">
                        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                            Thông tin giao hàng
                        </h1>
                        <div className="space-y-4 pt-4">
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-900 dark:text-white">
                                    Email
                                </span>
                                <input
                                    type="email"
                                    required
                                    value={information.email}
                                    disabled
                                    autoComplete="0"
                                    placeholder="example@gmail.com"
                                    className="border-b-2 border-l-0 border-r-0 border-t-0 border-gray-900 bg-transparent pl-0 text-gray-900 placeholder:text-zinc-400 focus:border-magenta-500 focus:placeholder-transparent focus:ring-0 disabled:border-zinc-400 disabled:text-zinc-400 dark:border-white dark:text-white"
                                />
                            </div>
                            <div className="flex max-sm:flex-col max-sm:space-y-3 sm:space-x-3">
                                <div className="flex flex-col sm:w-1/2">
                                    <span className="text-sm text-gray-900 dark:text-white">
                                        Tên người nhận
                                    </span>
                                    <input
                                        type="text"
                                        required
                                        value={information.fullname}
                                        disabled
                                        autoComplete="0"
                                        placeholder="E.g. Jonhan Strauss"
                                        className="border-b-2 border-l-0 border-r-0 border-t-0 border-gray-900 bg-transparent pl-0 text-gray-900 placeholder:text-zinc-400 focus:border-magenta-500 focus:placeholder-transparent focus:ring-0 disabled:border-zinc-400 disabled:text-zinc-400 dark:border-white dark:text-white"
                                    />
                                </div>
                                <div className="flex flex-col sm:w-1/2">
                                    <span className="text-sm text-gray-900 dark:text-white">
                                        Số điện thoại
                                    </span>
                                    <input
                                        type="text"
                                        required
                                        disabled
                                        value={information.phonenumber}
                                        autoComplete="0"
                                        placeholder="E.g. 0123456789"
                                        className="border-b-2 border-l-0 border-r-0 border-t-0 border-white bg-transparent pl-0 text-gray-900 placeholder:text-zinc-400 focus:border-magenta-500 focus:placeholder-transparent focus:ring-0 disabled:border-zinc-400 disabled:text-zinc-400 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-sm text-gray-900 dark:text-white">
                                    Địa chỉ nhận hàng
                                </span>
                                <input
                                    type="text"
                                    required
                                    disabled
                                    value={information.address}
                                    autoComplete="0"
                                    placeholder="E.g. 1000 Test street, block b, TP HCM"
                                    className="border-b-2 border-l-0 border-r-0 border-t-0 border-white bg-transparent pl-0 text-white placeholder:text-zinc-400 focus:border-magenta-500 focus:placeholder-transparent focus:ring-0 disabled:border-zinc-400 disabled:text-zinc-400"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="h-fit rounded-md bg-white p-10 text-gray-900 shadow-md dark:bg-zinc-900 dark:text-white dark:shadow-inner dark:shadow-white/25">
                        <div className="flow-root">
                            <ul className="checkout -my-2 divide-gray-200 overflow-y-scroll transition-colors duration-200 ease-out dark:divide-stone-700">
                                {selectedProductFromCart &&
                                    selectedProductFromCart.map(
                                        (product, index) => (
                                            <li
                                                key={index}
                                                className="flex py-4"
                                            >
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={
                                                            product.product_image
                                                        }
                                                        alt={
                                                            product.product_image
                                                        }
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                                            <h3 className="line-clamp-3 text-ellipsis">
                                                                <Link
                                                                    to={`/san-pham/${product.product_slug_id}`}
                                                                >
                                                                    {
                                                                        product.product_name
                                                                    }
                                                                </Link>
                                                            </h3>
                                                            <p className="ml-4 text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                                                <NumericFormat
                                                                    value={
                                                                        product.price
                                                                    }
                                                                    displayType="text"
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    decimalScale={
                                                                        0
                                                                    }
                                                                    id="price"
                                                                    suffix={'đ'}
                                                                />
                                                            </p>
                                                        </div>
                                                        <div className="mt-1 text-sm text-gray-500 transition-colors duration-200 ease-out dark:text-gray-300">
                                                            {product?.product_option?.map(
                                                                (
                                                                    option,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <p
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="mt-1 text-sm text-gray-500 transition-colors duration-200 ease-out dark:text-gray-300"
                                                                        >
                                                                            {
                                                                                option
                                                                                    .options[
                                                                                product
                                                                                    .product_variation[
                                                                                index
                                                                                ]
                                                                                ]
                                                                            }
                                                                        </p>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <p className="text-gray-500 transition-colors duration-200 ease-out dark:text-gray-300">
                                                            Số lượng{' '}
                                                            {product.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    )}
                            </ul>
                        </div>
                        <div className="mt-6 flex py-4">
                            <div className="flex flex-1 flex-col">
                                <div className="flex justify-end space-x-5 text-gray-900 dark:text-white">
                                    <h1 className="text-md font-bold">
                                        Phương thức thanh toán:
                                    </h1>
                                    {paymentMethod === 'COD' ? (
                                        <h1 className="text-md font-bold">
                                            Thanh toán khi nhận hàng
                                        </h1>
                                    ) : (
                                        <div className="text-md flex space-x-2">
                                            <span>
                                                Thanh toán bằng {paymentMethod}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="flex justify-between py-3 text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                        <h3>Tạm tính</h3>
                                        <p className="text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                            <NumericFormat
                                                value={price_total}
                                                displayType="text"
                                                thousandSeparator={true}
                                                decimalScale={0}
                                                id="price"
                                                suffix={'đ'}
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t-2">
                                    <div className="flex justify-between py-3 text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                        <h3>Phí giao hàng</h3>
                                        <p className="text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                            0đ
                                        </p>
                                    </div>
                                    <div className="flex justify-between pb-3 text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                        <h3>Giảm giá</h3>
                                        <p className="text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                            <NumericFormat
                                                value={
                                                    information.price_discount_amount
                                                }
                                                displayType="text"
                                                thousandSeparator={true}
                                                decimalScale={0}
                                                id="price"
                                                suffix={'đ'}
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t-2">
                                    <div className="flex  justify-between py-3 text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                        <h3>Tổng</h3>
                                        <p className="text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                            <NumericFormat
                                                value={information.price_total}
                                                displayType="text"
                                                thousandSeparator={true}
                                                decimalScale={0}
                                                id="price"
                                                suffix={'đ'}
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ButtonWithBorder
                        Title={'Đặt hàng'}
                        HandleClick={() => handlePlaceOrder()}
                        className={'mt-4 w-full p-2 font-bold'}
                    />
                </div>
            </div>
        </div>
    );
}
