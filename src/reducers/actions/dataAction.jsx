import axios from "axios";

export const ALL_PRODUCT = (data) => ({ type: "ALL_PRODUCT", payload: data });

export const T_SHIRT = (data) => ({ type: "T_SHIRT", payload: data });

export const CASUAL_PANTS = (data) => ({ type: "CASUAL_PANTS", payload: data });

export const CARGO_PANTS = (data) => ({ type: "CARGO_PANTS", payload: data });

export const TRACK_PANTS = (data) => ({ type: "TRACK_PANTS", payload: data });

export const SINGLE_PROD = (product) => ({
  type: "SINGLE_PROD",
  payload: product,
});
