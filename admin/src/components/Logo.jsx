// components
import {NavLink} from 'react-router-dom';

// hooks
import {useTheme} from '@contexts/themeContext';

// utils
import {memo} from 'react';

// assets
import light from '../assets/icons/lightlogo.svg';
import dark from '../assets/icons/darklogo.svg';

const Logo = ({imgClass, textClass}) => {
    const {theme} = useTheme();

    return (
        <NavLink className="logo" to="/">
            <span className={`logo_img relative ${imgClass || ''}`}>
                <img src={light} alt="OutrunnerStore" />
                <img className={`absolute top-0 left-0 ${theme === 'light' ? 'hidden' : ''}`}
                     src={dark}
                     alt="OutrunnerStore" />
            </span>
            <h4 className={`logo_text ${textClass || ''}`}>Outrunner Store</h4>
        </NavLink>
    )
}

export default memo(Logo)