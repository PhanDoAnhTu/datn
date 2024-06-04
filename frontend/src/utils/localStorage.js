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

///checked from cart
//checkSkuFromCart
export const checkSkuFromCart = (sku) => {
  const selected_list = getSelectedListFromCart();
  if (!selected_list.some(({sku_id}) => sku_id.toString() === sku.sku_id.toString())) {
    selected_list.push(sku);
    localStorage.setItem("selected_list_from_cart", JSON.stringify(selected_list));
  }
};

// cancelSkuFromCart
export const cancelSkuFromCart = (sku) => {
  const selected_list = getSelectedListFromCart();
  const update_selected_list = selected_list.filter(
    ({sku_id}) => sku_id.toString() !== sku.sku_id.toString()
  );
  localStorage.setItem("selected_list_from_cart", JSON.stringify(update_selected_list));
};

// SelectedAllListFromCart
export const selectedAllFromCart = (sku_list) => {
  localStorage.setItem("selected_list_from_cart", JSON.stringify(sku_list));

};
// CancelAllListFromCart
export const cancelAllFromCart = () => {
  localStorage.setItem("selected_list_from_cart", JSON.stringify([]));
};
// getSelectedListFromCart
export const getSelectedListFromCart = () => {
  const selected_listJSON = localStorage.getItem("selected_list_from_cart");
  return selected_listJSON ? JSON.parse(selected_listJSON) : [];
};
