
// components
import Logo from '../../../assets/Logo'
import { NavLink } from 'react-router-dom';

// assets
import collage from '../../../assets/collage_404.webp';

const Error = () => {
    return (
        <div className="">
            <img className="" src={collage} alt="404" />
            <div className="">
                <span className="">404</span>
                <h1 className="">Trang này không tồn tại</h1>
                <NavLink className={` btn btn--primary`} to="/">
                    Trở về trang chủ
                </NavLink>
            </div>
            <div className="">
                <Logo imgClass="" textClass="" />
            </div>
        </div>
    )
}

export default Error