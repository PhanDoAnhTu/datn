import ReactDOM from 'react-dom/client';
import './main.css';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
// import store from './redux/store.js';  //không dùng nữa

import { RouterProvider } from 'react-router';
import React from 'react';
import router from './router/index.js';
import { Suspense } from 'react';
import Loader from './components/frontend/Loader.js';
import { ThemeProvider } from './ThemeContext.js';
import { ProductDetailProvider } from './ProductModalContext.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <ProductDetailProvider>
                <Provider store={store}>
                    <Suspense fallback={<Loader />}>
                        <RouterProvider router={router} />
                    </Suspense>
                </Provider>
            </ProductDetailProvider>
        </ThemeProvider>
    </React.StrictMode>
);
