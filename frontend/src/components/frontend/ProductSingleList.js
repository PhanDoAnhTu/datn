// import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeFromWishList } from "../../store/actions";
import { toast } from "react-toastify";
import { addFavoriteToLocalStorage, getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from "../../utils";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import classNames from "../../helpers/classNames";
import { useNavigate } from "react-router";
const reviews = { to: '#', average: 4, totalCount: 117 };

export default function ProductSingleList({ product, reload }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.userReducer);
    const [favories_products, setfavoriesProduct] = useState(getFavoritesFromLocalStorage())

    const HandleRemoveFromWishList = async ({ userId, productId }) => {
        await dispatch(removeFromWishList({
            userId: userId,
            productId: productId
        }))
        await removeFavoriteFromLocalStorage(productId)
        setfavoriesProduct(getFavoritesFromLocalStorage())
        reload && reload()
        toast.success("Đã xóa sản phẩm ra mục yêu thích!")
    }

    const HandleAddToWishList = async ({ userId, productId }) => {
        await dispatch(addToWishList({
            userId: userId,
            productId: productId
        }))
        await addFavoriteToLocalStorage(productId)
        setfavoriesProduct(getFavoritesFromLocalStorage())
        reload && reload()
        toast.success("Đã thêm sản phẩm vào mục yêu thích!")
    }

    return (
        <div
            key={product._id}
            className="flex w-full pt-6 sm:space-x-2"
        >
            <div className="h-fit w-32 overflow-hidden rounded-md md:w-40" onClick={() =>
                navigate(
                    `/san-pham/${product.product_slug}-${product._id}`
                )
            }>
                <img
                    src={product.product_thumb}
                    className="object-contain object-center"
                />
            </div>
            <div className="flex flex-1 text-white">
                <div className="flex flex-1 flex-col space-y-1 overflow-hidden px-2">
                    <div className="flex">
                        <div className="flex-1">
                            <h1 className="truncate text-wrap text-sm font-bold max-sm:w-36 md:text-xl">
                                {product.product_name}
                            </h1>
                            <div className="text-md text-gray-300">
                                Brand
                            </div>
                        </div>
                        <div className="flex">
                            <span className="font-bold md:text-2xl">
                                {product.product_price}
                            </span>
                            <span className="text-xs font-semibold line-through md:text-lg">
                                {product.product_price}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                                key={rating}
                                className={classNames(
                                    reviews.average > rating
                                        ? 'text-xanthous-500'
                                        : 'text-gray-200',
                                    'h-5 w-5 flex-shrink-0'
                                )}
                                aria-hidden="true"
                            />
                        ))}
                    </div>

                    <div className="text-md pt-2 text-justify ">
                        Lorem ipsum dolor sit
                    </div>
                    <div className="flex justify-end space-x-2 pt-1">
                        <button className="border-2 px-3 py-2 font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 max-sm:text-xs">
                            Add to cart
                        </button>
                        {userInfo ? (favories_products.some((p_id) => p_id === product._id) == true ?
                            <button onClick={() => HandleRemoveFromWishList({ userId: userInfo._id, productId: product._id })} className="border-2 px-3 py-2 font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 max-sm:text-xs">
                                Bỏ thích
                            </button>
                            :
                            <button onClick={() => HandleAddToWishList({ userId: userInfo._id, productId: product._id })} className="border-2 px-3 py-2 font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 max-sm:text-xs">
                                Thêm vào yêu thích
                            </button>
                        ) :
                            <button className="border-2  px-3 py-2 font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 max-sm:text-xs">
                                Thêm vào yêu thích
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}


