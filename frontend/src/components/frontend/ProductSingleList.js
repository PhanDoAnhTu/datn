// import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, removeFromWishList } from '../../store/actions';
import { toast } from 'react-toastify';
import {
    addFavoriteToLocalStorage,
    getFavoritesFromLocalStorage,
    removeFavoriteFromLocalStorage,
} from '../../utils';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import classNames from '../../helpers/classNames';
import { useNavigate } from 'react-router';
import { NumericFormat } from 'react-number-format';
const reviews = { to: '#', average: 4, totalCount: 117 };

export default function ProductSingleList({ product, reload }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.userReducer);
    const [favories_products, setfavoriesProduct] = useState(
        getFavoritesFromLocalStorage()
    );

    const HandleRemoveFromWishList = async ({ userId, productId }) => {
        await dispatch(
            removeFromWishList({
                userId: userId,
                productId: productId,
            })
        );
        await removeFavoriteFromLocalStorage(productId);
        setfavoriesProduct(getFavoritesFromLocalStorage());
        reload && reload();
        toast.success('Đã xóa sản phẩm ra mục yêu thích!');
    };

    const HandleAddToWishList = async ({ userId, productId }) => {
        await dispatch(
            addToWishList({
                userId: userId,
                productId: productId,
            })
        );
        await addFavoriteToLocalStorage(productId);
        setfavoriesProduct(getFavoritesFromLocalStorage());
        reload && reload();
        toast.success('Đã thêm sản phẩm vào mục yêu thích!');
    };

    return (
        <div
            key={product._id}
            className="flex w-full items-center rounded-md bg-zinc-800 shadow-inner shadow-zinc-600 max-sm:flex-col "
        >
            <div
                className="h-fit overflow-hidden  rounded-md max-sm:m-2 md:w-40"
                onClick={() =>
                    navigate(`/san-pham/${product.product_slug}-${product._id}`)
                }
            >
                <img
                    src={product.product_thumb}
                    className="object-contain object-center"
                />
            </div>
            <div className="flex flex-1 px-2 text-white max-sm:w-full max-sm:px-2 max-sm:py-2">
                <div className="flex flex-1 flex-col space-y-1 overflow-hidden">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="truncate text-wrap text-sm font-bold max-sm:w-36 md:text-xl">
                                {product.product_name}
                            </h1>
                            <div className="text-md text-gray-300">Brand</div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-bold md:text-2xl">
                                <NumericFormat
                                    value={product.product_price}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    decimalScale={0}
                                    id="price"
                                    suffix={'đ'}
                                />
                            </span>
                            <span className="text-xs font-semibold line-through md:text-lg">
                                <NumericFormat
                                    value={product.product_price}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    decimalScale={0}
                                    id="price"
                                    suffix={'đ'}
                                />
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

                    <div className="grid grid-cols-2 gap-3 py-2">
                        <button className="rounded-md border-2 px-2 py-2 font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 max-sm:text-xs">
                            Thêm vào giỏ hàng
                        </button>
                        {userInfo ? (
                            favories_products.some(
                                (p_id) => p_id === product._id
                            ) == true ? (
                                <button
                                    onClick={() =>
                                        HandleRemoveFromWishList({
                                            userId: userInfo._id,
                                            productId: product._id,
                                        })
                                    }
                                    className="rounded-md border-2 px-2 py-2 font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 max-sm:text-xs"
                                >
                                    Bỏ thích
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        HandleAddToWishList({
                                            userId: userInfo._id,
                                            productId: product._id,
                                        })
                                    }
                                    className="rounded-md border-2 px-2 py-2 font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 max-sm:text-xs"
                                >
                                    Thêm vào yêu thích
                                </button>
                            )
                        ) : (
                            <button className="rounded-md  border-2 px-2 py-2 font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 max-sm:text-xs">
                                Thêm vào yêu thích
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
