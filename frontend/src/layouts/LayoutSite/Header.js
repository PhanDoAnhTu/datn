import { useState } from 'react';

import MobileNavbar from '../../components/frontend/Navbar/MobileNavbar';
import PCNavbar from '../../components/frontend/Navbar/PCNavbar';
import { navigation } from '../../test/categories';

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-white">
            {/* Mobile menu */}
            <MobileNavbar
                navigation={navigation}
                open={open}
                setOpen={setOpen}
            />

            <header className="relative bg-white">
                <PCNavbar setOpen={setOpen} navigation={navigation} />
            </header>
        </div>
    );
}
