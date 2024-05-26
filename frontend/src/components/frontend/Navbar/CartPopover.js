import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartPopoverItem from './CartPopoverItem';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, UpdateFromCart, DeleteToCartItem } from '../../../store/actions';



export default function CartPopover({ Button }) {
    const [open, setOpen] = useState(false);

    const { cart } = useSelector((state) => state.cartReducer);
    const dispatch = useDispatch();
    const [updateCartState, SetUpdateCartState] = useState(false)
    useEffect(() => {
        if (!cart) {
            dispatch(getCart({ userId: "6640aa39e94a253a84a5c605" }));
        }
    }, [cart]);

    useEffect(() => {
        dispatch(getCart({ userId: "6640aa39e94a253a84a5c605" }));
    }, [updateCartState]);
    const updateOrDeleteItemFromCart = async (type, data) => {
        if (type === "deleteItem") {
            const { productId } = data
            await dispatch(DeleteToCartItem({
                userId: "6640aa39e94a253a84a5c605",
                productId: productId
            }))
            SetUpdateCartState(!updateCartState)
        }
        if (type === "updateItem") {
            const { productId, sku_id, quantity, old_quantity } = data

            await dispatch(UpdateFromCart({
                userId: "6640aa39e94a253a84a5c605",
                shop_order_ids: {
                    item_products: {
                        productId: productId,
                        sku_id: sku_id,
                        quantity: quantity,
                        old_quantity: old_quantity
                    }

                }
            }));
            SetUpdateCartState(!updateCartState)
        }


    }

    // console.log('cart', cart)

    return (
        <div className="ml-4 flow-root lg:ml-6">
            <div className="relative" onClick={() => setOpen(true)}>
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
                                        <div className="flex h-full flex-col overflow-y-scroll bg-stone-100  shadow-xl transition-all duration-200 ease-out dark:bg-licorice-400">
                                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                                        Shopping cart
                                                    </Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="relative -m-2 p-2 text-gray-400 transition-colors duration-200 ease-out hover:text-gray-500 dark:text-white dark:hover:text-gray-500"
                                                            onClick={() =>
                                                                setOpen(false)
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

                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        <ul className="-my-6 divide-y divide-gray-200 transition-colors duration-200 ease-out dark:divide-stone-700">
                                                            {cart && cart.cart_products.map(
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
                                                                        update={updateOrDeleteItemFromCart}
                                                                    />
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 dark:border-stone-700">
                                                <div className="flex justify-between text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                                    <p>Subtotal</p>
                                                    <p>$262.00</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500 transition-colors duration-200 ease-out dark:text-gray-300">
                                                    Shipping and taxes
                                                    calculated at checkout.
                                                </p>
                                                <div className="mt-6">
                                                    <Link
                                                        to="/checkout"
                                                        onClick={() =>
                                                            setOpen(false)
                                                        }
                                                        className="flex items-center justify-center rounded-md border border-transparent bg-magenta-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-magenta-700"
                                                    >
                                                        Checkout
                                                    </Link>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500 dark:text-gray-300">
                                                    <p>
                                                        or{' '}
                                                        <button
                                                            type="button"
                                                            className="font-medium text-magenta-600 hover:text-magenta-500"
                                                            onClick={() =>
                                                                setOpen(false)
                                                            }
                                                        >
                                                            Continue Shopping
                                                            <span aria-hidden="true">
                                                                {' '}
                                                                &rarr;
                                                            </span>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>
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
