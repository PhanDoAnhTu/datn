import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import ProductSingle from './ProductSingle';

export default function ProductList({ title, summary, products }) {
    const maxScrollWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carousel = useRef(null);
    const movePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevState) => prevState - 1);
        }
    };

    const moveNext = () => {
        if (
            carousel.current !== null &&
            carousel.current.offsetWidth * currentIndex <=
                maxScrollWidth.current
        ) {
            setCurrentIndex((prevState) => prevState + 1);
        }
    };

    const isDisabled = (direction) => {
        if (direction === 'prev') {
            return currentIndex <= 0;
        }

        if (direction === 'next' && carousel.current !== null) {
            return (
                carousel.current.offsetWidth * currentIndex >=
                maxScrollWidth.current
            );
        }

        return false;
    };

    useEffect(() => {
        if (carousel !== null && carousel.current !== null) {
            carousel.current.scrollLeft =
                carousel.current.offsetWidth * currentIndex;
        }
    }, [currentIndex]);

    useEffect(() => {
        maxScrollWidth.current = carousel.current
            ? carousel.current.scrollWidth - carousel.current.offsetWidth
            : 0;
    }, []);

    return (
        <div>
            <div
                className={`mx-auto max-w-screen-2xl py-4 sm:py-8 lg:max-w-screen-2xl`}
            >
                <div className="flex items-center">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {title}
                        </h2>
                        <h3 className="text-sm text-gray-500 lg:text-lg dark:text-gray-300">
                            {summary}
                        </h3>
                    </div>

                    <div className="space-x-2 max-md:hidden">
                        <button
                            onClick={movePrev}
                            disabled={isDisabled('prev')}
                            className="rounded-md border-2 border-gray-400 p-1 text-gray-400 transition-colors duration-200 ease-out hover:border-gray-900 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-25 dark:border-white dark:text-white dark:hover:border-gray-500 dark:hover:text-gray-500"
                        >
                            <ArrowLongLeftIcon className="h-full w-6" />
                        </button>
                        <button
                            onClick={moveNext}
                            disabled={isDisabled('next')}
                            className="rounded-md border-2 border-gray-400 p-1 text-gray-400 transition-colors duration-200 ease-out hover:border-gray-900 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-25 dark:border-white dark:text-white dark:hover:border-gray-500 dark:hover:text-gray-500"
                        >
                            <ArrowLongRightIcon className="h-full w-6" />
                        </button>
                    </div>
                </div>

                <div
                    ref={carousel}
                    className="no-scrollbar touch-snap-x mt-6 flex w-full snap-x snap-mandatory flex-row flex-nowrap space-x-2 overflow-x-scroll scroll-smooth lg:space-x-3"
                >
                    {products?.map((product) => {
                        return (
                            <ProductSingle
                                product={product}
                                key={product?._id}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
