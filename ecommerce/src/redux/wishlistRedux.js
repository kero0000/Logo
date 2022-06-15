import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState: {
        products:[], // this array stores all the products and their properties(_id, img, desc....)
        quantity:0, 
    },
    reducers:{
        addWishlist: (state,action) => {
            state.quantity += 1; 
            state.products.push(action.payload);
        },

        removeWishlist: (state, action) => {
            state.quantity = state.quantity - 1;
            state.products = state.products.filter(product => product._id !== action.payload._id)
        }
    },
});

export const { addWishlist, removeWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;