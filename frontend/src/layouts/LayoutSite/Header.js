import { useEffect, useState } from 'react';

import MobileNavbar from '../../components/frontend/Navbar/MobileNavbar';
import PCNavbar from '../../components/frontend/Navbar/PCNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../store/actions';

export default function Header() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const { category } = useSelector((state) => state.categoryReducer);
    useEffect(() => {
        if (!category) dispatch(getAllCategory());
        console.log(category);
    }, [category]);

    return (
        <div className="bg-white">
            {/* Mobile menu */}
            <MobileNavbar category={category} open={open} setOpen={setOpen} />

            <header className="relative bg-white">
                <PCNavbar setOpen={setOpen} category={category} />
            </header>
        </div>
    );
}
