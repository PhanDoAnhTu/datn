// import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../../store/actions";
import { toast } from "react-toastify";

export default function ProductSingleList({ product, reload }) {
    const { userInfo } = useSelector((state) => state.userReducer);

    const dispatch = useDispatch();

    const HandleRemoveFromWishList = async ({ userId, productId }) => {
        console.log("product wl", productId)
        await dispatch(removeFromWishList({
            userId: userId,
            productId: productId
        }))
        reload()
        toast.success("Đã xóa sản phẩm ra mục yêu thích!")
    }

    return (
        <div
            key={product._id}
            className="flex w-full pt-6 sm:space-x-2"
        >
            <div className="h-fit w-32 overflow-hidden rounded-md md:w-40">
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

                    <div className="text-md pt-2 text-justify ">
                        Lorem ipsum dolor sit
                        amet consectetur,
                        adipisicing elit. Soluta
                        rerum asperiores
                        molestiae sit
                        accusantium consectetur.
                        Accusantium unde
                        accusamus in. Expedita
                        praesentium fuga
                        voluptatibus numquam
                        aliquid, reiciendis iste
                        ad quisquam, dolorem
                        aut, cumque dolor a eum
                        assumenda? Repellendus
                        officiis, unde a
                        consequatur provident
                        saepe, asperiores in ab
                        et est voluptatum quam!
                    </div>
                    <div className="flex justify-end space-x-2 pt-1">
                        <button className="border-2 px-3 py-2 font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 max-sm:text-xs">
                            Add to cart
                        </button>
                        {userInfo &&
                            <button onClick={() => HandleRemoveFromWishList({ userId: userInfo._id, productId: product._id })} className="border-2 px-3 py-2 font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 max-sm:text-xs">
                                Remove
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}


