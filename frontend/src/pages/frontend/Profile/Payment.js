import CreditCardPin from '../../../assets/frontend/svg/CreditCardPin.svg?react';
import VisaLogo from '../../../assets/frontend/svg/VisaLogo.svg?react';
import MastercardLogo from '../../../assets/frontend/svg/MastercardLogo.svg?react';
import MastercardCard from '../../../assets/frontend/svg/MastercardCard.svg?react';
import VisaCard from '../../../assets/frontend/svg/VisaCard.svg?react';
import { Tab } from '@headlessui/react';
import { useState } from 'react';
import { payments } from '../../../test/payments';
import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/20/solid';

export default function Payment() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardNumber, setCardNumber] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [expireMonth, setExpireMonth] = useState('');
    const [expireYear, setExpireYear] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const handleCardClick = (card) => {
        if (card === false) {
            setCardNumber('');
            setNameOnCard('');
            setSelectedCard(true);
        } else {
            setCardNumber(card.cardNumber);
            setNameOnCard(card.cardHolder);
            setSelectedCard(card);
        }
    };
    return (
        <Tab.Panel className="p-3 focus:outline-none">
            {selectedCard == null ? (
                <div className="grid gap-3 lg:grid-cols-2">
                    {payments.map((card, index) => (
                        <button
                            key={index}
                            onClick={() => handleCardClick(card)}
                            className="overflow-hidden rounded-2xl bg-gray-500 bg-gradient-to-tl from-magenta-500 via-zinc-800 to-black bg-size-200 bg-pos-0 px-7 py-7 text-white transition-all duration-500 ease-out hover:bg-pos-100"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <CreditCardPin className="h-7 w-10" />
                                </div>
                                <div>
                                    {card.type === 'visa' ? (
                                        <VisaLogo className="h-8 w-14" />
                                    ) : (
                                        <MastercardLogo className="h-8 w-14" />
                                    )}
                                </div>
                            </div>
                            <div className="text-bold mt-7 flex items-center space-x-3 font-mono text-2xl sm:text-3xl">
                                <div>
                                    {card.cardNumber
                                        .slice(0, 4)
                                        .replace(/[0123456789]/g, '•')}
                                </div>
                                <div>
                                    {card.cardNumber
                                        .slice(4, 8)
                                        .replace(/[0123456789]/g, '•')}
                                </div>
                                <div>
                                    {card.cardNumber
                                        .slice(8, 12)
                                        .replace(/[0123456789]/g, '•')}
                                </div>
                                <div>{card.cardNumber.slice(12, 16)}</div>
                            </div>
                            <div className="mt-12 flex justify-between">
                                <div className="flex flex-col items-start space-y-1">
                                    <div className="text-left text-sm max-sm:text-xs">
                                        Card Holder
                                    </div>
                                    <div className="text-left text-xl font-bold max-sm:text-lg">
                                        {card.cardHolder.toUpperCase()}
                                    </div>
                                </div>
                                <div className="flex flex-col items-start space-y-1">
                                    <div className="text-left text-sm max-sm:text-xs">
                                        Expiration Date
                                    </div>
                                    <div className="text-xl font-semibold max-sm:text-lg">
                                        {card.expirationDate}
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                    <button
                        onClick={() => handleCardClick(false)}
                        className="group flex items-center justify-center space-x-2 overflow-hidden rounded-2xl bg-gray-500 bg-zinc-600/60 bg-gradient-to-tl from-magenta-500 via-zinc-800 to-black bg-size-200 bg-pos-0 px-7 py-7 text-white transition-all  duration-500 hover:bg-pos-100 focus:outline-none"
                    >
                        <PlusIcon className="h-14 w-14 transition duration-500 ease-out " />
                        <span className="text-3xl font-bold transition duration-500 ease-out ">
                            New card
                        </span>
                    </button>
                </div>
            ) : (
                <div className="p-3 text-white">
                    <button
                        onClick={() => setSelectedCard(null)}
                        className="group flex items-center pl-0 text-white"
                    >
                        <ChevronLeftIcon className="h-7 w-7 transition duration-500 ease-out group-hover:text-magenta-500" />
                        <span className="text-lg transition duration-500 ease-out group-hover:text-magenta-500">
                            Back
                        </span>
                    </button>
                    <div className="my-4">
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
                                            setNameOnCard(e.target.value);
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
                                            className={`h-8 w-8 ${cardNumber === '' ? 'block' : cardNumber.slice(0, 1) === '5' ? 'block' : 'hidden'}`}
                                        />
                                        <VisaCard
                                            className={`h-8 w-8 ${cardNumber === '' ? 'block' : cardNumber.slice(0, 1) === '4' ? 'block' : 'hidden'}`}
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
                                            setCardNumber(e.target.value);
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
                                                e.target.value === '' ||
                                                re.test(e.target.value)
                                            ) {
                                                setExpireMonth(e.target.value);
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
                                                e.target.value === '' ||
                                                re.test(e.target.value)
                                            ) {
                                                setExpireYear(e.target.value);
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
                                            !re.test(e.target.value)
                                        ) {
                                            setSecurityCode(e.target.value);
                                        }
                                    }}
                                    maxLength={3}
                                    placeholder="XXX"
                                    className="text-md border-l-0 border-r-0 border-t-0 border-white bg-transparent pb-1 pl-0 pr-0 text-black transition duration-500 ease-out placeholder:text-zinc-700 focus:border-magenta-500 focus:outline-none focus:ring-0 dark:text-white"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end pt-5">
                            <button className="border-2 border-white px-5 py-2 text-white transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Tab.Panel>
    );
}
