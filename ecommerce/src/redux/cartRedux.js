import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState: {
        products:[], // this array stores all the products and their properties(_id, img, desc....)
        quantity:0, // cartQuantity
        total:0,
    },
    reducers:{
        addProducts: (state,action) => {
            state.quantity += 1; // cart quantity
            state.products.push(action.payload);
            state.total+=action.payload.price*action.payload.quantity;
        },

        removeProducts: (state, action) => {
            state.quantity = state.quantity - 1;
            state.products = state.products.filter((x) => x._id !== action.payload._id)
            state.total = state.total - action.payload.price*action.payload.quantity
        },

        clearCart: (state) => {
            state.quantity = 0;
            state.products = [];
            state.total=0
        }
    },
});

export const { addProducts, removeProducts, clearCart } = cartSlice.actions;
export default cartSlice.reducer;