import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import ButtonWithBorder from '../../../components/frontend/ButtonWithBorder';

export default function Payment({
    step,
    setStep,
    information,
    paymentMethod,
    setPaymentMethod,
}) {
    const handleNextStep = () => {
        setStep(step + 1);
    };

    return (
        <div className={`w-screen flex-shrink-0 px-4 md:px-32`}>
            <button
                onClick={() => setStep(step - 1)}
                className="mb-6 flex items-center"
            >
                <ChevronLeftIcon className="h-6 w-6 text-white" />
                <span className="text-lg font-bold text-white">Quay lại</span>
            </button>
            <div className="grid gap-16 xl:grid-cols-2">
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
                </div>
                <div>
                    <div className="h-fit bg-zinc-900/100 p-10">
                        <h1 className="text-lg font-bold text-white">
                            Payment method
                        </h1>
                        <div className="space-y-4 pt-4">
                            <div>
                                <div
                                    className="flex cursor-pointer justify-between text-white"
                                    onClick={() => setPaymentMethod('COD')}
                                >
                                    <span className="pointer-events-none">
                                        Thanh toán khi nhận hàng
                                    </span>
                                    <input
                                        type="checkbox"
                                        className="pointer-events-none rounded-full border-0 focus:ring-0"
                                        checked={paymentMethod === 'COD'}
                                    />
                                </div>
                            </div>

                            <div>
                                <div
                                    className="flex cursor-pointer justify-between text-white"
                                    onClick={() => setPaymentMethod('MOMO')}
                                >
                                    <span className="pointer-events-none">
                                        Thanh toán qua MoMo
                                    </span>
                                    <input
                                        type="checkbox"
                                        className="pointer-events-none rounded-full border-0 focus:ring-0"
                                        checked={paymentMethod === 'MOMO'}
                                    />
                                </div>
                            </div>
                            <div>
                                <div
                                    className="flex cursor-pointer justify-between text-white"
                                    onClick={() => setPaymentMethod('ZALOPAY')}
                                >
                                    <span className="pointer-events-none">
                                        Thanh toán qua ZaloPay
                                    </span>
                                    <input
                                        type="checkbox"
                                        className="pointer-events-none rounded-full border-0 focus:ring-0"
                                        checked={paymentMethod === 'ZALOPAY'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ButtonWithBorder
                        Title={'Tiếp theo'}
                        HandleClick={handleNextStep}
                        className={'mt-4 w-full p-2 font-bold'}
                    />
                </div>
            </div>
        </div>
    );
}
