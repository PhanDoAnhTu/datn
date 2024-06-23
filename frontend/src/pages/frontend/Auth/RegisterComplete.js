// components
// import { NavLink } from 'react-router-dom';
import { NavLink, useParams } from 'react-router-dom';
import DocumentTitle from '../../../components/frontend/DocumentTitle';
import { useEffect, useState } from 'react';
import Loading from '../../../assets/Loading';
import { ReactComponent as Check } from '../../../assets/Check.svg';

const RegisterComplete = () => {


    const { status } = useParams()
    const [title, setTitle] = useState(" Chúng tôi đã gửi thư đến địa chỉ email của bạn. Vui lòng xác nhận email trong 2 phút để hoàn tất đăng ký tài khoản!")

    useEffect(() => {
        // var countDownDate = new Date().getTime() + (1000 * 60 * 2);

        // // cập nhập thời gian sau mỗi 1 giây
        // var x = setInterval(function () {

        //     // Lấy thời gian hiện tại
        //     var now = new Date().getTime();

        //     // Lấy số thời gian chênh lệch
        //     var distance = countDownDate - now;

        //     // Tính toán số ngày, giờ, phút, giây từ thời gian chênh lệch
        //     // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        //     // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        //     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        //     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        //     // HIển thị chuỗi thời gian trong thẻ p
        //     document.getElementById("time_out_verify_email").innerHTML = minutes + "Phút " + seconds + "Giây ";

        //     // Nếu thời gian kết thúc, hiển thị chuỗi thông báo
        //     if (distance < 0) {
        //         clearInterval(x);
        //         document.getElementById("time_out_verify_email").innerHTML = "Thời gian đếm ngược đã kết thúc";
        //     }
        // }, 1000);

        if (status) {
            setTitle("Chúc mừng bạn đã tạo tài khoản thành công, hãy bắt đầu đăng nhập để mua hàng nhé!")
        }
    }, [])

    return (
        <>
            <DocumentTitle title="Xác nhận email" />

            <div className="flex h-screen justify-center overflow-hidden pb-7 pt-10 text-white md:pt-24">
                <DocumentTitle title="Xác nhận đơn hàng" />

                <div className="mt-24 flex flex-col ">
                    {!status ? (
                        <div className="flex flex-col items-center space-y-2">
                            <Loading className={'h-44 w-44'} />
                            <span className="text-center text-2xl font-bold text-gray-900 dark:text-white">
                                {title}
                            </span>
                            <span className=" text-center text-xl max-md:text-sm">
                                <div className="group relative flex items-center justify-center">
                                    <div
                                        className={`max-sm:text-md pointer-events-none relative z-10 px-10 py-7 text-xl font-bold text-white transition duration-300 ease-out group-hover:text-gray-900 max-sm:px-8 max-sm:py-7 dark:text-gray-900 dark:group-hover:text-white`}
                                    >
                                        Trở về trang đăng ký
                                    </div>
                                    <NavLink
                                        to="/dang-ky"
                                        on
                                        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full border-2 bg-zinc-500 transition duration-300 ease-out group-hover:-skew-x-12 group-hover:-skew-y-6 group-hover:bg-magenta-500 dark:bg-white"
                                    ></NavLink>
                                </div>
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-2">
                            <Check className="h-28 w-28 animate-bounce" />

                            <span className="text-center text-2xl font-bold text-gray-900 dark:text-white">
                                {title}
                            </span>

                            <span className=" text-center text-xl max-md:text-sm">
                                <div className="group relative flex items-center justify-center">
                                    <div
                                        className={`max-sm:text-md pointer-events-none relative z-10 px-10 py-7 text-xl font-bold text-white transition duration-300 ease-out group-hover:text-gray-900 max-sm:px-8 max-sm:py-7 dark:text-gray-900 dark:group-hover:text-white`}
                                    >
                                        Trở về trang đăng nhập
                                    </div>
                                    <NavLink
                                        to="/dang-nhap"
                                        on
                                        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full border-2 bg-zinc-500 transition duration-300 ease-out group-hover:-skew-x-12 group-hover:-skew-y-6 group-hover:bg-magenta-500 dark:bg-white"
                                    ></NavLink>
                                </div>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default RegisterComplete;
