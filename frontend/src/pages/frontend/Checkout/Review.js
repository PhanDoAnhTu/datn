import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import MastercardCard from '../../../assets/frontend/svg/MastercardCard.svg?react';
import ButtonWithBorder from '../../../components/frontend/ButtonWithBorder';
import { products } from '../../../test/products';
import { Link } from 'react-router-dom';

export default function Review({ step, setStep, information, paymentMethod }) {
    const handlePlaceOrder = () => {
        //a progression that will upload order on the DB
        //Then, set an alert with a timer to display that user has been placed order successfully
        //After 2-3 secs, run a function that will retrieve id of the order above
        //Then, navigate user to profile/order with the id retrieved
        alert('successfully');
    };
    return (
        <div className="w-screen flex-shrink-0 px-4 max-sm:px-1 md:px-32">
            <button
                onClick={() => setStep(step - 1)}
                className="mb-6 flex items-center"
            >
                <ChevronLeftIcon className="h-6 w-6 text-white" />
                <span className="text-lg font-bold text-white">Back</span>
            </button>
            <div className="mdgap-16 grid xl:grid-cols-2">
                <div>
                    <div className="h-fit bg-zinc-900/100 p-10">
                        <h1 className="text-lg font-bold text-white">
                            Shipping information
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
                                        Full name
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
                                        Phone number
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
                                    Shipping address
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
                    <div className="mt-5 h-fit bg-zinc-900/100 p-10">
                        <div className="flex justify-between">
                            <h1 className="text-lg font-bold text-white">
                                Payment method
                            </h1>
                            {paymentMethod === 0 ? (
                                <h1 className="text-lg font-bold text-white">
                                    Cash on delivery
                                </h1>
                            ) : (
                                <div className="flex space-x-2 text-lg text-white">
                                    <MastercardCard className="h-8 w-8" />
                                    <span className="text-white">
                                        Card ending in 9276
                                    </span>
                                </div>
                            )}
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
                                <div>
                                    <div className="flex justify-between py-3 text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                        <h3>Subtotal</h3>
                                        <p className="text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                            $122.00
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t-2">
                                    <div className="flex justify-between py-3 text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                        <h3>Shipping</h3>
                                        <p className="text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                            $5.00
                                        </p>
                                    </div>
                                    <div className="flex justify-between pb-3 text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                        <h3>Discount</h3>
                                        <p className="text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                            $0.00
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t-2">
                                    <div className="flex  justify-between py-3 text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                        <h3>Total due</h3>
                                        <p className="text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                                            $127.00
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ButtonWithBorder
                        Title={'Place order'}
                        HandleClick={handlePlaceOrder}
                        className={'mt-4 w-full p-2 font-bold'}
                    />
                </div>
            </div>
        </div>
    );
}
