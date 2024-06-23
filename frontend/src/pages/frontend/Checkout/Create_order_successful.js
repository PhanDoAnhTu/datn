import { useEffect, useState } from 'react';
import { ReactComponent as Check } from '../../../assets/Check.svg';
import Loading from '../../../assets/Loading.js';

import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteToCartItem } from '../../../store/actions/cart-actions.js';
import { getSelectedListFromCart } from '../../../utils/localStorage.js';
import DocumentTitle from '../../../components/frontend/DocumentTitle.js';

export default function CreateOrderSuccess() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.userReducer)
    const [selectedProductFromCart] = useState(getSelectedListFromCart);



    const detetedItemCart = async () => {
        for (let index = 0; index < selectedProductFromCart.length; index++) {
            const item = selectedProductFromCart[index];
            await dispatch(DeleteToCartItem({ userId: userInfo._id, productId: item.productId, sku_id: item.sku_id }))
        }
    }
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        if (isLoading == false) {
            setTimeout(() => {
                setIsLoading(true)
            }, 3000);
        }
        if (isLoading == true) {
            setTimeout(() => {
                detetedItemCart()
                toast.success("Tạo đơn hàng thành công")
                navigate('/');
            }, 2000)
        }
    }, [isLoading]);

    return (
        <div className="flex h-screen justify-center overflow-hidden pb-7 pt-10 text-white md:pt-24">
            <DocumentTitle title="Xác nhận đơn hàng" />

            <div className="mt-24 flex flex-col ">
                {isLoading == false ? (
                    <div className="flex flex-col items-center space-y-2">
                        <Loading className={'h-44 w-44'} />
                        <span className="text-center text-2xl font-bold">
                            CHÚNG TÔI ĐANG KIỂM TRA ĐƠN CỦA BẠN
                        </span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-2">
                        <Check className="h-28 w-28 animate-bounce" />

                        <span className="text-center text-2xl font-bold">
                            CẢM ƠN BẠN ĐÃ ĐẶT HÀNG
                        </span>
                        <span className="text-center text-xl max-md:text-sm">
                            Bạn sẽ được chuyển trang về trang chủ trong giây lát
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
