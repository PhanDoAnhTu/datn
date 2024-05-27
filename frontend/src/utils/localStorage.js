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
