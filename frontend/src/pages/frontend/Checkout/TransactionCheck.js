import { useEffect, useState } from 'react';
import { ReactComponent as Check } from '../../../assets/Check.svg';
import Loading from '../../../assets/Loading.js';
import { useDispatch, useSelector } from 'react-redux';
import {
    checkOrderByMoMo,
    checkOrderByZaloPay,
} from '../../../store/actions/payment-actions.js';
import { useNavigate } from 'react-router';

export default function TransactionCheck() {
    const searchParams = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { status } = useSelector((state) => state.paymentReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        if (status == null) {
            searchParams.get('orderId') &&
                dispatch(
                    checkOrderByMoMo({ orderId: searchParams.get('orderId') })
                );
            searchParams.get('apptransid') &&
                dispatch(
                    checkOrderByZaloPay({
                        apptransid: searchParams.get('apptransid'),
                    })
                );
        }
        setTimeout(() => {
            status &&
                (status.resultCode === 0 || status.return_code === 1
                    ? setIsLoading(true)
                    : setIsLoading(false));
        }, 2000);
    }, [status]);

    useEffect(() => {
        if (isLoading === true) {
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }, [isLoading]);

    return (
        <div className="flex h-screen justify-center overflow-hidden pb-7 pt-10 text-white md:pt-24">
            <div className="mt-24 flex flex-col ">
                {!isLoading ? (
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
