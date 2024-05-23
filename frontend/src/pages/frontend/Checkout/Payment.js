import { Fragment, useState } from 'react';
import MastercardCard from '../../../assets/frontend/svg/MastercardCard.svg?react';
import VisaCard from '../../../assets/frontend/svg/VisaCard.svg?react';
import {
    ChevronLeftIcon,
    ChevronUpIcon,
    CheckIcon,
} from '@heroicons/react/24/solid';
import ButtonWithBorder from '../../../components/frontend/ButtonWithBorder';
import { Listbox, Transition } from '@headlessui/react';
import { payments } from '../../../test/payments';

export default function Payment({
    step,
    setStep,
    information,
    paymentMethod,
    setPaymentMethod,
    cardNumber,
    nameOnCard,
    expireMonth,
    expireYear,
    securityCode,
    setCardNumber,
    setNameOnCard,
    setExpireMonth,
    setExpireYear,
    setSecurityCode,
}) {
    const [selectedCard, setSelectedCard] = useState(payments[0]);

    const handleSelectedCardChange = (e) => {
        setSelectedCard(payments.find((i) => i.id === e));
        setCardNumber(payments.find((i) => i.id === e).cardNumber);
        setNameOnCard(payments.find((i) => i.id === e).cardHolder);
        setExpireMonth(payments.find((i) => i.id === e).expirationMonth);
        setExpireYear(payments.find((i) => i.id === e).expirationYear);
        setSecurityCode(payments.find((i) => i.id === e).cvv);
    };
    const handleNextStep = () => {
        if (
            cardNumber === '' ||
            nameOnCard === '' ||
            expireMonth === '' ||
            expireYear === '' ||
            securityCode === ''
        ) {
            alert('khong dc trong');
            return;
        }
        setStep(step + 1);
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
                                    onClick={() => setPaymentMethod(0)}
                                >
                                    <span className="pointer-events-none">
                                        Cash on delivery
                                    </span>
                                    <input
                                        type="checkbox"
                                        className="pointer-events-none rounded-full border-0 focus:ring-0"
                                        checked={paymentMethod === 0}
                                    />
                                </div>
                            </div>
                            <div>
                                <div
                                    className="flex cursor-pointer justify-between text-white"
                                    onClick={() => setPaymentMethod(1)}
                                >
                                    <span className="pointer-events-none">
                                        Credit card
                                    </span>
                                    <input
                                        type="checkbox"
                                        className="pointer-events-none rounded-full border-0 focus:ring-0"
                                        checked={paymentMethod === 1}
                                    />
                                </div>
                                <div
                                    className={`${paymentMethod === 1 ? 'block' : 'hidden'} mt-2 border-t-2 pt-2`}
                                >
                                    <div
                                        className={`mb-4 border-x-0 border-b-2 border-t-0 transition duration-500 ease-out dark:border-white`}
                                    >
                                        <Listbox
                                            value={selectedCard}
                                            onChange={(e) =>
                                                handleSelectedCardChange(e.id)
                                            }
                                        >
                                            <div className="relative mt-1 ">
                                                <Listbox.Button className="relative w-full cursor-default py-2 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-magenta-300 ui-disabled:brightness-50 sm:text-sm ">
                                                    <span className="block truncate text-white">
                                                        {
                                                            selectedCard.cardNumber
                                                        }
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
                                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-zinc-900 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm dark:bg-white">
                                                        {payments.map(
                                                            (card, cardId) => (
                                                                <Listbox.Option
                                                                    key={cardId}
                                                                    className={({
                                                                        active,
                                                                    }) =>
                                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                            active
                                                                                ? 'bg-magenta-900    text-zinc-700'
                                                                                : 'text-gray-900'
                                                                        }`
                                                                    }
                                                                    value={card}
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
                                                                                    card.cardNumber
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
                                                                                    card.cardHolder
                                                                                }
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
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="flex flex-none flex-col -space-y-2">
                                            <div className="flex h-8 justify-between">
                                                <span className="text-white">
                                                    Name on card
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                value={nameOnCard}
                                                onChange={(e) => {
                                                    const re = /^[0-9\b]+$/;
                                                    if (
                                                        e.target.value === '' ||
                                                        !re.test(e.target.value)
                                                    ) {
                                                        setNameOnCard(
                                                            e.target.value
                                                        );
                                                    }
                                                }}
                                                placeholder="E.g. JONHAN STRAUSS"
                                                className="text-md border-l-0 border-r-0 border-t-0 border-white bg-transparent pb-1 pl-0 pr-0 text-black transition duration-500 ease-out placeholder:text-zinc-700 focus:border-magenta-500 focus:outline-none focus:ring-0 dark:text-white"
                                            />
                                        </div>
                                        <div className="flex flex-none flex-col -space-y-2">
                                            <div className="flex h-8 justify-between">
                                                <span className="text-white">
                                                    Card number
                                                </span>
                                                <div className="justify-centers flex items-center space-x-2">
                                                    <MastercardCard
                                                        className={`h-8 w-8 ${!cardNumber ? 'block' : cardNumber.slice(0, 1) === '5' ? 'block' : 'hidden'}`}
                                                    />
                                                    <VisaCard
                                                        className={`h-8 w-8 ${!cardNumber ? 'block' : cardNumber.slice(0, 1) === '4' ? 'block' : 'hidden'}`}
                                                    />
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                value={cardNumber}
                                                onChange={(e) => {
                                                    const re = /^[0-9\b]+$/;
                                                    if (
                                                        e.target.value === '' ||
                                                        re.test(e.target.value)
                                                    ) {
                                                        setCardNumber(
                                                            e.target.value
                                                        );
                                                    }
                                                }}
                                                placeholder="XXXX-XXXX-XXXX-XXXX"
                                                className="text-md border-l-0 border-r-0 border-t-0 border-white bg-transparent pb-1 pl-0 pr-0 text-black transition duration-500 ease-out placeholder:text-zinc-700 focus:border-magenta-500 focus:outline-none focus:ring-0 dark:text-white"
                                                maxLength={16}
                                            />
                                        </div>
                                        <div className="flex flex-none flex-col -space-y-2">
                                            <div className="flex h-8 justify-between">
                                                <span className="text-white">
                                                    Expires on
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={expireMonth}
                                                    onChange={(e) => {
                                                        const re = /^[0-9\b]+$/;
                                                        if (
                                                            e.target.value ===
                                                                '' ||
                                                            re.test(
                                                                e.target.value
                                                            )
                                                        ) {
                                                            setExpireMonth(
                                                                e.target.value
                                                            );
                                                        }
                                                    }}
                                                    placeholder="MM"
                                                    maxLength={2}
                                                    className="text-md border-l-0 border-r-0 border-t-0 border-white bg-transparent pb-1 pl-0 pr-0 text-black transition duration-500 ease-out placeholder:text-zinc-700 focus:border-magenta-500 focus:outline-none focus:ring-0 dark:text-white"
                                                />
                                                <input
                                                    type="text"
                                                    value={expireYear}
                                                    onChange={(e) => {
                                                        const re = /^[0-9\b]+$/;
                                                        if (
                                                            e.target.value ===
                                                                '' ||
                                                            re.test(
                                                                e.target.value
                                                            )
                                                        ) {
                                                            setExpireYear(
                                                                e.target.value
                                                            );
                                                        }
                                                    }}
                                                    placeholder="YY"
                                                    maxLength={2}
                                                    className="text-md border-l-0 border-r-0 border-t-0 border-white bg-transparent pb-1 pl-0 pr-0 text-black transition duration-500 ease-out placeholder:text-zinc-700 focus:border-magenta-500 focus:outline-none focus:ring-0 dark:text-white"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-none flex-col -space-y-2">
                                            <div className="flex h-8 justify-between">
                                                <span className="text-white">
                                                    Security code
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                value={securityCode}
                                                onChange={(e) => {
                                                    const re = /^[0-9\b]+$/;
                                                    if (
                                                        e.target.value === '' ||
                                                        re.test(e.target.value)
                                                    ) {
                                                        setSecurityCode(
                                                            e.target.value
                                                        );
                                                    }
                                                }}
                                                maxLength={3}
                                                placeholder="XXX"
                                                className="text-md border-l-0 border-r-0 border-t-0 border-white bg-transparent pb-1 pl-0 pr-0 text-black transition duration-500 ease-out placeholder:text-zinc-700 focus:border-magenta-500 focus:outline-none focus:ring-0 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ButtonWithBorder
                        Title={'Next'}
                        HandleClick={handleNextStep}
                        className={'mt-4 w-full p-2 font-bold'}
                    />
                </div>
            </div>
        </div>
    );
}
