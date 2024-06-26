import { useEffect, useState } from 'react';
import { ReactComponent as Check } from '../../../assets/Check.svg';
import Loading from '../../../assets/Loading.js';
import { useDispatch, useSelector } from 'react-redux';
import {
    checkOrderByMoMo,
    checkOrderByZaloPay,
} from '../../../store/actions/payment-actions.js';
import { useNavigate } from 'react-router';
import DocumentTitle from '../../../components/frontend/DocumentTitle.js';

export default function TransactionCheck() {
    const searchParams = new URLSearchParams(window.location.search);
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { status } = useSelector((state) => state.paymentReducer);

    const dispatch = useDispatch();

    //if zalopay
    // ?amount=200000
    // &appid=2554
    // &apptransid=240602_216290
    // &bankcode=CC
    // &checksum=b379b9e8d39559d9dfca37566e48ab7a4fd47b70b2e4ea0a4e3173ecb08de038
    // &discountamount=0
    // &pmcid=36
    // &status=1

    //if momo
    // ?partnerCode=MOMO
    // &orderId=MOMO1717242402161
    // &requestId=MOMO1717242402161
    // &amount=200000
    // &orderInfo=pay+with+MoMo
    // &orderType=momo_wallet
    // &transId=4052104925
    // &resultCode=0
    // &message=Thành+công.
    // &payType=qr
    // &responseTime=1717242548427
    // &extraData=
    // &signature=bbb84ba6afe4144bf8d783c1591910bea0a38a873fc04ef9a8b85a57b80e4123

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                window.location.replace('/');
            }, 2000);
        }
        if (isLoading === false) {
            setTimeout(() => {
                // navigate('/');
                // toast.error('Thanh toán thất bại');
            }, 10000);
        }
    }, [isLoading]);

    return (
        <div className="flex h-screen justify-center overflow-hidden pb-7 pt-10 text-gray-900 md:pt-24 dark:text-white">
            <DocumentTitle title="Xác nhận đơn hàng" />

            <div className="mt-24 flex flex-col ">
                {!isLoading ? (
                    <div className="flex flex-col items-center space-y-2">
                        <Loading className={'h-44 w-44 shadow-md'} />
                        <span className="text-center text-2xl font-bold">
                            CHÚNG TÔI ĐANG KIỂM TRA ĐƠN CỦA BẠN
                        </span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-2">
                        <Check className="h-28 w-28 animate-bounce shadow-md" />

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
