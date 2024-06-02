import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ReactComponent as MastercardCard } from '../../../assets/frontend/svg/MastercardCard.svg';
import ButtonWithBorder from '../../../components/frontend/ButtonWithBorder';
import { products } from '../../../test/products';
import { Link } from 'react-router-dom';
import { paymentByMoMo, paymentByZaloPay } from '../../../store/actions';
import { useDispatch } from 'react-redux';

export default function Review({ step, setStep, information, paymentMethod }) {
    const dispatch = useDispatch();

    const handlePlaceOrder = async () => {
        if (paymentMethod === 'COD') {
            alert('successfully');
            return;
        }
        if (paymentMethod === 'MOMO') {
            const result = await dispatch(
                paymentByMoMo({
                    orderInfo: 'Thanh toán đơn hàng OUTRUNNER',
                    amount: 200000,
                })
            );
            result && window.location.replace(result.payload.payUrl);
        }
        if (paymentMethod === 'ZALOPAY') {
            const result = await dispatch(
                paymentByZaloPay({
                    orderInfo: 'Thanh toán đơn hàng OUTRUNNER',
                    amount: 200000,
                })
            );

            result && window.location.replace(result.payload.order_url);
        }
    };
    return (
        <div
            className={`w-screen flex-shrink-0 px-4 md:px-32 ${step === 3 ? '' : 'hidden'}`}
        >
            <button
                onClick={() => setStep(step - 1)}
                className="mb-6 flex items-center"
            >
                <ChevronLeftIcon className="h-6 w-6 text-white" />
                <span className="text-lg font-bold text-white">Quay lại</span>
            </button>
            <div className="grid md:gap-16">
                <div>
                    <div className="h-fit bg-zinc-900/100 p-10">
                        <h1 className="text-lg font-bold text-white">
                            Thông tin giao hàng
                        </h1>
                        <div className="space-y-4 pt-4">
                            <div className="flex flex-col">
                                <span className="text-sm text-white">
                                    Email
                                </span>
                                <input
                                    type="email"
                                    required
                                    value={information.email}
                                    disabled
                                    autoComplete="0"
                                    placeholder="example@gmail.com"
                                    className="border-b-2 border-l-0 border-r-0 border-t-0 border-white bg-transparent pl-0 text-white placeholder:text-zinc-400 focus:border-magenta-500 focus:placeholder-transparent focus:ring-0 disabled:border-zinc-400 disabled:text-zinc-400"
                                />
                            </div>
                            <div className="flex max-sm:flex-col max-sm:space-y-3 sm:space-x-3">
                                <div className="flex flex-col sm:w-1/2">
                                    <span className="text-sm text-white">
                                        Tên người nhận
                                    </span>
                                    <input
                                        type="text"
                                        required
                                        value={information.fullname}
                                        disabled
                                        autoComplete="0"
                                        placeholder="E.g. Jonhan Strauss"
                                        className="border-b-2 border-l-0 border-r-0 border-t-0 border-white bg-transparent pl-0 text-white placeholder:text-zinc-400 focus:border-magenta-500 focus:placeholder-transparent focus:ring-0 disabled:border-zinc-400 disabled:text-zinc-400"
                                    />
                                </div>
                                <div className="flex flex-col sm:w-1/2">
                                    <span className="text-sm text-white">
                                        Số điện thoại
                                    </span>
                                    <input
                                        type="text"
                                        required
                                        disabled
                                        value={information.phonenumber}
                                        autoComplete="0"
                                        placeholder="E.g. 0123456789"
                                        className="border-b-2 border-l-0 border-r-0 border-t-0 border-white bg-transparent pl-0 text-white placeholder:text-zinc-400 focus:border-magenta-500 focus:placeholder-transparent focus:ring-0 disabled:border-zinc-400 disabled:text-zinc-400"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-sm text-white">
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
                    <div className="h-fit bg-zinc-900 p-10 text-white">
                        <div className="flow-root">
                            <ul className="checkout -my-2 h-60 divide-gray-200 overflow-y-scroll transition-colors duration-200 ease-out dark:divide-stone-700">
                                {products.map((product, index) => (
                                    <li key={index} className="flex py-4">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={product.imageSrc}
                                                alt={product.imageAlt}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>
                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                                    <h3 className="line-clamp-3 text-ellipsis">
                                                        <Link to={product.to}>
                                                            {product.name}
                                                        </Link>
                                                    </h3>
                                                    <p className="ml-4 text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                                        {product.price}
                                                    </p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500 transition-colors duration-200 ease-out dark:text-gray-300">
                                                    {product.color}
                                                </p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500 transition-colors duration-200 ease-out dark:text-gray-300">
                                                    Qty {product.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-6 flex py-4">
                            <div className="flex flex-1 flex-col">
                                <div className="flex justify-end space-x-5">
                                    <h1 className="text-md font-bold text-white">
                                        Phương thức thanh toán:
                                    </h1>
                                    {paymentMethod === 'COD' ? (
                                        <h1 className="text-md font-bold text-white">
                                            Thanh toán khi nhận hàng
                                        </h1>
                                    ) : (
                                        <div className="text-md flex space-x-2 text-white">
                                            <MastercardCard className="h-8 w-8" />
                                            <span className="text-white">
                                                Thẻ kết thúc bằng 9276
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="flex justify-between py-3 text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                        <h3>Tạm tính</h3>
                                        <p className="text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                            $122.00
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t-2">
                                    <div className="flex justify-between py-3 text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                        <h3>Phí giao hàng</h3>
                                        <p className="text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                            $5.00
                                        </p>
                                    </div>
                                    <div className="flex justify-between pb-3 text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                        <h3>Giảm giá</h3>
                                        <p className="text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                            $0.00
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t-2">
                                    <div className="flex  justify-between py-3 text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                        <h3>Tổng</h3>
                                        <p className="text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                            $127.00
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ButtonWithBorder
                        Title={'Đặt hàng'}
                        HandleClick={handlePlaceOrder}
                        className={'mt-4 w-full p-2 font-bold'}
                    />
                </div>
            </div>
        </div>
    );
}
