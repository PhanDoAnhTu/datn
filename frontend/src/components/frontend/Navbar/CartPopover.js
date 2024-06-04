import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartPopoverItem from './CartPopoverItem';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCart,
    UpdateFromCart,
    DeleteToCartItem,
} from '../../../store/actions';
import { ShoppingBagIcon } from '@heroicons/react/20/solid';
// import { getCartFromLocalStorage } from '../../../utils';

export default function CartPopover({ Button }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { userInfo } = useSelector((state) => state.userReducer)
    const { cart } = useSelector((state) => state.cartReducer)
    const [selectedProductFromCart, setSelectedProductFromCart] = useState([])

    const checkedSelectedProductFromCart = async (sku) => {
        if (!selectedProductFromCart.some(({ sku_id }) => sku_id == sku.sku_id)) {
            setSelectedProductFromCart(selectedProductFromCart.push(sku))
        }
    }
    const cancelSelectedProductFromCart = async (sku) => {
        setSelectedProductFromCart((old_value) => old_value.filter(({ sku_id }) => sku_id == sku.sku_id))
    }
    const changeSelectedProductFromCart = async (type, sku) => {
        if (type == "all_checked") {
            console.lohg("all")
        }
        if (type == "checked") {
            checkedSelectedProductFromCart(sku)
        }
        if (type == "cancel") {
            cancelSelectedProductFromCart(sku)
        }
        console.log('selectedProductFromCart', selectedProductFromCart)
    }

    // useEffect(() => {
    //     cart && (
    //         getCartFromLocalStorage().toString() !== cart.cart_products.toString() && dispatch(getCart({ userId: userInfo._id }))
    //     )
    // }, [cart])

    const updateOrDeleteItemFromCart = async (type, data) => {
        if (type === 'deleteItem') {
            const { productId, sku_id } = data;
            dispatch(
                DeleteToCartItem({
                    userId: userInfo._id,
                    productId: productId,
                    sku_id: sku_id,
                })
            );
            // removeCartItemFromLocalStorage(
            //     {
            //         productId: productId,
            //         sku_id: sku_id
            //     }
            // )
        }
        if (type === 'updateItem') {
            const { productId, sku_id, sku_id_old, quantity, old_quantity } =
                data;

            console.log(productId, sku_id, sku_id_old, quantity, old_quantity);
            dispatch(
                UpdateFromCart({
                    userId: userInfo._id,
                    shop_order_ids: {
                        item_products: {
                            productId: productId,
                            sku_id: sku_id,
                            sku_id_old: sku_id_old,
                            quantity: quantity,
                            old_quantity: old_quantity,
                        },
                    },
                })
            );
        }
        dispatch(getCart({ userId: userInfo._id }));
    };
    const OpenCart = async () => {
        // dispatch(getCart({ userId: userInfo._id }));
        setOpen(true);
    };
    console.log(cart);

    useEffect(() => {
        if (userInfo) {
            !cart && dispatch(getCart({ userId: userInfo._id }));
        }
    }, [cart]);
    // console.log('cart', cart)
    return (
        <div className="ml-4 flow-root lg:ml-6">
            <div className="relative" onClick={() => OpenCart()}>
                {Button}
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-20" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-stone-100  shadow-xl transition-all duration-200 ease-out dark:bg-zinc-950">
                                            {cart &&
                                            cart.cart_products?.length !== 0 ? (
                                                <>
                                                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                                        <div className="flex items-start justify-between">
                                                            <Dialog.Title className="text-lg font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                                                Giỏ hàng (
                                                                {cart &&
                                                                    cart
                                                                        .cart_products
                                                                        .length}
                                                                )
                                                            </Dialog.Title>

                                                            <div className="ml-3 flex h-7 items-center">
                                                                <button
                                                                    type="button"
                                                                    className="relative -m-2 p-2 text-gray-400 transition-colors duration-200 ease-out hover:text-gray-500 dark:text-white dark:hover:text-gray-500"
                                                                    onClick={() =>
                                                                        setOpen(
                                                                            false
                                                                        )
                                                                    }
                                                                >
                                                                    <span className="absolute -inset-0.5" />
                                                                    <span className="sr-only">
                                                                        Close
                                                                        panel
                                                                    </span>
                                                                    <XMarkIcon
                                                                        className="h-6 w-6"
                                                                        aria-hidden="true"
                                                                    />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 flex max-w-full justify-start">
                                                            <Dialog.Title className="font-small text-sm text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                                                Chọn tất cả
                                                                <input
                                                                    type="checkbox"
                                                                    className="ml-2 border-0 px-2 py-2 checked:bg-magenta-500 checked:hover:bg-magenta-400 focus:border-0 focus:ring-0 checked:focus:bg-magenta-400"
                                                                />
                                                            </Dialog.Title>
                                                        </div>

                                                        <div className="mt-8">
                                                            <div className="flow-root">
                                                                <ul className="-my-6 divide-y divide-gray-200 transition-colors duration-200 ease-out dark:divide-stone-700">
                                                                    {cart &&
                                                                        cart.cart_products.map(
                                                                            (
                                                                                product,
                                                                                index
                                                                            ) => (
                                                                                <CartPopoverItem
                                                                                    product={
                                                                                        product
                                                                                    }
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    update={
                                                                                        updateOrDeleteItemFromCart
                                                                                    }
                                                                                    checkbox={changeSelectedProductFromCart}
                                                                                />
                                                                            )
                                                                        )}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6 dark:border-stone-700">
                                                        <div className="flex justify-between text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                                            <p>Tạm tính</p>
                                                            <p>$262.00</p>
                                                        </div>
                                                        <p className="mt-0.5 text-sm text-gray-500 transition-colors duration-200 ease-out dark:text-gray-300">
                                                            Phí ship sẽ được
                                                            tính lúc thanh toán.
                                                        </p>
                                                        <div className="mt-6">
                                                            <button
                                                                onClick={() => {
                                                                    navigate(
                                                                        '/checkout'
                                                                    );
                                                                    setOpen(
                                                                        false
                                                                    );
                                                                }}
                                                                disabled={false}
                                                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-magenta-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-magenta-700 disabled:pointer-events-none disabled:opacity-50"
                                                            >
                                                                Thanh toán
                                                            </button>
                                                        </div>
                                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500 dark:text-gray-300">
                                                            <p>
                                                                hoặc{' '}
                                                                <button
                                                                    type="button"
                                                                    className="font-medium text-magenta-600 hover:text-magenta-500"
                                                                    onClick={() =>
                                                                        setOpen(
                                                                            false
                                                                        )
                                                                    }
                                                                >
                                                                    Tiếp tục mua
                                                                    sắm
                                                                    <span aria-hidden="true">
                                                                        {' '}
                                                                        &rarr;
                                                                    </span>
                                                                </button>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="relative flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                                    <div className="flex items-start justify-end">
                                                        <div className="ml-3 flex h-7 items-center">
                                                            <button
                                                                type="button"
                                                                className="relative -m-2 p-2 text-gray-400 transition-colors duration-200 ease-out hover:text-gray-500 dark:text-white dark:hover:text-gray-500"
                                                                onClick={() =>
                                                                    setOpen(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                <span className="absolute -inset-0.5" />
                                                                <span className="sr-only">
                                                                    Close panel
                                                                </span>
                                                                <XMarkIcon
                                                                    className="h-6 w-6"
                                                                    aria-hidden="true"
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="relative h-4/5">
                                                        <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center text-gray-900 dark:text-white">
                                                            <ShoppingBagIcon className="h-24 w-24" />
                                                            <span className="text-xl font-bold">
                                                                Giỏ hàng trống
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
}
