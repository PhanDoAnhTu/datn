import {
    HeartIcon,
    MagnifyingGlassIcon,
    ShoppingBagIcon,
} from '@heroicons/react/20/solid';

import { Link, useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList } from '../../store/actions';
import { toast } from 'react-toastify';

export default function ProductSingle({ product }) {
    const { userInfo } = useSelector((state) => state.userReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const HandleAddToWishList = async ({ userId, productId }) => {
        await dispatch(addToWishList({
            userId: userId,
            productId: productId
        }))
        toast.success("Đã thêm sản phẩm vào mục yêu thích!")
        
    }


    return (
        <div key={product._id} className="group relative py-2">
            <div className="h-56 w-40 snap-start overflow-hidden rounded-md bg-gray-200 transition-all duration-200 ease-out lg:aspect-none group-hover:opacity-75 lg:h-80 lg:w-56">
                <img
                    src={product.product_thumb}
                    alt={product.product_slug}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>

            <div className="absolute inset-y-0 z-10 hidden w-full items-center justify-center space-x-3 pt-32 xl:flex">
                <button className="group-hover:delay-50 z-10 block translate-y-4 rounded-lg bg-white p-3 text-gray-500 opacity-0 transition duration-200 ease-out hover:bg-gray-300 hover:text-xanthous-500 group-hover:-translate-y-10 group-hover:opacity-100">
                    <ShoppingBagIcon className="h-6 w-6" />
                </button>
                {userInfo ?
                    <button onClick={() => HandleAddToWishList({ userId: userInfo._id, productId: product._id })} className="z-10 block translate-y-4 rounded-lg bg-white p-3 text-gray-500 opacity-0 transition duration-200 ease-out hover:bg-gray-300 hover:text-rose-500 group-hover:-translate-y-10 group-hover:opacity-100 group-hover:delay-100 ">
                        <HeartIcon className="h-6 w-6" />
                    </button>
                    :
                    <button className="z-10 block translate-y-4 rounded-lg bg-white p-3 text-gray-500 opacity-0 transition duration-200 ease-out hover:bg-gray-300 hover:text-rose-500 group-hover:-translate-y-10 group-hover:opacity-100 group-hover:delay-100 ">
                        <HeartIcon className="h-6 w-6" />
                    </button>
                }
                <button
                    onClick={() =>
                        navigate(
                            `/:category_slug/${product.product_slug}/${product._id}`
                        )
                    }
                    className="z-10 block translate-y-4 rounded-lg bg-white p-3 text-gray-500 opacity-0 transition duration-200 ease-out hover:bg-gray-300 hover:text-gray-700 group-hover:-translate-y-10 group-hover:opacity-100 group-hover:delay-150 max-lg:hidden"
                >
                    <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
            </div>

            <div className="relative mt-2 flex w-full flex-col overflow-hidden">
                <h3 className="text-md text-ellipsis font-bold leading-5 tracking-tight text-gray-700 dark:text-white">
                    <Link
                        to={`/:category_slug/${product.product_slug}/${product._id}`}
                        className="line-clamp-2"
                    >
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.product_name}
                    </Link>
                </h3>
            </div>
            <div className="flex flex-col ">
                <p className="text-md font-medium text-gray-900 dark:text-white">
                    <NumericFormat
                        value={product.product_price}
                        displayType={'text'}
                        thousandSeparator={true}
                        decimalScale={0}
                        id="price"
                        suffix={'đ'}
                    />
                </p>
                <p className="text-sm font-medium  text-gray-400/75 line-through decoration-rose-700 ">
                    <NumericFormat
                        value={product.product_price}
                        displayType={'text'}
                        thousandSeparator={true}
                        decimalScale={0}
                        id="price"
                        suffix={'đ'}
                    />
                </p>
            </div>
        </div>
    );
}
