import { createContext, useState, useContext } from 'react';

const ProductDetailContext = createContext();

export const useProductDetail = () => useContext(ProductDetailContext);

export const ProductDetailProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [product_id, setSelectedProduct] = useState(null);

    const openModal = (product) => {
        setIsModalOpen(true);
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <ProductDetailContext.Provider
            value={{ isModalOpen, product_id, openModal, closeModal }}
        >
            {children}
        </ProductDetailContext.Provider>
    );
};

export default ProductDetailContext;
