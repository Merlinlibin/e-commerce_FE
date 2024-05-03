export const userReducer = (
  state = {
    user: {},
    isAuthenticated: false,
    wishlistCount: 0,
    cartCount: 0,
  },
  action
) => {
  switch (action.type) {
    case "USER_LOGGED_IN":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "USER_LOGGED_OUT":
      return { ...state, user: {}, isAuthenticated: false };
    case "WISHLIST_COUNT":
      return {
        ...state,
        wishlistCount: action.payload,
      };
    case "Cart_COUNT":
      return {
        ...state,
        cartCount: action.payload,
      };
    default:
      return state;
  }
};
