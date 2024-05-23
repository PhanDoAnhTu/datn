import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { productById } from '../../../store/actions';

export default function CartPopoverItem({ product }) {
    const dispatch = useDispatch();
    // const { current_product } = useSelector((state) => state.productReducer);
    // const { spu_info, sku_list } = current_product;
    const [product_item, setProductItem] = useState(null)


    const productItemApi = async () => {
        const respon = await dispatch(productById({ spu_id: product.productId }))
        console.log('respon', respon)
        setProductItem(respon.payload.metaData)
    }
    useEffect(() => {
        if (!product_item) {
            productItemApi()
        }
    }, [product.productId])

    return (
        <li key={product.productId} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={product_item && product_item.spu_info.product_thumb}
                    alt={product_item && product_item.spu_info.product_thumb}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                        <h3>
                            <a href={''}>{product_item && product_item.spu_info.product_name}</a>
                        </h3>
                        <p className="ml-4 text-gray-900 transition-colors duration-200 ease-out dark:text-white">
                            {product_item && product_item.spu_info.product_price}
                        </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 transition-colors duration-200 ease-out dark:text-gray-300">
                        {product_item && product_item.spu_info?.product_variations?.map((variation, index1) => {
                            return (
                                <>
                                    <div key={index1}>
                                        <p> {variation.name} : {variation.options.map((option) => {
                                            return (
                                                <>
                                                    <div>{option}</div>
                                                </>
                                            )
                                        })}</p>
                                    </div>
                                </>
                            )
                        })}
                    </p>
                    {/* <p className="mt-1 text-sm text-gray-500 transition-colors duration-200 ease-out dark:text-gray-300">
                    aaa
                    </p> */}
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500 transition-colors duration-200 ease-out dark:text-gray-300">
                        Số lượng {product && product.quantity}
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
