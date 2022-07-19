const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId:{type:String},
        customerName: {type:String, require:true},
        products: [
            {
                productId:{
                    type:String,
                },

                title:{type:String, unique:false},
                
                quantity:{
                    type:Number,
                    default:1,
                },
            },
        ],
        amount: {type:Number, require:true},
        address:{type:String, required:true},
        status:{type:String, default:"pending"},
    },
    {timestamps:true}
);
module.exports = mongoose.model("Order", OrderSchema);