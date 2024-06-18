// components
// import { NavLink } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import DocumentTitle from '../../../components/frontend/DocumentTitle';
import { useEffect } from 'react';

const RegisterComplete = () => {

    useEffect(() => {
        var countDownDate = new Date().getTime() + (1000 * 60 * 2);

        // cập nhập thời gian sau mỗi 1 giây
        var x = setInterval(function () {

            // Lấy thời gian hiện tại
            var now = new Date().getTime();

            // Lấy số thời gian chênh lệch
            var distance = countDownDate - now;

            // Tính toán số ngày, giờ, phút, giây từ thời gian chênh lệch
            // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // HIển thị chuỗi thời gian trong thẻ p
            document.getElementById("time_out_verify_email").innerHTML = minutes + "Phút " + seconds + "Giây ";

            // Nếu thời gian kết thúc, hiển thị chuỗi thông báo
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("time_out_verify_email").innerHTML = "Thời gian đếm ngược đã kết thúc";
            }
        }, 1000);
    }, [])

    return (
        <>
            <DocumentTitle title="Đăng ký thành công" />
            <div className="flex flex-col items-center justify-center py-40 px-60">
                <div className="flex flex-col items-center justify-center space-y-12">
                    <h2 className="text-2xl font-bold  text-gray-900 md:text-2xl dark:text-white">
                        Chúng tôi đã gửi thư đến địa chỉ email của bạn. <br />Vui lòng xác nhận email trong 2 phút để hoàn tất đăng ký tài khoản!
                    </h2>
                    <div id='time_out_verify_email' className='text-cyan-400 text-2xl font-bold '></div>
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
                </div>
            </div>
        </>
    );
};

export default RegisterComplete;
