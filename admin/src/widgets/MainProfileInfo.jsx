// components
import Spring from '@components/Spring';
import InfoBtn from '@ui/InfoBtn';
import Counter from '@components/Counter';
import Trend from '@ui/Trend';
import Submenu from '@ui/Submenu';

// hooks
import { useTheme } from '@contexts/themeContext';
import useSubmenu from '@hooks/useSubmenu';

// assets
import light from '../assets/icons/lightlogo.svg';
import dark from '../assets/icons/darklogo.svg';
import { NavLink } from 'react-router-dom';

const MainProfileInfo = () => {
    const { theme } = useTheme();
    const { anchorEl, open, handleClick, handleClose } = useSubmenu();

    return (
        <Spring className="card flex flex-col gap-4 md:flex-row md:gap-[26px] lg:col-span-3 xl:col-span-2 2xl:col-span-1">
            <div className="h-[230px] rounded-md bg-body border border-input-border p-5 flex flex-col items-center
                 justify-center gap-6 shrink-0 md:w-[190px]">
                <img className="h-20 w-auto ml-2.5"
                    src={theme === 'light' ? light : dark}
                    alt="OutrunnerStore" />
                <span className="font-heading font-bold text-xl leading-[1.1] text-header">
                    OutrunnerStore
                </span>
            </div>
            <div className="flex flex-1 flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <h3>Outrunner Store - Retail</h3>
                    {/* <p>Aliquam erat volutpat. Duis molestie ultrices tempus. Mauris sem orci, euismod sit amet.</p> */}
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <h5></h5>
                        <InfoBtn onClick={handleClick} />
                    </div>
                    <div className="flex-1 grid grid-cols-1 gap-6 md:grid-cols-2 lg:flex justify-between xl:max-w-[670px]">
                        <div className="flex gap-5">
                            <div className="badge-icon bg-green">
                                <i className="icon-diamond text-[23px] mt-1" />
                            </div>
                            <div>
                                <Counter className="block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]"
                                    num={0}
                                    prefix="đ" />
                                <span className="block label-text mb-2">Doanh thu</span>
                                <Trend value={0} />
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="badge-icon bg-red">
                                <i className="icon-tax text-lg" />
                            </div>
                            <div>
                                <Counter className="block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]"
                                    num={0}
                                    prefix="đ" />
                                <span className="block label-text mb-2">Chi phí</span>
                                <Trend value={0} />
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="badge-icon bg-accent">
                                <i className="icon-barcode" />
                            </div>
                            <div>
                                <Counter className="block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]"
                                    num={0} />
                                <span className="block label-text mb-2">Hóa đơn mới</span>
                                <Trend value={0} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Submenu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <div className="flex flex-col items-start gap-5 p-5">
                    <NavLink className="menu-btn subheading-2" to="/seller-profile">
                        <span className="icon-wrapper">
                            <i className="icon icon-chart-pie-solid" />
                        </span>
                        View Profile
                    </NavLink>
                    <button className="menu-btn subheading-2">
                        <span className="icon-wrapper">
                            <i className="icon icon-link-solid" />
                        </span>
                        Contacts
                    </button>
                    <button className="menu-btn subheading-2">
                        <span className="icon-wrapper">
                            <i className="icon icon-share-solid" />
                        </span>
                        Share
                    </button>
                </div>
            </Submenu>
        </Spring>
    )
}

export default MainProfileInfo