import ReactDOM from 'react-dom/client';
import './main.css';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
// import store from './redux/store.js';  //không dùng nữa

import { RouterProvider, } from 'react-router'
import React from 'react';
import router from './router/index.js';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
