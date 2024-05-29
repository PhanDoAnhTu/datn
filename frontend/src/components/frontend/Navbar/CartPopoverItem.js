import { useEffect, useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { getSpecialOfferBySpuId, productById } from '../../../store/actions';
// import ProductOption from "../listBox/ProductOptions";
import { NumericFormat } from "react-number-format";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function CartPopoverItem({ product, update }) {
    const dispatch = useDispatch();

    const [product_item, setProductItem] = useState(null)
    const [sku_option, setSku_option] = useState(null)
    //sale
    const [spicial_offer, setSpicial_offer] = useState(null);
    const [selected, setSelected] = useState(null)
    const [sale_sku, setSale_sku] = useState(null);
    //
    const [selected_sku, setSelected_sku] = useState(null)

    const [quantity, setQuantity] = useState(null)

    const productItemApi = async () => {
        const respon = await dispatch(productById({ spu_id: product.productId }))
        console.log('respon', respon)
        setProductItem(respon.payload.metaData)
        setSku_option(respon && respon.payload.metaData.sku_list.find((item) => item._id.toString() === product.sku_id.toString()))
    }
    const saleApi = async () => {
        const fetch_spicial_offer = await dispatch(getSpecialOfferBySpuId({ spu_id: product.productId }))
        setSpicial_offer(fetch_spicial_offer.payload.metaData)
    }

    useEffect(() => {
        if (!product_item) {
            productItemApi()
        }
        product && (
            !quantity && setQuantity(product.quantity)
        )
    }, [product, quantity])


    useEffect(() => {
        if (!spicial_offer) {
            saleApi()
        }
    }, [spicial_offer])

    useEffect(() => {
        selected && (
            spicial_offer && spicial_offer.special_offer_spu_list.filter((spu) => {
                if (spu.product_id.toString() === product.productId.toString()) {
                    return spu.sku_list.filter((sku) => {
                        if (sku.sku_tier_idx.toString() === selected.toString()) {
                            setSale_sku(sku)
                            return
                        }
                    })
                }
            })
        )
    }, [selected, spicial_offer])

    useEffect(() => {
        sku_option && setSelected(sku_option.sku_tier_idx)
        console.log('sku_option', sku_option)

    }, [sku_option])

    useEffect(() => {
        product_item && (
            selected && setSelected_sku(product_item.sku_list.find((item) => item.sku_tier_idx.toString() === selected.toString()))
        )
    }, [selected])

    useEffect(() => {
        console.log("selected", selected)
        console.log('sale_sku', sale_sku)
        console.log('selected_sku', selected_sku)
        selected_sku && updateCart("updateItem", { productId: product.productId, quantity: quantity, old_quantity: quantity, sku_id: selected_sku._id })
    }, [selected_sku])


    const handleVariationChange = async (value, variationOrder) => {
        setSelected((s) => {
            const newArray = s.slice();
            newArray[variationOrder] = value;
            return newArray
        })
    }

    const updateCart = async (type, data) => {

        if (type == "updateItem") {
            const { productId, quantity, old_quantity, sku_id } = data
            setQuantity(quantity)
            await update(type, {
                productId: productId, quantity: quantity, old_quantity: old_quantity, sku_id: sku_id
            })

        }
    }

    return (
        <li key={product.productId} className="flex py-4">
            <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={product_item && product_item.spu_info.product_thumb}
                    alt={product_item && product_item.spu_info.product_thumb}
                    className="h-28 w-28 object-cover object-center border-white"
                />
            </div>

            <div className="ml-2 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                        <h3>
                            <a href={''}>{product_item && (
                                product_item.spu_info.product_name.length > 25 ? product_item.spu_info.product_name.substr(3).padEnd(product_item.spu_info.product_name.length, '...') : product_item.spu_info.product_name
                            )}</a>
                        </h3>
                        <div className="flex flex-col ">
                            <p className="text-md font-medium text-gray-900 dark:text-white">
                                <NumericFormat
                                    value={sale_sku ? sale_sku.price_sale : (product_item && product_item.spu_info.product_price)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    decimalScale={0}
                                    id="price"
                                    suffix={'đ'}
                                />
                            </p>
                            <p className="text-sm font-medium  text-gray-400/75 line-through decoration-rose-700 ">
                                <NumericFormat
                                    value={sale_sku && (product_item && product_item.spu_info.product_price)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    decimalScale={0}
                                    id="price"
                                    suffix={'đ'}
                                />
                            </p>
                        </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 transition-colors duration-200 ease-out dark:text-gray-300">
                        {product_item && product_item.spu_info?.product_variations?.map((variation, index) => {
                            return (
                                <>
                                    {/* {sku_option && <ProductOption variation={variation} key={index} sku_tier_idx={sku_option.sku_tier_idx[index]} changeSku={setSelectedSKU} />} */}
                                    {sku_option && (
                                        <Listbox value={selected && selected[index]} onChange={(e) => handleVariationChange(e, index)} key={index}>
                                            {({ open }) => (
                                                <>
                                                    <Listbox.Label className="block text-sm font-medium leading-5 text-white-900">{variation && variation.name}</Listbox.Label>
                                                    <div className="relative mt-2 ">
                                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1 pl-2 pr-8 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-5">
                                                            <span className="flex items-center">
                                                                <span className="ml-3 block truncate">{selected && product_item.spu_info?.product_variations[index].options[selected[index]]}</span>
                                                            </span>
                                                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            </span>
                                                        </Listbox.Button>

                                                        <Transition
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                {variation.options.map((option, subindex) => (
                                                                    <Listbox.Option
                                                                        key={option}
                                                                        className={({ active }) =>
                                                                            classNames(
                                                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                                'relative cursor-default select-none py-1 pl-2 pr-8'
                                                                            )
                                                                        }
                                                                        value={subindex}
                                                                    >
                                                                        {({ selected, active }) => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                                    <span
                                                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                                    >
                                                                                        {option}
                                                                                    </span>
                                                                                </div>

                                                                                {selected ? (
                                                                                    <span
                                                                                        className={classNames(
                                                                                            active ? 'text-white' : 'text-indigo-600',
                                                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                        )}
                                                                                    >
                                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                    </span>
                                                                                ) : null}
                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                ))}
                                                            </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </>
                                            )}
                                        </Listbox>
                                    )}

                                </>
                            )
                        })}
                    </p>
                    {/* <p className="mt-1 text-sm text-gray-500 transition-colors duration-200 ease-out dark:text-gray-300">
                    aaa
                    </p> */}
                </div>
                <div className="flex flex-1 items-end justify-between text-sm mt-3">
                    <p className="text-gray-500 transition-colors duration-200 ease-out dark:text-gray-300">
                        Số lượng
                        <div className="inline-flex rounded-md shadow-sm w-1/2" role="group">
                            <button className="py-3 px-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                -
                            </button>
                            <input
                                type="text"
                                value={quantity && quantity}
                                name="quantity"
                                id="quantity"
                                className="block w-full border-0  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"
                            />
                            {/* <div type="number" className="py-3 px-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                {quantity && quantity}
                            </div> */}
                            <button className="py-3 px-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                                onClick={() => updateCart("updateItem", {
                                    productId: product.productId, quantity: quantity + 1, old_quantity: quantity, sku_id: sku_option._id
                                })}
                            >
                                +
                            </button>
                        </div>
                    </p>

                    <div className="flex">
                        <button
                            onClick={() => update("deleteItem", { productId: product.productId })}
                            className="text-magenta-600 hover:text-magenta-500 font-medium"
                        >
                            Xóa
                        </button>
                    </div>

                </div>
            </div>
        </li>
    );
}