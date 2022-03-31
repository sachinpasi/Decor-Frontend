import { createSlice } from "@reduxjs/toolkit";
import { setCookies } from "cookies-next";
import { ICartReducer } from "../../Interfaces/typings";

const initialState: ICartReducer = {
  items: [],
};

export const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    ADD_TO_CART: (state, action) => {
      state.items = [
        ...state.items,
        {
          productId: action.payload?.id,
          name: action.payload?.name,
          price: action.payload?.price,
          image: action.payload?.photo,
          quantity: action.payload?.quantity,
          category: action.payload?.category,
        },
      ];
    },

    INCREASE_PRODUCT_QUANTITY: (state, action) => {
      const index = state.items.findIndex(
        (item: any) => item.productId === action.payload.id
      );

      const updatedItem = {
        ...state.items[index],
        quantity: state.items[index].quantity + action.payload.incrementBy,
      };

      state.items = [
        ...state.items.slice(0, index),
        updatedItem,
        ...state.items.slice(index + 1),
      ];
    },
    DECREASE_PRODUCT_QUANTITY: (state, action) => {
      const index = state.items.findIndex(
        (item: any) => item.productId === action.payload.id
      );
      const updatedItem = {
        ...state.items[index],
        quantity: state.items[index].quantity - 1,
      };

      state.items = [
        ...state.items.slice(0, index),
        updatedItem,
        ...state.items.slice(index + 1),
      ];
    },

    REMOVE_FROM_CART: (state, action) => {
      const index = state.items.findIndex(
        (item: any) => item.productId === action.payload.id
      );
      let newcart = [...state.items];

      if (index > -1) {
        newcart.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as its not in the cart`
        );
      }

      state.items = newcart;
    },
    EMPTY_CART: (state) => {
      state.items = [];
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_PRODUCT_QUANTITY,
  INCREASE_PRODUCT_QUANTITY,
  REMOVE_FROM_CART,
  EMPTY_CART,
} = cartSlice.actions;
export default cartSlice.reducer;
