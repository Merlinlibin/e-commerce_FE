export const LoginUser = (user) => ({ type: "USER_LOGGED_IN", payload: user });

export const logOutUser = () => ({ type: "USER_LOGGED_OUT" });

export const getUser = (user) => ({ type: "USER_ABOUT", payload: user });

export const addToWishlistSuccess = (Count) => ({
  type: "WISHLIST_COUNT",
  payload: Count,
});
export const addToCartSuccess = (Count) => ({
  type: "Cart_COUNT",
  payload: Count,
});
