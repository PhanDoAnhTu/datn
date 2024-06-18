/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
    ChevronDownIcon,
    FunnelIcon,
    MinusIcon,
    PlusIcon,
    Squares2X2Icon,
    ListBulletIcon,
} from '@heroicons/react/20/solid';
import classNames from '../../../helpers/classNames';
import { Link, useParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import ProductSingle from '../../../components/frontend/ProductSingle';
import Pagination from '../../../components/frontend/Pagination';
// eslint-disable-next-line no-unused-vars
import ProductSingleList from '../../../components/frontend/ProductSingleList';
import { useDispatch, useSelector } from 'react-redux';
//
// eslint-disable-next-line no-unused-vars
import { findListBrand } from '../../../store/actions/brand-actions';
import { findAllAttribute } from '../../../store/actions/attribute-actions';
import { allProducts } from '../../../store/actions';

const sortOptions = [
    { name: 'Ngày ra mắt', value: 'createdAt' },
    { name: 'Đánh giá cao nhất', value: 'bestRating' },
    { name: 'Giá: Thấp đến cao', value: 'priceLowToHigh' },
    { name: 'Giá: Cao đến thấp', value: 'priceHighToLow' },
];

export default function Category() {
    // eslint-disable-next-line no-unused-vars
    const limit = 8;
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [isListView, setIsListView] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const { category1, category2, category3 } = useParams();
    // eslint-disable-next-line no-unused-vars
    const [products, setProducts] = useState(null);
    const [filteredProduct, setFilteredProducts] = useState(null);
    const [pagedProducts, setPagedProducts] = useState(null);
    ///demo setProducts
    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const { all_products } = useSelector((state) => state.productReducer);
    // eslint-disable-next-line no-unused-vars
    const { category } = useSelector((state) => state.categoryReducer);
    const { brand } = useSelector((state) => state.brandReducer);
    const { attribute } = useSelector((state) => state.attributeReducer);
    // eslint-disable-next-line no-unused-vars
    const [page, setPage] = useState(1);
    useEffect(() => {
        if (!all_products) {
            dispatch(allProducts());
        }
    }, [all_products]);
    useEffect(() => {
        if (!brand) {
            dispatch(findListBrand());
        }
        if (!attribute) {
            dispatch(findAllAttribute());
        }
    }, [brand, attribute]);

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [selectedSort, setSelectedSort] = useState('createdAt');
    useEffect(() => {
        setSelectedBrands([]);
        setSelectedAttributes([]);
        setPage(1);
        setSelectedSort(sortOptions[0].value);
        if (
            category1 === undefined &&
            category2 === undefined &&
            category3 === undefined
        ) {
            setProducts(all_products);
        }
        if (
            category1 !== undefined &&
            category2 === undefined &&
            category3 === undefined
        ) {
            setProducts(
                all_products
                    ?.slice()
                    .filter((item) =>
                        item.product_category.includes(
                            category?.find(
                                (item) => item.category_slug === category1
                            )?._id
                        )
                    )
            );
        }

        if (
            category1 !== undefined &&
            category2 !== undefined &&
            category3 === undefined
        ) {
            setProducts(
                all_products
                    ?.slice()
                    .filter((item) =>
                        item.product_category.includes(
                            category?.find(
                                (item) =>
                                    item.parent_id ===
                                    category?.find(
                                        (subitem) =>
                                            subitem.category_slug ===
                                            category1
                                    )?._id &&
                                    item.category_slug === category2
                            )?._id
                        )
                    )
            );
        }
        if (
            category1 !== undefined &&
            category2 !== undefined &&
            category3 !== undefined
        ) {
            setProducts(
                all_products
                    ?.slice()
                    .filter((item) =>
                        item.product_category.includes(
                            category
                                ?.slice()
                                .find(
                                    (item) =>
                                        item.parent_id ===
                                        category
                                            ?.slice()
                                            .find(
                                                (subitem) =>
                                                    subitem.parent_id ===
                                                    category
                                                        ?.slice()
                                                        .find(
                                                            (
                                                                subsubitem
                                                            ) =>
                                                                subsubitem.category_slug ===
                                                                category1
                                                        )?._id &&
                                                    subitem.category_slug ===
                                                    category2
                                            )?._id &&
                                        item.category_slug === category3
                                )?._id
                        )
                    )
            );
        }
    }, [all_products, category1, category2, category3]);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    useEffect(() => {
        setPage(1);
        if (selectedBrands?.length === 0) {
            if (selectedAttributes?.length === 0) {
                if (
                    category1 === undefined &&
                    category2 === undefined &&
                    category3 === undefined
                ) {
                    setFilteredProducts(
                        products
                            ?.slice()
                            .sort((a, b) =>
                                selectedSort === 'priceLowToHigh'
                                    ? a.product_price < b.product_price
                                        ? -1
                                        : 1
                                    : selectedSort === 'priceHighToLow'
                                        ? a.product_price > b.product_price
                                            ? -1
                                            : 1
                                        : selectedSort === 'createdAt'
                                            ? 1
                                            : -1
                            )
                    );
                }
                if (
                    category1 !== undefined &&
                    category2 === undefined &&
                    category3 === undefined
                ) {
                    setFilteredProducts(
                        products
                            ?.slice()
                            .filter((item) =>
                                item.product_category.includes(
                                    category?.find(
                                        (item) =>
                                            item.category_slug === category1
                                    )?._id
                                )
                            )
                            .sort((a, b) =>
                                selectedSort === 'priceLowToHigh'
                                    ? a.product_price < b.product_price
                                        ? -1
                                        : 1
                                    : selectedSort === 'priceHighToLow'
                                        ? a.product_price > b.product_price
                                            ? -1
                                            : 1
                                        : selectedSort === 'createdAt'
                                            ? 1
                                            : -1
                            )
                    );
                }
                if (
                    category1 !== undefined &&
                    category2 !== undefined &&
                    category3 === undefined
                ) {
                    setFilteredProducts(
                        products
                            ?.slice()
                            .filter((item) =>
                                item.product_category.includes(
                                    category?.find(
                                        (item) =>
                                            item.parent_id ===
                                            category?.find(
                                                (subitem) =>
                                                    subitem.category_slug ===
                                                    category1
                                            )?._id &&
                                            item.category_slug === category2
                                    )?._id
                                )
                            )
                            .sort((a, b) =>
                                selectedSort === 'priceLowToHigh'
                                    ? a.product_price < b.product_price
                                        ? -1
                                        : 1
                                    : selectedSort === 'priceHighToLow'
                                        ? a.product_price > b.product_price
                                            ? -1
                                            : 1
                                        : selectedSort === 'createdAt'
                                            ? 1
                                            : -1
                            )
                    );
                }
                if (
                    category1 !== undefined &&
                    category2 !== undefined &&
                    category3 !== undefined
                ) {
                    setFilteredProducts(
                        products
                            ?.slice()
                            .filter((item) =>
                                item.product_category.includes(
                                    category
                                        ?.slice()
                                        .find(
                                            (item) =>
                                                item.parent_id ===
                                                category
                                                    ?.slice()
                                                    .find(
                                                        (subitem) =>
                                                            subitem.parent_id ===
                                                            category
                                                                ?.slice()
                                                                .find(
                                                                    (
                                                                        subsubitem
                                                                    ) =>
                                                                        subsubitem.category_slug ===
                                                                        category1
                                                                )
                                                                ?._id &&
                                                            subitem.category_slug ===
                                                            category2
                                                    )?._id &&
                                                item.category_slug === category3
                                        )?._id
                                )
                            )
                            .sort((a, b) =>
                                selectedSort === 'priceLowToHigh'
                                    ? a.product_price < b.product_price
                                        ? -1
                                        : 1
                                    : selectedSort === 'priceHighToLow'
                                        ? a.product_price > b.product_price
                                            ? -1
                                            : 1
                                        : selectedSort === 'createdAt'
                                            ? 1
                                            : -1
                            )
                    );
                }
            } else {
                setFilteredProducts(
                    products
                        ?.slice()
                        .filter((item) =>
                            selectedAttributes?.some((UUID) =>
                                item.product_attributes.some((attribute) =>
                                    attribute.attribute_value.some(
                                        (subitem) => subitem.value === UUID
                                    )
                                )
                            )
                        )
                        ?.sort((a, b) =>
                            selectedSort === 'priceLowToHigh'
                                ? a.product_price > b.product_price
                                    ? -1
                                    : 1
                                : selectedSort === 'priceHighToLow'
                                    ? a.product_price < b.product_price
                                        ? -1
                                        : 1
                                    : selectedSort === 'createdAt'
                                        ? 1
                                        : -1
                        )
                );
            }
        } else {
            if (selectedBrands?.length > 0 && selectedAttributes?.length > 0) {
                setFilteredProducts(
                    products
                        ?.slice()
                        .filter(
                            (item) =>
                                selectedBrands?.includes(item.product_brand) &&
                                selectedAttributes?.some((UUID) =>
                                    item.product_attributes.some((attribute) =>
                                        attribute.attribute_value.some(
                                            (subitem) => subitem.value === UUID
                                        )
                                    )
                                )
                        )
                        ?.sort((a, b) =>
                            selectedSort === 'priceLowToHigh'
                                ? a.product_price > b.product_price
                                    ? -1
                                    : 1
                                : selectedSort === 'priceHighToLow'
                                    ? a.product_price < b.product_price
                                        ? -1
                                        : 1
                                    : selectedSort === 'createdAt'
                                        ? 1
                                        : -1
                        )
                );
            } else {
                setFilteredProducts(
                    products
                        ?.slice()
                        .filter((item) =>
                            selectedBrands?.includes(item.product_brand)
                        )
                        ?.sort((a, b) =>
                            selectedSort === 'priceLowToHigh'
                                ? a.product_price > b.product_price
                                    ? -1
                                    : 1
                                : selectedSort === 'priceHighToLow'
                                    ? a.product_price < b.product_price
                                        ? -1
                                        : 1
                                    : selectedSort === 'createdAt'
                                        ? 1
                                        : -1
                        )
                );
            }
        }
    }, [selectedBrands, selectedSort]);

    useEffect(() => {
        setPage(1);
        if (selectedAttributes?.length === 0) {
            if (selectedBrands?.length === 0) {
                if (
                    category1 === undefined &&
                    category2 === undefined &&
                    category3 === undefined
                ) {
                    setFilteredProducts(
                        products
                            ?.slice()
                            ?.sort((a, b) =>
                                selectedSort === 'priceLowToHigh'
                                    ? a.product_price < b.product_price
                                        ? -1
                                        : 1
                                    : selectedSort === 'priceHighToLow'
                                        ? a.product_price > b.product_price
                                            ? -1
                                            : 1
                                        : selectedSort === 'createdAt'
                                            ? 1
                                            : -1
                            )
                    );
                }
                if (
                    category1 !== undefined &&
                    category2 === undefined &&
                    category3 === undefined
                ) {
                    setFilteredProducts(
                        products
                            ?.slice()
                            .filter((item) =>
                                item.product_category.includes(
                                    category?.find(
                                        (item) =>
                                            item.category_slug === category1
                                    )?._id
                                )
                            )
                            .sort((a, b) =>
                                selectedSort === 'priceLowToHigh'
                                    ? a.product_price < b.product_price
                                        ? -1
                                        : 1
                                    : selectedSort === 'priceHighToLow'
                                        ? a.product_price > b.product_price
                                            ? -1
                                            : 1
                                        : selectedSort === 'createdAt'
                                            ? 1
                                            : -1
                            )
                    );
                }
                if (
                    category1 !== undefined &&
                    category2 !== undefined &&
                    category3 === undefined
                ) {
                    setFilteredProducts(
                        products
                            ?.slice()
                            .filter((item) =>
                                item.product_category.includes(
                                    category?.find(
                                        (item) =>
                                            item.parent_id ===
                                            category?.find(
                                                (subitem) =>
                                                    subitem.category_slug ===
                                                    category1
                                            )?._id &&
                                            item.category_slug === category2
                                    )?._id
                                )
                            )
                            .sort((a, b) =>
                                selectedSort === 'priceLowToHigh'
                                    ? a.product_price < b.product_price
                                        ? -1
                                        : 1
                                    : selectedSort === 'priceHighToLow'
                                        ? a.product_price > b.product_price
                                            ? -1
                                            : 1
                                        : selectedSort === 'createdAt'
                                            ? 1
                                            : -1
                            )
                    );
                }
                if (
                    category1 !== undefined &&
                    category2 !== undefined &&
                    category3 !== undefined
                ) {
                    setFilteredProducts(
                        products
                            ?.slice()
                            .filter((item) =>
                                item.product_category.includes(
                                    category
                                        ?.slice()
                                        .find(
                                            (item) =>
                                                item.parent_id ===
                                                category
                                                    ?.slice()
                                                    .find(
                                                        (subitem) =>
                                                            subitem.parent_id ===
                                                            category
                                                                ?.slice()
                                                                .find(
                                                                    (
                                                                        subsubitem
                                                                    ) =>
                                                                        subsubitem.category_slug ===
                                                                        category1
                                                                )
                                                                ?._id &&
                                                            subitem.category_slug ===
                                                            category2
                                                    )?._id &&
                                                item.category_slug === category3
                                        )?._id
                                )
                            )
                            .sort((a, b) =>
                                selectedSort === 'priceLowToHigh'
                                    ? a.product_price < b.product_price
                                        ? -1
                                        : 1
                                    : selectedSort === 'priceHighToLow'
                                        ? a.product_price > b.product_price
                                            ? -1
                                            : 1
                                        : selectedSort === 'createdAt'
                                            ? 1
                                            : -1
                            )
                    );
                }
            } else {
                setFilteredProducts(
                    products
                        ?.slice()
                        .filter((item) =>
                            selectedBrands.includes(item.product_brand)
                        )
                        .sort((a, b) =>
                            selectedSort === 'priceLowToHigh'
                                ? a.product_price > b.product_price
                                    ? -1
                                    : 1
                                : selectedSort === 'priceHighToLow'
                                    ? a.product_price < b.product_price
                                        ? -1
                                        : 1
                                    : selectedSort === 'createdAt'
                                        ? 1
                                        : -1
                        )
                );
            }
        } else {
            if (selectedAttributes?.length > 0 && selectedBrands?.length > 0) {
                setFilteredProducts(
                    products
                        ?.slice()
                        .filter(
                            (item) =>
                                selectedAttributes.some((UUID) =>
                                    item.product_attributes.some((attribute) =>
                                        attribute.attribute_value.some(
                                            (subitem) => subitem.value === UUID
                                        )
                                    )
                                ) && selectedBrands.includes(item.product_brand)
                        )
                        .sort((a, b) =>
                            selectedSort === 'priceLowToHigh'
                                ? a.product_price > b.product_price
                                    ? -1
                                    : 1
                                : selectedSort === 'priceHighToLow'
                                    ? a.product_price < b.product_price
                                        ? -1
                                        : 1
                                    : selectedSort === 'createdAt'
                                        ? 1
                                        : -1
                        )
                );
            } else {
                setFilteredProducts(
                    products
                        ?.slice()
                        .filter((item) =>
                            selectedAttributes.some((UUID) =>
                                item.product_attributes.some((attribute) =>
                                    attribute.attribute_value.some(
                                        (subitem) => subitem.value === UUID
                                    )
                                )
                            )
                        )
                        .sort((a, b) =>
                            selectedSort === 'priceLowToHigh'
                                ? a.product_price > b.product_price
                                    ? -1
                                    : 1
                                : selectedSort === 'priceHighToLow'
                                    ? a.product_price < b.product_price
                                        ? -1
                                        : 1
                                    : selectedSort === 'createdAt'
                                        ? 1
                                        : -1
                        )
                );
            }
        }
    }, [selectedAttributes, selectedSort]);

    useEffect(() => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        setPagedProducts(filteredProduct?.slice(startIndex, endIndex));
    }, [filteredProduct, page]);

    return (
        <div>
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-40 lg:hidden"
                        onClose={setMobileFiltersOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl dark:bg-zinc-900">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                                            Lọc sản phẩm
                                        </h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-transparent p-2 text-gray-400 dark:text-white"
                                            onClick={() =>
                                                setMobileFiltersOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close menu
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>
                                        <ul className="px-2 py-3 font-medium text-gray-900">
                                            {category1 === undefined &&
                                                category2 === undefined &&
                                                category3 === undefined
                                                ? category
                                                    ?.slice()
                                                    .filter(
                                                        (item) =>
                                                            item.parent_id ===
                                                            null
                                                    )
                                                    .map((item) => (
                                                        <li key={item._id}>
                                                            <Link
                                                                to={`/san-pham-theo-danh-muc/${item.category_slug}`}
                                                                className={`block px-2 py-3 ${category3 === item.category_slug ? ' pointer-events-none text-magenta-500' : 'text-gray-900 dark:text-white'}`}
                                                            >
                                                                {
                                                                    item.category_name
                                                                }
                                                            </Link>
                                                        </li>
                                                    ))
                                                : category1 !== undefined &&
                                                    category2 === undefined &&
                                                    category3 === undefined
                                                    ? category
                                                        ?.slice()
                                                        .filter(
                                                            (item) =>
                                                                item.parent_id ===
                                                                category
                                                                    ?.slice()
                                                                    .find(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.category_slug ===
                                                                            category1
                                                                    )?._id
                                                        )
                                                        .map((item) => (
                                                            <li key={item._id}>
                                                                <Link
                                                                    to={`/san-pham-theo-danh-muc/${category1}/${item.category_slug}`}
                                                                    className={`block px-2 py-3 ${category3 === item.category_slug ? ' pointer-events-none text-magenta-500' : 'text-gray-900 dark:text-white'}`}
                                                                >
                                                                    {
                                                                        item.category_name
                                                                    }
                                                                </Link>
                                                            </li>
                                                        ))
                                                    : category1 !== undefined &&
                                                        category2 !== undefined &&
                                                        category3 === undefined
                                                        ? category
                                                            ?.slice()
                                                            .filter(
                                                                (item) =>
                                                                    item.parent_id ===
                                                                    category
                                                                        ?.slice()
                                                                        .find(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item.parent_id ===
                                                                                category
                                                                                    ?.slice()
                                                                                    .find(
                                                                                        (
                                                                                            item
                                                                                        ) =>
                                                                                            item.category_slug ===
                                                                                            category1
                                                                                    )
                                                                                    ?._id &&
                                                                                item.category_slug ===
                                                                                category2
                                                                        )?._id
                                                            )
                                                            .map((item) => (
                                                                <li
                                                                    key={item._id}
                                                                >
                                                                    <Link
                                                                        to={`/san-pham-theo-danh-muc/${category1}/${category2}/${item.category_slug}`}
                                                                        className={`block px-2 py-3 ${category3 !== undefined && category3 === item.category_slug ? ' pointer-events-none text-magenta-500' : 'text-gray-900 dark:text-white'}`}
                                                                    >
                                                                        {
                                                                            item.category_name
                                                                        }
                                                                    </Link>
                                                                </li>
                                                            ))
                                                        : category
                                                            ?.slice()
                                                            .filter(
                                                                (item) =>
                                                                    item.parent_id ===
                                                                    category
                                                                        ?.slice()
                                                                        .find(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item.parent_id ===
                                                                                category
                                                                                    ?.slice()
                                                                                    .find(
                                                                                        (
                                                                                            item
                                                                                        ) =>
                                                                                            item.category_slug ===
                                                                                            category1
                                                                                    )
                                                                                    ?._id &&
                                                                                item.category_slug ===
                                                                                category2
                                                                        )?._id
                                                            )
                                                            .map((item) => (
                                                                <li
                                                                    key={item._id}
                                                                >
                                                                    <Link
                                                                        to={`/san-pham-theo-danh-muc/${category1}/${category2}/${item.category_slug}`}
                                                                        className={`block px-2 py-3 ${category3 !== undefined && category3 === item.category_slug ? ' pointer-events-none text-magenta-500' : 'text-gray-900 dark:text-white'}`}
                                                                    >
                                                                        {
                                                                            item.category_name
                                                                        }
                                                                    </Link>
                                                                </li>
                                                            ))}
                                        </ul>
                                        {brand && (
                                            <Disclosure
                                                as="div"
                                                className="border-t border-gray-200 px-4 py-6"
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-transparent px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900 dark:text-white">
                                                                    Nhãn hàng
                                                                </span>
                                                                <span className="ml-6 flex items-center dark:text-gray-200">
                                                                    {open ? (
                                                                        <MinusIcon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <PlusIcon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {brand?.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                item.value
                                                                            }
                                                                            className="flex items-center"
                                                                        >
                                                                            <input
                                                                                id={`filter-mobile-${item._id}-${index}`}
                                                                                value={
                                                                                    item._id
                                                                                }
                                                                                onChange={() =>
                                                                                    null
                                                                                }
                                                                                onClick={(
                                                                                    e
                                                                                ) => {
                                                                                    if (
                                                                                        selectedBrands?.findIndex(
                                                                                            (
                                                                                                og
                                                                                            ) =>
                                                                                                og ===
                                                                                                item._id
                                                                                        ) ===
                                                                                        -1
                                                                                    ) {
                                                                                        setSelectedBrands(
                                                                                            (
                                                                                                prevState
                                                                                            ) => [
                                                                                                    ...prevState,
                                                                                                    e
                                                                                                        .target
                                                                                                        .value,
                                                                                                ]
                                                                                        );
                                                                                    } else {
                                                                                        setSelectedBrands(
                                                                                            selectedBrands
                                                                                                .slice()
                                                                                                .filter(
                                                                                                    (
                                                                                                        item
                                                                                                    ) =>
                                                                                                        item !==
                                                                                                        e
                                                                                                            .target
                                                                                                            .value
                                                                                                )
                                                                                        );
                                                                                    }
                                                                                }}
                                                                                checked={
                                                                                    selectedBrands?.findIndex(
                                                                                        (
                                                                                            og
                                                                                        ) =>
                                                                                            og ===
                                                                                            item._id
                                                                                    ) !==
                                                                                        -1
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                                type="checkbox"
                                                                                className="h-4 w-4 rounded border-gray-300 text-xanthous-600 focus:ring-xanthous-500"
                                                                            />
                                                                            <label
                                                                                htmlFor={`filter-mobile-${item._id}-${index}`}
                                                                                className="ml-3 min-w-0 flex-1 text-gray-900 dark:text-white"
                                                                            >
                                                                                {
                                                                                    item.brand_name
                                                                                }
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        )}
                                        {attribute &&
                                            attribute?.map((item, index) => (
                                                <Disclosure
                                                    as="div"
                                                    className="border-t border-gray-200 px-4 py-6"
                                                    key={item._id + '-' + index}
                                                >
                                                    {({ open }) => (
                                                        <>
                                                            <h3 className="-mx-2 -my-3 flow-root">
                                                                <Disclosure.Button className="flex w-full items-center justify-between bg-transparent px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                    <span className="font-medium text-gray-900 dark:text-white">
                                                                        {
                                                                            item.attribute_name
                                                                        }
                                                                    </span>
                                                                    <span className="ml-6 flex items-center dark:text-gray-200">
                                                                        {open ? (
                                                                            <MinusIcon
                                                                                className="h-5 w-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                        ) : (
                                                                            <PlusIcon
                                                                                className="h-5 w-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                        )}
                                                                    </span>
                                                                </Disclosure.Button>
                                                            </h3>
                                                            <Disclosure.Panel className="pt-6">
                                                                <div className="space-y-6">
                                                                    {item.attribute_value_list?.map(
                                                                        (
                                                                            subitem,
                                                                            subindex
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    subitem.value
                                                                                }
                                                                                className="flex items-center"
                                                                            >
                                                                                <input
                                                                                    id={`filter-mobile-${subitem._id}-${subindex}`}
                                                                                    value={
                                                                                        subitem._id
                                                                                    }
                                                                                    onChange={() =>
                                                                                        null
                                                                                    }
                                                                                    onClick={(
                                                                                        e
                                                                                    ) => {
                                                                                        if (
                                                                                            selectedAttributes?.findIndex(
                                                                                                (
                                                                                                    og
                                                                                                ) =>
                                                                                                    og ===
                                                                                                    subitem._id
                                                                                            ) ===
                                                                                            -1
                                                                                        ) {
                                                                                            setSelectedAttributes(
                                                                                                (
                                                                                                    prevState
                                                                                                ) => [
                                                                                                        ...prevState,
                                                                                                        e
                                                                                                            .target
                                                                                                            .value,
                                                                                                    ]
                                                                                            );
                                                                                        } else {
                                                                                            setSelectedAttributes(
                                                                                                selectedAttributes
                                                                                                    .slice()
                                                                                                    .filter(
                                                                                                        (
                                                                                                            og
                                                                                                        ) =>
                                                                                                            og !==
                                                                                                            e
                                                                                                                .target
                                                                                                                .value
                                                                                                    )
                                                                                            );
                                                                                        }
                                                                                    }}
                                                                                    checked={
                                                                                        selectedAttributes?.findIndex(
                                                                                            (
                                                                                                og
                                                                                            ) =>
                                                                                                og ===
                                                                                                subitem._id
                                                                                        ) !==
                                                                                            -1
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    type="checkbox"
                                                                                    className="h-4 w-4 rounded border-gray-300 text-xanthous-600 focus:ring-xanthous-500"
                                                                                />
                                                                                <label
                                                                                    htmlFor={`filter-mobile-${subitem._id}-${subindex}`}
                                                                                    className="ml-3 min-w-0 flex-1 text-gray-900 dark:text-white"
                                                                                >
                                                                                    {
                                                                                        subitem.attribute_value
                                                                                    }
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </Disclosure.Panel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                {category1 === undefined &&
                                    category2 === undefined &&
                                    category3 === undefined
                                    ? 'Danh mục'
                                    : category1 !== undefined &&
                                        category2 === undefined &&
                                        category3 === undefined
                                        ? category
                                            ?.slice()
                                            .find(
                                                (item) =>
                                                    item.category_slug ===
                                                    category1
                                            )?.category_name
                                        : category1 !== undefined &&
                                            category2 !== undefined &&
                                            category3 === undefined
                                            ? category
                                                ?.slice()
                                                .find(
                                                    (item) =>
                                                        item.parent_id ===
                                                        category
                                                            ?.slice()
                                                            .find(
                                                                (item) =>
                                                                    item.category_slug ===
                                                                    category1
                                                            )?._id &&
                                                        item.category_slug ===
                                                        category2
                                                )?.category_name
                                            : category
                                                ?.slice()
                                                .find(
                                                    (item) =>
                                                        item.parent_id ===
                                                        category
                                                            ?.slice()
                                                            .find(
                                                                (item) =>
                                                                    item.category_slug ===
                                                                    category1
                                                            )?._id &&
                                                        item.category_slug ===
                                                        category2
                                                )?.category_name}
                            </h1>
                        </div>

                        <div className="flex items-center">
                            <Menu
                                as="div"
                                className="relative inline-block text-left"
                            >
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 transition duration-200 ease-out hover:text-gray-900 dark:text-white dark:hover:text-stone-300">
                                        Sắp xếp
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-white dark:group-hover:text-stone-300"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-40 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-magenta-400">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <button
                                                            className={classNames(
                                                                selectedSort ===
                                                                    option.value
                                                                    ? 'pointer-events-none font-medium text-gray-900 dark:text-white'
                                                                    : 'text-gray-500 dark:text-stone-200',
                                                                active
                                                                    ? 'bg-gray-100 dark:bg-zinc-950'
                                                                    : '',
                                                                'block w-full px-4 py-2 text-left text-sm transition duration-200 ease-out'
                                                            )}
                                                            onClick={() =>
                                                                setSelectedSort(
                                                                    option.value
                                                                )
                                                            }
                                                        >
                                                            {option.name}
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button
                                type="button"
                                onClick={() => setIsListView(!isListView)}
                                className="-m-2 ml-5 p-2 text-gray-400 transition duration-200 ease-out hover:text-gray-500 sm:ml-7 dark:text-white dark:hover:text-stone-300"
                            >
                                <span className="sr-only">View grid</span>

                                {isListView ? (
                                    <Squares2X2Icon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <ListBulletIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 transition duration-200 ease-out hover:text-gray-500 sm:ml-6 lg:hidden dark:text-white dark:hover:text-stone-300"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>

                    <section
                        aria-labelledby="products-heading"
                        className="pb-24 pt-6"
                    >
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 dark:text-white">
                                    {category1 === undefined &&
                                        category2 === undefined &&
                                        category3 === undefined
                                        ? category
                                            ?.slice()
                                            .filter(
                                                (item) =>
                                                    item.parent_id === null
                                            )
                                            .map((item) => (
                                                <li key={item._id}>
                                                    <Link
                                                        to={`/san-pham-theo-danh-muc/${item.category_slug}`}
                                                    >
                                                        {item.category_name}
                                                    </Link>
                                                </li>
                                            ))
                                        : category1 !== undefined &&
                                            category2 === undefined &&
                                            category3 === undefined
                                            ? category
                                                ?.slice()
                                                .filter(
                                                    (item) =>
                                                        item.parent_id ===
                                                        category
                                                            ?.slice()
                                                            .find(
                                                                (item) =>
                                                                    item.category_slug ===
                                                                    category1
                                                            )?._id
                                                )
                                                .map((item) => (
                                                    <li key={item._id}>
                                                        <Link
                                                            to={`/san-pham-theo-danh-muc/${category1}/${item.category_slug}`}
                                                        >
                                                            {item.category_name}
                                                        </Link>
                                                    </li>
                                                ))
                                            : category1 !== undefined &&
                                                category2 !== undefined &&
                                                category3 === undefined
                                                ? category
                                                    ?.slice()
                                                    .filter(
                                                        (item) =>
                                                            item.parent_id ===
                                                            category
                                                                ?.slice()
                                                                .find(
                                                                    (item) =>
                                                                        item.parent_id ===
                                                                        category
                                                                            ?.slice()
                                                                            .find(
                                                                                (
                                                                                    item
                                                                                ) =>
                                                                                    item.category_slug ===
                                                                                    category1
                                                                            )
                                                                            ?._id &&
                                                                        item.category_slug ===
                                                                        category2
                                                                )?._id
                                                    )
                                                    .map((item) => (
                                                        <li key={item._id}>
                                                            <Link
                                                                to={`/san-pham-theo-danh-muc/${category1}/${category2}/${item.category_slug}`}
                                                                className={`${category3 !== undefined && category3 === item.category_slug ? ' pointer-events-none text-magenta-500' : 'text-gray-900 dark:text-white'}`}
                                                            >
                                                                {
                                                                    item.category_name
                                                                }
                                                            </Link>
                                                        </li>
                                                    ))
                                                : category
                                                    ?.slice()
                                                    .filter(
                                                        (item) =>
                                                            item.parent_id ===
                                                            category
                                                                ?.slice()
                                                                .find(
                                                                    (item) =>
                                                                        item.parent_id ===
                                                                        category
                                                                            ?.slice()
                                                                            .find(
                                                                                (
                                                                                    item
                                                                                ) =>
                                                                                    item.category_slug ===
                                                                                    category1
                                                                            )
                                                                            ?._id &&
                                                                        item.category_slug ===
                                                                        category2
                                                                )?._id
                                                    )
                                                    .map((item) => (
                                                        <li key={item._id}>
                                                            <Link
                                                                to={`/san-pham-theo-danh-muc/${category1}/${category2}/${item.category_slug}`}
                                                                className={`${category3 !== undefined && category3 === item.category_slug ? ' pointer-events-none text-magenta-500' : 'text-gray-900 dark:text-white'}`}
                                                            >
                                                                {
                                                                    item.category_name
                                                                }
                                                            </Link>
                                                        </li>
                                                    ))}
                                </ul>
                                {brand && (
                                    <Disclosure
                                        as="div"
                                        className="border-b border-gray-200 py-6"
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-transparent py-3 text-sm text-gray-400 transition duration-200 ease-out hover:text-gray-500  dark:text-stone-200 dark:hover:text-stone-400">
                                                        <span className="font-medium text-gray-900 dark:text-stone-300">
                                                            Nhãn hàng
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <PlusIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {brand?.map(
                                                            (item, index) => (
                                                                <div
                                                                    key={
                                                                        item._id
                                                                    }
                                                                    className="flex items-center"
                                                                >
                                                                    <input
                                                                        id={`filter-${item._id}-${index}`}
                                                                        value={
                                                                            item._id
                                                                        }
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            if (
                                                                                selectedBrands?.findIndex(
                                                                                    (
                                                                                        og
                                                                                    ) =>
                                                                                        og ===
                                                                                        item._id
                                                                                ) ===
                                                                                -1
                                                                            ) {
                                                                                setSelectedBrands(
                                                                                    (
                                                                                        prevState
                                                                                    ) => [
                                                                                            ...prevState,
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                        ]
                                                                                );
                                                                            } else {
                                                                                setSelectedBrands(
                                                                                    selectedBrands
                                                                                        .slice()
                                                                                        .filter(
                                                                                            (
                                                                                                item
                                                                                            ) =>
                                                                                                item !==
                                                                                                e
                                                                                                    .target
                                                                                                    .value
                                                                                        )
                                                                                );
                                                                            }
                                                                        }}
                                                                        onChange={() =>
                                                                            null
                                                                        }
                                                                        checked={
                                                                            selectedBrands?.findIndex(
                                                                                (
                                                                                    og
                                                                                ) =>
                                                                                    og ===
                                                                                    item._id
                                                                            ) !==
                                                                                -1
                                                                                ? true
                                                                                : false
                                                                        }
                                                                        type="checkbox"
                                                                        className="h-4 w-4 rounded border-gray-300 text-xanthous-600 focus:ring-xanthous-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-${item.id}-${index}`}
                                                                        className="ml-3 text-sm text-gray-600 dark:text-stone-200"
                                                                    >
                                                                        {
                                                                            item.brand_name
                                                                        }
                                                                    </label>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                )}

                                {attribute &&
                                    attribute.map((item, index) => (
                                        <Disclosure
                                            as="div"
                                            className="border-b border-gray-200 py-6"
                                            key={item._id + '-' + index}
                                        >
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-transparent py-3 text-sm text-gray-400 transition duration-200 ease-out hover:text-gray-500  dark:text-stone-200 dark:hover:text-stone-400">
                                                            <span className="font-medium text-gray-900 dark:text-stone-300">
                                                                {
                                                                    item.attribute_name
                                                                }
                                                            </span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <PlusIcon
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-4">
                                                            {item.attribute_value_list?.map(
                                                                (
                                                                    subitem,
                                                                    subindex
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            subitem._id
                                                                        }
                                                                        className="flex items-center"
                                                                    >
                                                                        <input
                                                                            id={`filter-${subitem._id}-${subindex}`}
                                                                            value={
                                                                                subitem._id
                                                                            }
                                                                            onClick={(
                                                                                e
                                                                            ) => {
                                                                                if (
                                                                                    selectedAttributes?.findIndex(
                                                                                        (
                                                                                            og
                                                                                        ) =>
                                                                                            og ===
                                                                                            subitem._id
                                                                                    ) ===
                                                                                    -1
                                                                                ) {
                                                                                    setSelectedAttributes(
                                                                                        (
                                                                                            prevState
                                                                                        ) => [
                                                                                                ...prevState,
                                                                                                e
                                                                                                    .target
                                                                                                    .value,
                                                                                            ]
                                                                                    );
                                                                                } else {
                                                                                    setSelectedAttributes(
                                                                                        selectedAttributes
                                                                                            ?.slice()
                                                                                            .filter(
                                                                                                (
                                                                                                    og
                                                                                                ) =>
                                                                                                    og !==
                                                                                                    e
                                                                                                        .target
                                                                                                        .value
                                                                                            )
                                                                                    );
                                                                                }
                                                                            }}
                                                                            onChange={() =>
                                                                                null
                                                                            }
                                                                            checked={
                                                                                selectedAttributes?.findIndex(
                                                                                    (
                                                                                        og
                                                                                    ) =>
                                                                                        og ===
                                                                                        subitem._id
                                                                                ) !==
                                                                                    -1
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            type="checkbox"
                                                                            className="h-4 w-4 rounded border-gray-300 text-xanthous-600 focus:ring-xanthous-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-${subitem._id}-${subindex}`}
                                                                            className="ml-3 text-sm text-gray-600 dark:text-stone-200"
                                                                        >
                                                                            {
                                                                                subitem.attribute_value
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                            </form>

                            {/* Product grid */}
                            <div className="col-span-3 grid grid-rows-1">
                                <div
                                    className={`relative col-span-3 grid h-fit gap-x-6 ${isListView ? 'gap-4' : 'grid-cols-2 gap-y-10 sm:grid-cols-4 lg:grid-cols-4 xl:gap-x-3'}`}
                                >
                                    {!isListView ? (
                                        pagedProducts &&
                                            pagedProducts.length !== 0 ? (
                                            pagedProducts?.map(
                                                (product, index) => (
                                                    <ProductSingle
                                                        product={product}
                                                        key={index}
                                                    />
                                                )
                                            )
                                        ) : (
                                            <div className="col-span-full text-center text-lg font-bold text-gray-900 dark:text-white">
                                                Hiện không có sản phẩm
                                            </div>
                                        )
                                    ) : pagedProducts &&
                                        pagedProducts.length !== 0 ? (
                                        pagedProducts?.map((product, index) => (
                                            <ProductSingleList
                                                product={product}
                                                key={index}
                                            />
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center text-lg font-bold text-gray-900 dark:text-white">
                                            Hiện không có sản phẩm
                                        </div>
                                    )}
                                </div>
                                <div className="col-span-3 pt-5">
                                    {filteredProduct &&
                                        filteredProduct?.length > 8 ? (
                                        <Pagination
                                            className="col-span-3"
                                            data={Array.from(
                                                {
                                                    length: Math.ceil(
                                                        filteredProduct?.length /
                                                        8
                                                    ),
                                                },
                                                (_, index) => index + 1
                                            )}
                                            currentPage={page}
                                            setCurrentPage={setPage}
                                        />
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
