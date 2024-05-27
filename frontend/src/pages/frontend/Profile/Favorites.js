import { Tab } from '@headlessui/react';
import Pagination from '../../../components/frontend/Pagination';
import ProductSingleList from '../../../components/frontend/ProductSingleList';
import { useDispatch, useSelector } from 'react-redux';
import { getWishListByUserId, allProducts } from '../../../store/actions';
import { useEffect } from 'react';
import { getFavoritesFromLocalStorage } from '../../../utils';
// import { toast } from 'react-toastify';

export default function Favorites() {
    const { userInfo } = useSelector((state) => state.userReducer);
    const { wish_list } = useSelector((state) => state.wishListReducer);
    const { all_products } = useSelector((state) => state.productReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        !all_products && dispatch(allProducts({ limit: 20, page: 1 }))
        userInfo && (
            !wish_list && dispatch(getWishListByUserId({
                userId: userInfo._id
            }))
        )
    }, [userInfo, wish_list, all_products])

    console.log(getFavoritesFromLocalStorage())

    // const HandleDeleteWishList = async ({ userId }) => {
    //     await dispatch(deleteWishListByUserId({
    //         userId: userInfo._id
    //     }))
    //     toast.success("Đã xóa tất cả sản phẩm yêu thích!")
    // }
    const handleReload = async () => {
        await dispatch(getWishListByUserId({
            userId: userInfo._id
        }))
    }
    return (
        <Tab.Panel className={'p-3 px-7'}>
            <div className="mb-4 grid gap-y-4 divide-y">
                {wish_list ? wish_list.wish_list_products.map((product_id) => (
                    all_products && all_products.map((product, index) => {
                        if (product._id.toString() === product_id.toString()) {
                            return (
                                < ProductSingleList
                                    product={product}
                                    key={index}
                                    reload={handleReload}
                                />
                            )
                        }
                    })

                )) : <></>}
            </div>
            <Pagination />
        </Tab.Panel>
    );
}
