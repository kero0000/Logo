import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
    name:"checkout",
    initialState: {
        customerName:"",
        activeStep: 0,
        address:"",
    },
    reducers:{
        addAddressForm: (state,action) => {
            state.customerName = action.payload.customerName; 
            state.address = action.payload.address;
        },

        setActiveStep: (state,action) => {
            state.activeStep = action.payload;
        }
    },
});

export const { addAddressForm, setActiveStep } = checkoutSlice.actions;
export default checkoutSlice.reducer;