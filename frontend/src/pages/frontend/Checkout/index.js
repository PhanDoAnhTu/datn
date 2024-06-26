import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StepCount from './StepCount';

import Payment from './Payment';
import ButtonWithBorder from '../../../components/frontend/ButtonWithBorder';
import Review from './Review';
import { getSelectedListFromCart } from '../../../utils';
import {
    CheckIcon,
    ChevronLeftIcon,
    ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { NumericFormat } from 'react-number-format';
import { Listbox, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllDiscount,
    discountAmount,
} from '../../../store/actions/discount-actions';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import DocumentTitle from '../../../components/frontend/DocumentTitle';
import { findOneAddressByCustomerIdAndIsDefault } from '../../../store/actions';

export default function Checkout() {
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const { discount } = useSelector((state) => state.discountReducer);
    const { userInfo } = useSelector((state) => state.userReducer);
    const { addressDefault = null } = useSelector(
        (state) => state.addressReducer
    );

    useEffect(() => {
        dispatch(getAllDiscount());
    }, []);
    useEffect(() => {
        dispatch(
            findOneAddressByCustomerIdAndIsDefault({
                customer_id: userInfo._id,
                isDefault: true,
            })
        );
    }, []);

    const [email, setEmail] = useState(userInfo?.customer_email);
    const [fullname, setFullName] = useState(
        addressDefault ? addressDefault?.customer_name : ''
    );
    const [phonenumber, setPhoneNumber] = useState(
        addressDefault
            ? addressDefault?.phone_number
            : userInfo?.customer_phone
              ? userInfo?.customer_phone
              : ''
    );
    const [address, setAddress] = useState(
        addressDefault ? addressDefault?.street : ''
    );
    // const [cancelDiscount, setCancelDiscount] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [selectedProductFromCart] = useState(getSelectedListFromCart);
    const [price, setPrice] = useState(0);
    const [discounts, setDiscounts] = useState([]);

    const [price_discount_amount, setPrice_discount_amount] = useState(0);
    const [price_total, setprice_total] = useState(0);
    // const [dataOrder, setDataOrder] = useState(null)

    // eslint-disable-next-line no-unused-vars
    const [selectedDiscount, setSelectedDiscount] = useState(null);

    // const navigate = useNavigate();

    const handleNextStep = () => {
        if (
            email === '' ||
            fullname === '' ||
            phonenumber === '' ||
            address === ''
        ) {
            toast.error('Vui lòng nhập đầy đủ tông tin giao hàng.');
            return;
        }
        setStep(step + 1);
    };
    const onSelectedDiscount = async (selected_discount) => {
        setSelectedDiscount(selected_discount);
        // console.log(selected_discount, "code")
        if (selected_discount?.discount_code) {
            const applyDiscount = await dispatch(
                discountAmount({
                    userId: userInfo._id,
                    codeId: selected_discount.discount_code,
                    products: selectedProductFromCart,
                })
            );
            if (applyDiscount?.payload.status === (200 || 201)) {
                const { totalCheckout = price, discount = 0 } =
                    applyDiscount.payload.metaData;
                setprice_total(totalCheckout);
                setPrice_discount_amount(discount);
                setDiscounts([
                    {
                        discountId: selected_discount?._id,
                        codeId: selected_discount?.discount_code,
                    },
                ]);
            } else {
                toast.error('Mã giảm giá đã hết hạn hoặc số lượng dùng đã hết');
            }
            // console.log("applyDiscount", applyDiscount)
        } else {
            setDiscounts([]);
            setprice_total(price);
            setPrice_discount_amount(0);
        }
    };
    useEffect(() => {
        setPrice(
            selectedProductFromCart?.reduce(
                (accumulator, currentValue) =>
                    accumulator +
                    (currentValue.price_sale
                        ? currentValue.price_sale
                        : currentValue.price) *
                        currentValue.quantity,
                0
            )
        );
    }, [selectedProductFromCart]);
    useEffect(() => {
        setprice_total(price);
    }, [price]);
    // console.log('test1:', discount);
    // console.log('currentDiscount', selectedDiscount);

    return (
        <div className="overflow-hidden pb-7 pt-10 md:pt-24">
            <DocumentTitle title="Thanh toán" />

            <Link
                to={`/`}
                className="mb-6 ml-20 flex items-center text-gray-900 dark:text-white"
            >
                <ChevronLeftIcon className="h-6 w-6" />
                <span className="text-lg font-bold">Quay lại trang chủ</span>
            </Link>
            <StepCount step={step} />

            <div
                className={`flex ${step === 2 ? '-translate-x-full' : step === 3 ? '-translate-x-2full' : ''} transition duration-500 ease-out`}
            >
                <div className="w-screen flex-shrink-0 px-1 md:px-32">
                    <div className="grid gap-16 sm:px-4 xl:grid-cols-2">
                        <div className="h-fit rounded-md bg-white p-10 text-white shadow-md dark:bg-zinc-900 dark:shadow-inner dark:shadow-white/25">
                            <div className="flow-root">
                                <ul className="-my-6 divide-gray-200 transition-colors duration-200 ease-out dark:divide-stone-700">
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
                                                    <div className="ml-3 flex flex-1 flex-col">
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
                                                                <p className=" text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                                                    {product.price_sale ? (
                                                                        <NumericFormat
                                                                            value={
                                                                                product.price_sale
                                                                            }
                                                                            displayType="text"
                                                                            thousandSeparator={
                                                                                true
                                                                            }
                                                                            decimalScale={
                                                                                0
                                                                            }
                                                                            id="price"
                                                                            suffix={
                                                                                'đ'
                                                                            }
                                                                        />
                                                                    ) : (
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
                                                                            suffix={
                                                                                'đ'
                                                                            }
                                                                        />
                                                                    )}
                                                                </p>
                                                                {product.price_sale && (
                                                                    <s className="ml-2 text-red-500">
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
                                                                            suffix={
                                                                                'đ'
                                                                            }
                                                                        />
                                                                    </s>
                                                                )}
                                                            </div>
                                                            <div className="mt-1 text-sm text-gray-500 transition-colors duration-200 ease-out dark:text-gray-300">
                                                                {product.product_option.map(
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
                                                                {
                                                                    product.quantity
                                                                }
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
                                    <div>
                                        <div className={` mt-2 pt-2`}>
                                            <div
                                                className={`mb-4 border-x-0 border-b-2 border-t-0 transition duration-500 ease-out dark:border-white`}
                                            >
                                                <Listbox
                                                    value={selectedDiscount}
                                                    onChange={(e) =>
                                                        onSelectedDiscount(e)
                                                    }
                                                >
                                                    <div className="relative mt-1 ">
                                                        <Listbox.Button className="relative w-full cursor-default py-2 pl-5 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-magenta-300 ui-disabled:brightness-50 sm:text-sm ">
                                                            <span className="block truncate font-semibold text-gray-900 dark:text-white">
                                                                {selectedDiscount ==
                                                                null
                                                                    ? 'Mã giảm giá'
                                                                    : `${
                                                                          discount
                                                                              ?.slice()
                                                                              .find(
                                                                                  (
                                                                                      item
                                                                                  ) =>
                                                                                      item.discount_code ===
                                                                                      selectedDiscount.discount_code
                                                                              )
                                                                              .discount_code
                                                                      } | ${
                                                                          discount
                                                                              ?.slice()
                                                                              .find(
                                                                                  (
                                                                                      item
                                                                                  ) =>
                                                                                      item.discount_code ===
                                                                                      selectedDiscount.discount_code
                                                                              )
                                                                              .discount_description
                                                                      }`}
                                                            </span>
                                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                <ChevronUpIcon
                                                                    className="h-5 w-5 text-gray-700 transition duration-200 ease-out ui-open:rotate-180 dark:text-white"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        </Listbox.Button>
                                                        <Transition
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto  bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                                <Listbox.Option
                                                                    className={({
                                                                        active,
                                                                    }) =>
                                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                            active
                                                                                ? 'bg-magenta-900    text-zinc-700'
                                                                                : 'text-gray-900'
                                                                        }`
                                                                    }
                                                                    value={null}
                                                                >
                                                                    {({
                                                                        selected,
                                                                    }) => (
                                                                        <>
                                                                            <span
                                                                                className={`block truncate ${
                                                                                    selected
                                                                                        ? 'font-medium'
                                                                                        : 'font-normal'
                                                                                }`}
                                                                            >
                                                                                Không
                                                                                áp
                                                                                dụng
                                                                            </span>
                                                                            {selected ? (
                                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-magenta-600">
                                                                                    <CheckIcon
                                                                                        className="h-5 w-5"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                                {discount &&
                                                                    discount?.map(
                                                                        (
                                                                            item
                                                                        ) => (
                                                                            <Listbox.Option
                                                                                key={
                                                                                    item.discount_code
                                                                                }
                                                                                disabled={
                                                                                    dayjs(
                                                                                        item.discount_start_date
                                                                                    ).diff(
                                                                                        dayjs(),
                                                                                        'millisecond'
                                                                                    ) <
                                                                                        0 &&
                                                                                    dayjs(
                                                                                        item.discount_end_date
                                                                                    ).diff(
                                                                                        dayjs(),
                                                                                        'millisecond'
                                                                                    ) >
                                                                                        0
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                className={({
                                                                                    active,
                                                                                }) =>
                                                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                                        active
                                                                                            ? 'bg-magenta-900    text-zinc-700'
                                                                                            : 'text-gray-900'
                                                                                    } ui-disabled:opacity-50`
                                                                                }
                                                                                value={
                                                                                    item
                                                                                }
                                                                            >
                                                                                {({
                                                                                    selected,
                                                                                }) => (
                                                                                    <>
                                                                                        <span
                                                                                            className={`block truncate ${
                                                                                                selected
                                                                                                    ? 'font-medium'
                                                                                                    : 'font-normal'
                                                                                            }`}
                                                                                        >
                                                                                            {
                                                                                                item.discount_code
                                                                                            }
                                                                                        </span>
                                                                                        <span
                                                                                            className={`block truncate ${
                                                                                                selected
                                                                                                    ? 'font-medium'
                                                                                                    : 'font-normal'
                                                                                            }`}
                                                                                        >
                                                                                            {
                                                                                                item.discount_description
                                                                                            }
                                                                                        </span>
                                                                                        <span
                                                                                            className={`block truncate ${
                                                                                                selected
                                                                                                    ? 'font-medium'
                                                                                                    : 'font-normal'
                                                                                            }`}
                                                                                        >
                                                                                            Giá
                                                                                            trị
                                                                                            đơn
                                                                                            hàng
                                                                                            tối
                                                                                            thiểu:{' '}
                                                                                            <NumericFormat
                                                                                                value={
                                                                                                    item.discount_min_order_value
                                                                                                }
                                                                                                displayType="text"
                                                                                                thousandSeparator={
                                                                                                    true
                                                                                                }
                                                                                                decimalScale={
                                                                                                    0
                                                                                                }
                                                                                                id="price"
                                                                                                suffix={
                                                                                                    'đ'
                                                                                                }
                                                                                            />
                                                                                        </span>
                                                                                        {selected ? (
                                                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-magenta-600">
                                                                                                <CheckIcon
                                                                                                    className="h-5 w-5"
                                                                                                    aria-hidden="true"
                                                                                                />
                                                                                            </span>
                                                                                        ) : null}
                                                                                    </>
                                                                                )}
                                                                            </Listbox.Option>
                                                                        )
                                                                    )}
                                                            </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </Listbox>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between py-3 text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                            <h3>Tạm tính</h3>
                                            <p className="text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                                <NumericFormat
                                                    value={price}
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
                                            <h3>Giảm giá</h3>
                                            <p className="text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                                <NumericFormat
                                                    value={
                                                        price_discount_amount
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
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="h-fit rounded-md bg-white p-10 shadow-md dark:bg-zinc-900 dark:shadow-inner dark:shadow-white/25">
                                <div className="flex space-x-4">
                                    <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                                        Thông tin giao hàng
                                    </h1>
                                    {/* <button className="bg-white px-2 py-2 text-xs font-bold text-black transition duration-500 ease-out hover:bg-magenta-500 hover:text-white">
                                        Thay đổi
                                    </button> */}
                                </div>
                                <div className="space-y-4 pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-900 dark:text-white">
                                            Email
                                        </span>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            autoComplete="0"
                                            placeholder="example@gmail.com"
                                            className="border-b-2 border-l-0 border-r-0 border-t-0 border-gray-900 bg-transparent pl-0 text-gray-900 placeholder:text-zinc-400 focus:border-magenta-500 focus:placeholder-transparent focus:ring-0 dark:border-white dark:text-white"
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
                                                value={fullname}
                                                onChange={(e) =>
                                                    setFullName(e.target.value)
                                                }
                                                autoComplete="0"
                                                placeholder="E.g. Jonhan Strauss"
                                                className="border-b-2 border-l-0 border-r-0 border-t-0 border-gray-900 bg-transparent pl-0 text-gray-900 placeholder:text-zinc-400 focus:border-magenta-500 focus:placeholder-transparent focus:ring-0 dark:border-white dark:text-white"
                                            />
                                        </div>
                                        <div className="flex flex-col sm:w-1/2">
                                            <span className="text-sm text-gray-900 dark:text-white">
                                                Số điện thoại
                                            </span>
                                            <input
                                                type="text"
                                                required
                                                value={phonenumber}
                                                onChange={(e) =>
                                                    setPhoneNumber(
                                                        e.target.value
                                                    )
                                                }
                                                autoComplete="0"
                                                placeholder="E.g. 0123456789"
                                                className="border-b-2 border-l-0 border-r-0 border-t-0 border-gray-900 bg-transparent pl-0 text-gray-900 placeholder:text-zinc-400 focus:border-magenta-500 focus:placeholder-transparent focus:ring-0 dark:border-white dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-900 dark:text-white">
                                            Địa chỉ giao hàng
                                        </span>
                                        <input
                                            type="text"
                                            required
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                            autoComplete="0"
                                            placeholder="E.g. 1000 Test street, block b, TP HCM"
                                            className="border-b-2 border-l-0 border-r-0 border-t-0 border-gray-900 bg-transparent pl-0 text-gray-900 placeholder:text-zinc-400 focus:border-magenta-500 focus:placeholder-transparent focus:ring-0 dark:border-white dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <ButtonWithBorder
                                    HandleClick={handleNextStep}
                                    className={'w-full py-2 font-bold'}
                                    Title={'Tiếp theo'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Payment
                    step={step}
                    setStep={setStep}
                    information={{ email, fullname, phonenumber, address }}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                />
                <Review
                    setStep={setStep}
                    step={step}
                    discounts={discounts}
                    information={{
                        email,
                        fullname,
                        phonenumber,
                        address,
                        price_discount_amount,
                        price_total,
                    }}
                    paymentMethod={paymentMethod}
                />
            </div>
        </div>
    );
}
