import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { productById } from '../../../store/actions';
import ProductOption from "../listBox/ProductOptions";
import { NumericFormat } from "react-number-format";

export default function CartPopoverItem({ product }) {
    const dispatch = useDispatch();
    // const { current_product } = useSelector((state) => state.productReducer);
    // const { spu_info, sku_list } = current_product;
    const [product_item, setProductItem] = useState(null)

    const [sku_option, setSku_option] = useState(null)
    const productItemApi = async () => {
        const respon = await dispatch(productById({ spu_id: product.productId }))
        console.log('respon', respon)
        setProductItem(respon.payload.metaData)
        setSku_option(respon && respon.payload.metaData.sku_list.find((item) => item._id.toString() === product.sku_id.toString()))
    }
    useEffect(() => {
        if (!product_item) {
            productItemApi()
        }
    }, [product.productId])
    console.log(sku_option)

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
                                    value={product_item && product_item.spu_info.product_price}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    decimalScale={0}
                                    id="price"
                                    suffix={'đ'}
                                />
                            </p>
                            <p className="text-sm font-medium  text-gray-400/75 line-through decoration-rose-700 ">
                                <NumericFormat
                                    value={product_item && product_item.spu_info.product_price}
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
                                    {sku_option && <ProductOption variation={variation} key={index} sku_tier_idx={sku_option.sku_tier_idx[index]} />}
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
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                            <button type="button" className="py-3 px-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                -
                            </button>
                            <div type="number" className="py-3 px-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                {product && product.quantity}
                            </div>
                            <button type="button" className="py-3 px-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                +
                            </button>
                        </div>
                    </p>

                    <div className="flex">
                        <button
                            type="button"
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
