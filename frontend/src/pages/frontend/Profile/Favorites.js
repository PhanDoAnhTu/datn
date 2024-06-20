import { Tab } from '@headlessui/react';
import ProductSingleList from '../../../components/frontend/ProductSingleList';
import { useDispatch, useSelector } from 'react-redux';
import {
    getWishListByUserId,
    allProducts,
    deleteWishListByUserId,
} from '../../../store/actions';
import { useEffect } from 'react';
import { getFavoritesFromLocalStorage } from '../../../utils';
import { toast } from 'react-toastify';

export default function Favorites() {
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.userReducer);
    const { wish_list } = useSelector((state) => state.wishListReducer);
    const { all_products } = useSelector((state) => state.productReducer);

    useEffect(() => {
        !all_products && dispatch(allProducts({ limit: 20, page: 1 })); ////options
        userInfo &&
            (!wish_list
                ? dispatch(
                      getWishListByUserId({
                          userId: userInfo._id,
                      })
                  )
                : // console.log(wish_list.wish_list_products.length,getFavoritesFromLocalStorage().length)&&
                  wish_list.wish_list_products.length !=
                      getFavoritesFromLocalStorage().length &&
                  dispatch(
                      getWishListByUserId({
                          userId: userInfo._id,
                      })
                  ));
    }, [userInfo, wish_list, all_products]);

    const HandleDeleteWishList = async ({ userId }) => {
        await dispatch(
            deleteWishListByUserId({
                userId: userId,
            })
        );
        toast.success('Đã xóa tất cả sản phẩm yêu thích!');
    };

    const handleReload = async () => {
        await dispatch(
            getWishListByUserId({
                userId: userInfo._id,
            })
        );
        dispatch(allProducts({ limit: 20, page: 1 }));
    };

    return (
        <Tab.Panel className={'px-7 pt-4'}>
            <div className="mb-4 grid">
                <div className="flex justify-end">
                    {wish_list && wish_list.wish_list_products?.length !== 0 ? (
                        <>
                            <button
                                onClick={() => handleReload()}
                                className="ml-3 rounded-md border-2 border-gray-900 px-3 py-2 font-semibold text-gray-900 shadow-md transition duration-500 ease-out hover:bg-gray-900 hover:text-white max-sm:text-xs dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-gray-900"
                            >
                                Làm mới
                            </button>
                            {userInfo && (
                                <button
                                    onClick={() =>
                                        HandleDeleteWishList({
                                            userId: userInfo._id,
                                        })
                                    }
                                    className="ml-3 rounded-md border-2 border-rose-500 px-3 py-2 font-semibold text-rose-500 shadow-md transition duration-500 ease-out hover:border-rose-500 hover:bg-rose-500 hover:text-white max-sm:text-xs"
                                >
                                    Xóa danh sách yêu thích
                                </button>
                            )}
                        </>
                    ) : (
                        ''
                    )}
                </div>

                {wish_list && wish_list.wish_list_products?.length > 0 ? (
                    <div className="mt-4 grid gap-2">
                        {wish_list.wish_list_products.map(
                            (product_id) =>
                                all_products &&
                                all_products.map((product, index) => {
                                    if (
                                        product._id.toString() ===
                                        product_id.toString()
                                    ) {
                                        return (
                                            <ProductSingleList
                                                product={product}
                                                key={index}
                                                reload={handleReload}
                                            />
                                        );
                                    }
                                })
                        )}
                    </div>
                ) : (
                    <div className="text-md font-bold text-gray-900 dark:text-white">
                        Hiện không có thông tin để hiển thị!
                    </div>
                )}
            </div>
        </Tab.Panel>
    );
}
