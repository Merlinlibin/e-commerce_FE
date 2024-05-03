const initialState = {
  products: [],
  singleProd: {},
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_PRODUCT":
      return { ...state, products: action.payload };
    case "T_SHIRT":
      return {
        ...state,
        products: action.payload.filter(
          (product) => product.category === "T-SHIRT"
        ),
      };
    case "CASUAL_PANTS":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.category === "CASUAL-PANT"
        ),
      };
    case "CARGO_PANTS":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.category === "CARGO-PANT"
        ),
      };
    case "TRACK_PANTS":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.category === "TRACK-PANT"
        ),
      };
    case "SINGLE_PROD":
      return {
        ...state,
        singleProd: action.payload,
      };
    default:
      return state;
  }
};
