import { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { getSpecialOfferBySpuId, productById } from '../../../store/actions';
// import ProductOption from "../listBox/ProductOptions";
import { NumericFormat } from 'react-number-format';
import {
    CheckIcon,
    ChevronUpDownIcon,
    MinusIcon,
    PlusIcon,
} from '@heroicons/react/20/solid';
import { Listbox, Transition } from '@headlessui/react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
export default function CartPopoverItem({ product, update }) {
    const dispatch = useDispatch();
    console.log('product', product);
    const [product_item, setProductItem] = useState(null);
    const [sku_default, setSku_default] = useState(null);
    const [selected, setSelected] = useState(null);
    const [selected_sku, setSelected_sku] = useState(null);
    //sale
    const [spicial_offer, setSpicial_offer] = useState(null);
    const [sku_sale, setSku_sale] = useState(null);

    //
    const [selected_sku_old, setSelected_sku_old] = useState(null);
    const [selected_old, setSelected_old] = useState(null);

    const [_quantity, setQuantity] = useState(null);

    const productItemApi = async () => {
        const respon = await dispatch(
            productById({ spu_id: product.productId })
        );
        console.log('respon', respon);
        setProductItem(respon && respon.payload.metaData);
        setSku_default(
            respon &&
                respon.payload.metaData.sku_list.find(
                    (item) => item._id.toString() === product.sku_id.toString()
                )
        );
    };
    const saleApi = async () => {
        const fetch_spicial_offer = await dispatch(
            getSpecialOfferBySpuId({ spu_id: product.productId })
        );
        setSpicial_offer(fetch_spicial_offer.payload.metaData);
    };

    useEffect(() => {
        product && productItemApi();
        !product_item && productItemApi();
        !_quantity && setQuantity(product.quantity);
    }, [product]);

    // console.log('sku_default',sku_default)
    useEffect(() => {
        if (!spicial_offer) {
            saleApi();
        }
        selected &&
            spicial_offer &&
            spicial_offer.special_offer_spu_list.filter((spu) => {
                if (
                    spu.product_id.toString() === product.productId.toString()
                ) {
                    return spu.sku_list.filter((sku) => {
                        if (
                            sku.sku_tier_idx.toString() === selected.toString()
                        ) {
                            setSku_sale(sku);
                            return;
                        }
                    });
                }
            });
    }, [selected, spicial_offer]);

    useEffect(() => {
        sku_default &&
            !selected_old &&
            setSelected_old(sku_default.sku_tier_idx);
        sku_default && !selected && setSelected(sku_default.sku_tier_idx);
        console.log('sku_default', sku_default);
    }, [sku_default]);

    useEffect(() => {
        product_item &&
            selected &&
            setSelected_sku(
                product_item.sku_list.find(
                    (item) =>
                        item.sku_tier_idx.toString() === selected.toString()
                )
            );
    }, [selected]);

    useEffect(() => {
        console.log('selected', selected);
        console.log('selected_sku', selected_sku);
        selected_sku &&
            selected_sku_old &&
            updateCart('updateItem', {
                productId: product.productId,
                quantity: _quantity,
                old_quantity: _quantity,
                sku_id: selected_sku._id,
                sku_id_old: selected_sku_old._id,
            });
    }, [selected_sku]);

    useEffect(() => {
        product_item &&
            selected_old &&
            setSelected_sku_old(
                product_item.sku_list.find(
                    (item) =>
                        item.sku_tier_idx.toString() === selected_old.toString()
                )
            );
    }, [selected_old]);

    const handleVariationChange = async (value, variationOrder) => {
        setSelected((s) => {
            // console.log(s)
            setSelected_old(s);
            const newArray = s.slice();
            newArray[variationOrder] = value;
            return newArray;
        });
    };
    const updateCart = async (type, data) => {
        if (type == 'updateItem') {
            const { productId, quantity, old_quantity, sku_id, sku_id_old } =
                data;
            if (quantity >= 1) {
                console.log('selected_sku_old', sku_id_old);
                await update(type, {
                    productId: productId,
                    quantity: quantity,
                    old_quantity: old_quantity,
                    sku_id: sku_id,
                    sku_id_old: sku_id_old,
                });
                setQuantity(quantity);
            }
        }
    };

    return (
        <li key={product.productId} className="flex py-4">
            <div>
                <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                        src={
                            product_item && product_item.spu_info.product_thumb
                        }
                        alt={
                            product_item && product_item.spu_info.product_thumb
                        }
                        className="h-28 w-28 border-white object-cover object-center"
                    />
                </div>
                <div className="mt-4 flex max-w-full justify-center">
                    <input
                        type="checkbox"
                        className="border-0 px-2 py-2 checked:bg-magenta-500 checked:hover:bg-magenta-400 focus:border-0 focus:ring-0 checked:focus:bg-magenta-400"
                    />
                </div>
            </div>

            <div className="ml-2 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                        <h3>
                            <a href={''}>
                                {product_item &&
                                    (product_item.spu_info.product_name.length >
                                    25
                                        ? product_item.spu_info.product_name
                                              .substr(3)
                                              .padEnd(
                                                  product_item.spu_info
                                                      .product_name.length,
                                                  '...'
                                              )
                                        : product_item.spu_info.product_name)}
                            </a>
                        </h3>
                        <div className="flex flex-col ">
                            <p className="text-md font-medium text-gray-900 dark:text-white">
                                <NumericFormat
                                    value={
                                        sku_sale
                                            ? sku_sale.price_sale
                                            : selected_sku &&
                                              selected_sku.sku_price
                                    }
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    decimalScale={0}
                                    id="price_sale"
                                    suffix={'đ'}
                                />
                            </p>
                            <p className="text-sm font-medium  text-gray-400/75 line-through decoration-rose-700 ">
                                <NumericFormat
                                    value={
                                        sku_sale &&
                                        selected_sku &&
                                        selected_sku.sku_price
                                    }
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    decimalScale={0}
                                    id="price"
                                    suffix={'đ'}
                                />
                            </p>
                        </div>
                    </div>
                    <div className="mt-1 text-sm text-gray-500 transition-colors duration-200 ease-out dark:text-gray-300">
                        {product_item &&
                            product_item.spu_info?.product_variations?.map(
                                (variation, index) => {
                                    return (
                                        <div key={index}>
                                            {sku_default && (
                                                <Listbox
                                                    value={
                                                        selected &&
                                                        selected[index]
                                                    }
                                                    onChange={(e) =>
                                                        handleVariationChange(
                                                            e,
                                                            index
                                                        )
                                                    }
                                                    key={index}
                                                >
                                                    {({ open }) => (
                                                        <>
                                                            <Listbox.Label className="mt-1 block text-sm font-medium capitalize leading-5 text-gray-900 dark:text-gray-300">
                                                                {variation &&
                                                                    variation.name}
                                                            </Listbox.Label>
                                                            <div className="relative mt-2 ">
                                                                <Listbox.Button className="relative w-full cursor-default bg-white py-1 pl-2 pr-8 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-zinc-700 focus:outline-none focus:ring-2 focus:ring-magenta-500 sm:text-sm sm:leading-5 dark:bg-zinc-700 dark:text-white">
                                                                    <span className="flex items-center">
                                                                        <span className="ml-3 block truncate capitalize italic">
                                                                            {selected &&
                                                                                product_item
                                                                                    .spu_info
                                                                                    ?.product_variations[
                                                                                    index
                                                                                ]
                                                                                    .options[
                                                                                    selected[
                                                                                        index
                                                                                    ]
                                                                                ]}
                                                                        </span>
                                                                    </span>
                                                                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                                        <ChevronUpDownIcon
                                                                            className="h-5 w-5 text-gray-400 dark:text-white"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                </Listbox.Button>

                                                                <Transition
                                                                    show={open}
                                                                    as={
                                                                        Fragment
                                                                    }
                                                                    leave="transition ease-in duration-100"
                                                                    leaveFrom="opacity-100"
                                                                    leaveTo="opacity-0"
                                                                >
                                                                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-zinc-700">
                                                                        {variation.options.map(
                                                                            (
                                                                                option,
                                                                                subindex
                                                                            ) => (
                                                                                <Listbox.Option
                                                                                    key={
                                                                                        option
                                                                                    }
                                                                                    className={({
                                                                                        active,
                                                                                    }) =>
                                                                                        classNames(
                                                                                            active
                                                                                                ? 'bg-magenta-500 text-white'
                                                                                                : 'text-gray-900 dark:text-white',
                                                                                            'relative cursor-default select-none py-1 pl-2 pr-8 transition duration-300 ease-out'
                                                                                        )
                                                                                    }
                                                                                    value={
                                                                                        subindex
                                                                                    }
                                                                                >
                                                                                    {({
                                                                                        selected,
                                                                                        active,
                                                                                    }) => (
                                                                                        <>
                                                                                            <div className="flex items-center">
                                                                                                <span
                                                                                                    className={classNames(
                                                                                                        selected
                                                                                                            ? 'font-semibold'
                                                                                                            : 'font-normal',
                                                                                                        'ml-3 block truncate capitalize text-gray-900 dark:text-white'
                                                                                                    )}
                                                                                                >
                                                                                                    {
                                                                                                        option
                                                                                                    }
                                                                                                </span>
                                                                                            </div>

                                                                                            {selected ? (
                                                                                                <span
                                                                                                    className={classNames(
                                                                                                        active
                                                                                                            ? 'text-white'
                                                                                                            : 'text-magenta-500',
                                                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                                    )}
                                                                                                >
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
                                                        </>
                                                    )}
                                                </Listbox>
                                            )}
                                        </div>
                                    );
                                }
                            )}
                    </div>
                    {/* <p className="mt-1 text-sm text-gray-500 transition-colors duration-200 ease-out dark:text-gray-300">
                    aaa
                    </p> */}
                </div>
                <div className="mt-3 flex flex-1 items-center justify-between text-sm">
                    <div className="items-center text-gray-500 transition-colors duration-200 ease-out dark:text-gray-300">
                        <div
                            className="inline-flex w-1/2 space-x-3 rounded-md shadow-sm"
                            role="group"
                        >
                            <button
                                onClick={() =>
                                    updateCart('updateItem', {
                                        productId: product.productId,
                                        quantity: _quantity - 1,
                                        old_quantity: _quantity,
                                        sku_id: selected_sku._id,
                                        sku_id_old: selected_sku_old
                                            ? selected_sku_old._id
                                            : selected_sku._id,
                                    })
                                }
                                className=" border-gray-900 bg-transparent px-2 text-sm font-medium text-gray-900 transition duration-300 ease-out hover:bg-magenta-500 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:border-magenta-500  dark:hover:text-white dark:focus:border-magenta-400 dark:focus:bg-magenta-400"
                            >
                                <MinusIcon className="h-5 w-5 text-gray-900 dark:text-white" />
                            </button>
                            {/* <input
                                type="text"
                                value={quantity && quantity}
                                defaultValue={quantity && quantity}
                                name="quantity"
                                id="quantity"
                                className="block w-full border-0  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"
                            /> */}
                            <div
                                type="number"
                                className="border-none bg-transparent px-2 py-3 text-sm font-medium text-gray-900 focus:z-10 dark:text-white"
                            >
                                {_quantity && _quantity}
                            </div>
                            <button
                                className="bg- border-gray-900 bg-transparent px-2 text-sm font-medium text-gray-900 transition duration-300 ease-out hover:bg-magenta-500 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:border-magenta-500  dark:hover:text-white dark:focus:border-magenta-400 dark:focus:bg-magenta-400"
                                onClick={() =>
                                    updateCart('updateItem', {
                                        productId: product.productId,
                                        quantity: _quantity + 1,
                                        old_quantity: _quantity,
                                        sku_id: selected_sku._id,
                                        sku_id_old: selected_sku_old
                                            ? selected_sku_old._id
                                            : selected_sku._id,
                                    })
                                }
                            >
                                <PlusIcon className="h-5 w-5 text-gray-900 dark:text-white" />
                            </button>
                        </div>
                    </div>

                    <div className="flex">
                        <button
                            onClick={() =>
                                update('deleteItem', {
                                    productId: product.productId,
                                    sku_id: selected_sku._id,
                                })
                            }
                            className="font-medium text-magenta-600 hover:text-magenta-500"
                        >
                            Xóa
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}
