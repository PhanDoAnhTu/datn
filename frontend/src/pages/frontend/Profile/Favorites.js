import { Tab } from '@headlessui/react';
import Pagination from '../../../components/frontend/Pagination';
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
        !all_products && dispatch(allProducts({ limit: 20, page: 1 }));
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
        <Tab.Panel className={'p-3 px-7'}>
            <div className="mb-4 grid gap-y-4">
                <div className="flex justify-end">
                    {wish_list && wish_list.wish_list_products?.length !== 0 ? (
                        <>
                            <button
                                onClick={() => handleReload()}
                                className="ml-3 border-2 border-white px-3  py-2 font-semibold text-white transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 max-sm:text-xs"
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
                                    className="ml-3 border-2 border-magenta-500 px-3  py-2 font-semibold text-magenta-500 transition duration-500 ease-out hover:border-rose-500 hover:text-rose-500 max-sm:text-xs"
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
                    wish_list.wish_list_products.map(
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
                    )
                ) : (
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                        Hiện không có thông tin để hiển thị!
                    </div>
                )}
            </div>
            {wish_list && wish_list.wish_list_products?.length !== 0 ? (
                <Pagination />
            ) : (
                ''
            )}
        </Tab.Panel>
    );
}
