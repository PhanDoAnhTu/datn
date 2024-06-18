import { useEffect, useState } from 'react';

import MobileNavbar from '../../components/frontend/Navbar/MobileNavbar';
import PCNavbar from '../../components/frontend/Navbar/PCNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../store/actions';
import { findMenuByPosition } from '../../store/actions/menu-actions';

export default function Header() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const { category } = useSelector((state) => state.categoryReducer);
    const { navbar } = useSelector((state) => state.menuReducer);
    useEffect(() => {
        if (!category) dispatch(getAllCategory());
        if (!navbar) dispatch(findMenuByPosition({ menu_position: 'navbar' }));
    }, [category, navbar]);

    return (
        <div className="bg-white">
            {/* Mobile menu */}
            <MobileNavbar
                category={category}
                open={open}
                navbar={navbar}
                setOpen={setOpen}
            />

            <header className="relative bg-white">
                <PCNavbar
                    setOpen={setOpen}
                    category={category}
                    navbar={navbar}
                />
            </header>
        </div>
    );
}
