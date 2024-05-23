import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const products = [
    {
        id: 1,
        name: 'Basic Tee',
        to: '#',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    // More products...
    {
        id: 2,
        name: 'Basic Shirt',
        to: '#',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 3,
        name: 'Basic Test',
        to: '#',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 4,
        name: 'Basic Test',
        to: '#',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 5,
        name: 'Basic Test',
        to: '#',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 6,
        name: 'Basic Test',
        to: '#',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 7,
        name: 'Basic Test',
        to: '#',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 8,
        name: 'Basic Test',
        to: '#',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 9,
        name: 'Basic Test',
        to: '#',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 10,
        name: 'Basic Test',
        to: '#',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 11,
        name: 'Basic Test',
        to: '#',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
];

export default function ProductList() {
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
        <div className="bg-white dark:bg-stone-900">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-screen-2xl lg:px-8">
                <div className="flex items-center">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Customers also purchased
                        </h2>
                        <h3 className="text-sm text-gray-300 lg:text-lg">
                            Summary
                        </h3>
                    </div>

                    <div className="space-x-2">
                        <button
                            onClick={movePrev}
                            disabled={isDisabled('prev')}
                            className="rounded-md border-2 p-1 text-gray-600 transition-colors duration-200 ease-out hover:text-gray-800 disabled:pointer-events-none disabled:opacity-25 dark:border-white dark:text-white dark:hover:border-gray-500 dark:hover:text-gray-500"
                        >
                            <ArrowLongLeftIcon className="h-full w-6" />
                        </button>
                        <button
                            onClick={moveNext}
                            disabled={isDisabled('next')}
                            className="rounded-md border-2 p-1 text-gray-600 transition-colors duration-200 ease-out hover:text-gray-800 disabled:pointer-events-none disabled:opacity-25 dark:border-white dark:text-white dark:hover:border-gray-500 dark:hover:text-gray-500"
                        >
                            <ArrowLongRightIcon className="h-full w-6" />
                        </button>
                    </div>
                </div>

                <div
                    ref={carousel}
                    className="mt-6 flex w-full touch-pan-x snap-x snap-mandatory flex-row flex-nowrap space-x-2 overflow-hidden scroll-smooth lg:space-x-6"
                >
                    {products.map((product, index) => {
                        return index !== products.length - 1 ? (
                            <div key={product.id} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-36 snap-start overflow-hidden rounded-md bg-gray-200 transition-all duration-200 ease-out lg:aspect-none group-hover:opacity-75 md:w-48 lg:h-80 lg:w-56">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-700 dark:text-white">
                                            <Link to={product.to}>
                                                <span
                                                    aria-hidden="true"
                                                    className="absolute inset-0"
                                                />
                                                {product.name}
                                            </Link>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                            {product.color}
                                        </p>
                                    </div>
                                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                                        {product.price}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="group relative">
                                <div className="aspect-h-1 aspect-w-1 flex w-36 snap-start flex-col items-center justify-center overflow-hidden rounded-md bg-gray-100 transition-all duration-200 ease-out lg:aspect-none group-hover:opacity-75 md:w-48 lg:h-80 lg:w-52 lg:p-9">
                                    <div className="flex justify-center">
                                        <PlusCircleIcon className="w-16  text-gray-500" />
                                    </div>

                                    <h3 className="my-2 text-center text-lg font-bold text-gray-700 dark:text-gray-500">
                                        Explore more
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
