import { Dialog, Transition } from '@headlessui/react';
import {
    ArchiveBoxArrowDownIcon,
    CheckBadgeIcon,
    ChevronLeftIcon,
    HandThumbUpIcon,
    SparklesIcon,
    StarIcon,
    XCircleIcon,
} from '@heroicons/react/24/solid';
import { Fragment, useEffect, useRef, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router';

export default function OrderDetail() {
    //Kiem tra neu userId cua currentOrder co bang voi user dang dang nhap hien tai khong
    //neu co thi cho xem, khong thi cho ve lai trang profile.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const currentOrder = {
        cartId: '661f5aa782159dc99b8fb626',
        userId: '664088b2a63b863a605da30e',
        order_shipping: {
            ship_to: {
                phone: '00000000',
                gmail: 'gmail',
                name: 'anhtu',
                address: 'ssssss',
            },
        },
        user_payment: {},
        order_ids: {
            shop_discounts: [
                {
                    discountId: '665c9d0400a63805d8c252fb',
                    codeId: 'tutu',
                },
            ],
            item_products: [
                {
                    price: 200000,
                    quantity: 2,
                    sku_id: '66562ef484ce383484f8f076',
                    productId: '66562ef484ce383484f8f074',
                },
                {
                    price: 300000,
                    quantity: 2,
                    sku_id: '665637da84ce383484f8f13a',
                    productId: '665637da84ce383484f8f138',
                },
            ],
        },
    };
    const navigate = useNavigate();
    const [generatedReview, setGeneratedReview] = useState([]);
    useEffect(() => {
        setGeneratedReview(
            currentOrder.order_ids.item_products.map((item) => {
                return {
                    productId: item.productId,
                    orderId: '_ID CUA ORDER',
                    customerId: currentOrder.userId,
                    sKUId: item.sku_id,
                    price: item.price,
                    quantity: item.quantity,
                    ratingScore: 0,
                    ratingContent: '',
                };
            })
        );
    }, []);
    console.log(generatedReview);
    const handleReviewChange = (index, type, value) => {
        const slicedArray = generatedReview.slice();
        if (type === 'rating') {
            if (slicedArray[index].ratingScore === value) {
                slicedArray[index].ratingScore = 0;
            } else {
                slicedArray[index].ratingScore = value;
            }
        }
        if (type === 'content') {
            slicedArray[index].ratingContent = value;
        }
        setGeneratedReview(slicedArray);
    };
    const status = 'delivered';
    let [open, setOpen] = useState('');
    const [cancelContent, setCancelContent] = useState('');

    const cancelButtonRef = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const handleReview = () => {};
    return (
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 md:py-20 lg:px-8">
            <div className="py-4 text-white">
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center pl-0 text-gray-900 dark:text-white"
                >
                    <ChevronLeftIcon className="h-7 w-7 transition duration-500 ease-out group-hover:text-magenta-500" />
                    <span className="text-lg transition duration-500 ease-out group-hover:text-magenta-500">
                        Back
                    </span>
                </button>
                <div className="mt-2 text-white">
                    <div className="pointer-events-none my-6 flex w-full justify-center space-x-6 sm:space-x-10">
                        <div className="flex flex-col items-center space-y-1">
                            <div
                                className={`border-b-2 ${status === 'pending' || status === 'confirmed' || status === 'delivered' ? 'border-magenta-500 text-magenta-500' : 'border-gray-900 dark:border-white'} px-6 py-4 text-xl font-bold text-white transition duration-500 ease-out max-sm:px-4 max-sm:py-2`}
                            >
                                <ArchiveBoxArrowDownIcon
                                    className={`h-7 w-7 ${status === 'pending' || status === 'confirmed' || status === 'delivered' ? 'border-magenta-500 text-magenta-500' : 'text-gray-900 dark:text-white'}`}
                                />
                            </div>
                            <span className="text-sm font-bold text-gray-900 max-sm:text-xs dark:text-white">
                                Đơn đã đặt
                            </span>
                            <span className="text-sm font-bold text-zinc-400 max-sm:text-xs">
                                day here
                            </span>
                        </div>
                        <div className="flex flex-col items-center space-y-1">
                            <div
                                className={`border-b-2 ${status === 'confirmed' || status === 'delivered' ? 'border-magenta-500 text-magenta-500' : 'border-gray-900 dark:border-white'} px-6 py-4 text-xl font-bold text-white transition duration-500 ease-out max-sm:px-4 max-sm:py-2`}
                            >
                                <CheckBadgeIcon
                                    className={`h-7 w-7  ${status === 'confirmed' || status === 'delivered' ? 'border-magenta-500 text-magenta-500' : 'text-gray-900 dark:text-white'}`}
                                />
                            </div>
                            <span className="text-sm font-bold text-gray-900 max-sm:text-xs dark:text-white">
                                Đã xác nhận
                            </span>
                            <span className="text-sm font-bold text-zinc-400 max-sm:text-xs">
                                day here
                            </span>
                        </div>
                        <div className="flex flex-col items-center space-y-1">
                            <div
                                className={`border-b-2 ${status === 'delivered' ? 'border-magenta-500 text-magenta-500' : 'border-gray-900 dark:border-white'} px-6 py-4 text-xl font-bold text-white transition duration-500 ease-out max-sm:px-4 max-sm:py-2`}
                            >
                                <HandThumbUpIcon
                                    className={`h-7 w-7 ${status === 'delivered' ? 'border-magenta-500 text-magenta-500' : 'text-gray-900 dark:text-white'}`}
                                />
                            </div>
                            <span className="text-sm font-bold text-gray-900 max-sm:text-xs dark:text-white">
                                Đã nhận hàng
                            </span>
                            <span className="text-sm font-bold text-zinc-400 max-sm:text-xs">
                                day here
                            </span>
                        </div>
                    </div>
                    <div className="grid gap-5 py-5 sm:grid-cols-2">
                        <div className="flex flex-col text-gray-900 dark:text-white">
                            <div>Nguyen Le Anh Long</div>
                            <div>449 Kha Van Can</div>
                            <div>0934649521</div>
                        </div>

                        {status !== 'delivered' ? (
                            <div className="grid grid-cols-2 gap-x-4">
                                <button
                                    onClick={() => setOpen('delivered')}
                                    className="flex items-center justify-center space-x-1 border-2 border-gray-900 py-3 font-bold text-gray-900 transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 max-sm:text-sm dark:border-white dark:text-white"
                                >
                                    <span>Đã nhận hàng</span>
                                    <HandThumbUpIcon className="h-7 w-7" />
                                </button>
                                <button
                                    onClick={() => setOpen('cancelled')}
                                    className="flex items-center justify-center space-x-1 border-2 border-gray-900 py-3 font-bold text-gray-900 transition duration-500 ease-out hover:border-rose-500 hover:text-rose-500 max-sm:text-sm dark:border-white dark:text-white"
                                >
                                    <span>Hủy đơn hàng</span>
                                    <XCircleIcon className="h-7 w-7" />
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-x-4">
                                <div></div>
                                <button
                                    onClick={() => setOpen('review')}
                                    className="flex items-center justify-center space-x-1 border-2 border-gray-900 py-3 font-bold text-gray-900 transition duration-500 ease-out hover:border-xanthous-500 hover:text-xanthous-500 max-sm:text-sm dark:border-white dark:text-white"
                                >
                                    <span>Đánh giá</span>
                                    <SparklesIcon className="h-7 w-7" />
                                </button>
                            </div>
                        )}
                        <Transition.Root
                            show={
                                open === 'review' ||
                                open === 'cancelled' ||
                                open === 'delivered'
                                    ? true
                                    : false
                            }
                            as={Fragment}
                        >
                            <Dialog
                                as="div"
                                className="relative z-10"
                                initialFocus={cancelButtonRef}
                                onClose={() => null}
                            >
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-zinc-900 bg-opacity-75 transition-opacity" />
                                </Transition.Child>

                                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        >
                                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ">
                                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 dark:bg-zinc-800">
                                                    <div className="sm:flex sm:items-start">
                                                        <div className="mt-3 flex-1 text-center sm:mt-0 sm:text-left">
                                                            <Dialog.Title
                                                                as="h3"
                                                                className="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                                                            >
                                                                {open ===
                                                                'cancelled'
                                                                    ? 'Bạn có muốn hủy đơn hàng?'
                                                                    : open ===
                                                                        'delivered'
                                                                      ? 'Bạn có muốn xác nhận đã nhận hàng?'
                                                                      : open ===
                                                                          'review'
                                                                        ? 'Đánh giá đơn hàng'
                                                                        : ''}
                                                            </Dialog.Title>
                                                            <div className="mt-2 text-gray-900 dark:text-white">
                                                                {open ===
                                                                'cancelled' ? (
                                                                    <input
                                                                        type="text"
                                                                        value={
                                                                            cancelContent
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setCancelContent(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        placeholder="Lý do hủy đơn hàng"
                                                                        className="w-full border-b-2 border-l-0 border-r-0 border-t-0 border-gray-900 bg-transparent pl-0 text-gray-900 transition duration-300 ease-out focus:border-magenta-500 focus:ring-0 dark:border-white dark:text-white dark:placeholder:text-gray-400"
                                                                    />
                                                                ) : open ===
                                                                  'delivered' ? (
                                                                    'Bạn chỉ bấm xác nhận khi bạn đã nhận được sản phẩm và chắc chắn hài lòng.'
                                                                ) : open ===
                                                                  'review' ? (
                                                                    <div className="no-scrollbar grid h-96 gap-2 overflow-y-scroll">
                                                                        {generatedReview.map(
                                                                            (
                                                                                item,
                                                                                index
                                                                            ) => (
                                                                                <>
                                                                                    <div className="mt-2 grid rounded-md bg-zinc-500 p-4 shadow-inner shadow-zinc-800 dark:bg-zinc-800 dark:shadow-zinc-500">
                                                                                        <div className="flex w-full overflow-hidden border-b-2 border-zinc-600 p-4 sm:space-x-2">
                                                                                            <div className="h-fit w-32 overflow-hidden rounded-md">
                                                                                                <img
                                                                                                    src={
                                                                                                        'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'
                                                                                                    }
                                                                                                    className="object-contain object-center"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="flex flex-1 text-white">
                                                                                                <div className="flex flex-1 flex-col space-y-1 overflow-hidden px-2">
                                                                                                    <div className="flex">
                                                                                                        <div className="flex-1">
                                                                                                            <h1 className="line-clamp-2 truncate text-wrap text-sm font-bold max-sm:w-36 md:text-xl">
                                                                                                                anh
                                                                                                                long
                                                                                                                sieu
                                                                                                                dep
                                                                                                                trai,
                                                                                                                ngay
                                                                                                                mai
                                                                                                                an
                                                                                                                banh
                                                                                                                mi
                                                                                                                cong
                                                                                                                bun
                                                                                                                thiu
                                                                                                            </h1>
                                                                                                            <div className="text-md text-gray-300">
                                                                                                                Brand
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="text-md pt-2 ">
                                                                                                        Giá:{' '}
                                                                                                        <NumericFormat
                                                                                                            value={
                                                                                                                item.price
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
                                                                                                    </div>
                                                                                                    <div className="flex h-full flex-col justify-end">
                                                                                                        <span className="md:text-md font-bold">
                                                                                                            Số
                                                                                                            lượng:{' '}
                                                                                                            {
                                                                                                                item.quantity
                                                                                                            }
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="flex flex-row-reverse justify-center p-5">
                                                                                            <i
                                                                                                onClick={() =>
                                                                                                    handleReviewChange(
                                                                                                        index,
                                                                                                        'rating',
                                                                                                        5
                                                                                                    )
                                                                                                }
                                                                                                className={`peer mx-2 h-5 w-5 cursor-pointer ${item.ratingScore >= 5 ? 'text-yellow-500' : 'text-yellow-100'} hover:text-yellow-500 peer-hover:text-yellow-500`}
                                                                                            >
                                                                                                <StarIcon />
                                                                                            </i>
                                                                                            <i
                                                                                                onClick={() =>
                                                                                                    handleReviewChange(
                                                                                                        index,
                                                                                                        'rating',
                                                                                                        4
                                                                                                    )
                                                                                                }
                                                                                                className={`peer mx-2 h-5 w-5 cursor-pointer ${item.ratingScore >= 4 ? 'text-yellow-500' : 'text-yellow-100'} hover:text-yellow-500 peer-hover:text-yellow-500`}
                                                                                            >
                                                                                                <StarIcon />
                                                                                            </i>
                                                                                            <i
                                                                                                onClick={() =>
                                                                                                    handleReviewChange(
                                                                                                        index,
                                                                                                        'rating',
                                                                                                        3
                                                                                                    )
                                                                                                }
                                                                                                className={`peer mx-2 h-5 w-5 cursor-pointer ${item.ratingScore >= 3 ? 'text-yellow-500' : 'text-yellow-100'} hover:text-yellow-500 peer-hover:text-yellow-500`}
                                                                                            >
                                                                                                <StarIcon />
                                                                                            </i>
                                                                                            <i
                                                                                                onClick={() =>
                                                                                                    handleReviewChange(
                                                                                                        index,
                                                                                                        'rating',
                                                                                                        2
                                                                                                    )
                                                                                                }
                                                                                                className={`peer mx-2 h-5 w-5 cursor-pointer ${item.ratingScore >= 2 ? 'text-yellow-500' : 'text-yellow-100'} hover:text-yellow-500 peer-hover:text-yellow-500`}
                                                                                            >
                                                                                                <StarIcon />
                                                                                            </i>
                                                                                            <i
                                                                                                onClick={() =>
                                                                                                    handleReviewChange(
                                                                                                        index,
                                                                                                        'rating',
                                                                                                        1
                                                                                                    )
                                                                                                }
                                                                                                className={`peer mx-2 h-5 w-5 cursor-pointer ${item.ratingScore >= 1 ? 'text-yellow-500' : 'text-yellow-100'} hover:text-yellow-500 peer-hover:text-yellow-500`}
                                                                                            >
                                                                                                <StarIcon />
                                                                                            </i>
                                                                                        </div>
                                                                                        <input
                                                                                            type="text"
                                                                                            placeholder="Nội dung đánh giá"
                                                                                            value={
                                                                                                item.ratingContent
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                handleReviewChange(
                                                                                                    index,
                                                                                                    'content',
                                                                                                    e
                                                                                                        .target
                                                                                                        .value
                                                                                                )
                                                                                            }
                                                                                            className="w-full border-b-2 border-l-0 border-r-0 border-t-0 border-gray-900 bg-transparent pl-0 text-gray-900 transition duration-300 ease-out focus:border-magenta-500 focus:ring-0 dark:border-white dark:text-white dark:placeholder:text-gray-400"
                                                                                        />
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 px-4  py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-zinc-800">
                                                    {open === 'review' ||
                                                    open === 'cancelled' ||
                                                    open === 'delivered' ? (
                                                        <>
                                                            <button
                                                                type="button"
                                                                className="inline-flex w-full justify-center px-3 py-2 text-sm font-semibold text-white shadow-sm outline-none ring-2 ring-inset ring-white transition duration-500 ease-out hover:bg-magenta-500 hover:text-gray-900 hover:ring-magenta-500 sm:ml-3 sm:w-auto"
                                                                onClick={() => {
                                                                    if (
                                                                        open ===
                                                                        'review'
                                                                    ) {
                                                                        handleReview();
                                                                        return;
                                                                    }
                                                                    if (
                                                                        open ===
                                                                        'cancelled'
                                                                    ) {
                                                                        alert(
                                                                            'chay ham thay doi trang thai don hang o day'
                                                                        );
                                                                        return;
                                                                    }
                                                                    if (
                                                                        open ===
                                                                        'delivered'
                                                                    ) {
                                                                        alert(
                                                                            'chay ham thay doi trang thai don hang o day'
                                                                        );
                                                                        return;
                                                                    }
                                                                }}
                                                            >
                                                                Xác nhận
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="mt-3 inline-flex w-full justify-center px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm outline-none ring-2 ring-inset ring-white transition  duration-500 ease-out hover:bg-rose-500 hover:text-zinc-900 hover:ring-rose-500 sm:mt-0 sm:w-auto dark:text-white"
                                                                onClick={() => {
                                                                    setOpen('');
                                                                    setCancelContent(
                                                                        ''
                                                                    );
                                                                }}
                                                                ref={
                                                                    cancelButtonRef
                                                                }
                                                            >
                                                                Hủy
                                                            </button>
                                                        </>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition.Root>
                    </div>

                    <div className="mt-2 grid rounded-md bg-zinc-500 p-4 shadow-inner shadow-zinc-800 md:grid-cols-2 dark:bg-zinc-800 dark:shadow-zinc-500">
                        {currentOrder.order_ids.item_products.map((item) => (
                            <div key={item.productId}>
                                <div className="flex w-full overflow-hidden border-b-2 border-zinc-600 p-4 sm:space-x-2">
                                    <div className="h-fit w-32 overflow-hidden rounded-md">
                                        <img
                                            src={
                                                'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'
                                            }
                                            className="object-contain object-center"
                                        />
                                    </div>
                                    <div className="flex flex-1 text-white">
                                        <div className="flex flex-1 flex-col space-y-1 overflow-hidden px-2">
                                            <div className="flex">
                                                <div className="flex-1">
                                                    <h1 className="line-clamp-2 truncate text-wrap text-sm font-bold max-sm:w-36 md:text-xl">
                                                        anh long sieu dep trai,
                                                        ngay mai an banh mi cong
                                                        bun thiu
                                                    </h1>
                                                    <div className="text-md text-gray-300">
                                                        Brand
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-md pt-2 ">
                                                Giá:{' '}
                                                <NumericFormat
                                                    value={item.price}
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    decimalScale={0}
                                                    id="price"
                                                    suffix={'đ'}
                                                />
                                            </div>
                                            <div className="flex h-full flex-col justify-end">
                                                <span className="md:text-md font-bold">
                                                    Số lượng: {item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="grid justify-center gap-5 py-3 md:col-span-2 md:grid-cols-2">
                            <div className="grid justify-end font-bold"></div>
                            <div className="grid grid-cols-2 font-bold">
                                <span className="md:text-lg">Tạm tính</span>
                                <span className="md:text-lg">100.000.000đ</span>
                                <span className="md:text-lg">Giá giảm</span>
                                <span className="md:text-lg">0đ</span>
                                <span className="md:text-lg">Tổng</span>
                                <span className="md:text-lg">100.000.000đ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
