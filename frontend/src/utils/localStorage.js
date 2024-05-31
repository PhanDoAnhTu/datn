// Add a product to a localStorage
export const addFavoriteToLocalStorage = (productId) => {
  const favorites = getFavoritesFromLocalStorage();
  if (!favorites.some((p_id) => p_id.toString() === productId.toString())) {
    favorites.push(productId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

// Remove  product from a localStorage
export const removeFavoriteFromLocalStorage = (productId) => {
  const favorites = getFavoritesFromLocalStorage();
  const updateFavorites = favorites.filter(
    (p_id) => p_id.toString() !== productId.toString()
  );
  localStorage.setItem("favorites", JSON.stringify(updateFavorites));
};

// Retrive favorites from a localStorage
export const getFavoritesFromLocalStorage = () => {
  const favoritesJSON = localStorage.getItem("favorites");
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};



////////cart
export const addCartItemToLocalStorage = (product) => {
  const cart_products = getCartFromLocalStorage();
  if (!cart_products.some((product_item) => product_item.sku_id.toString() === product.sku_id.toString())) {
    cart_products.push(product);
    localStorage.setItem("cart_products", JSON.stringify(cart_products));
  }
};

export const removeCartItemFromLocalStorage = (product) => {
  const cart_products = getCartFromLocalStorage();
  const updateCart_products = cart_products.filter(
    (product_item) => product_item.sku_id.toString() !== product.sku_id.toString()
  );
  localStorage.setItem("cart_products", JSON.stringify(updateCart_products));
};

// Retrive favorites from a localStorage
export const getCartFromLocalStorage = () => {
  const cart_productsJSON = localStorage.getItem("cart_products");
  return cart_productsJSON ? JSON.parse(cart_productsJSON) : [];
};
