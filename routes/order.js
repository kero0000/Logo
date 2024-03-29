const Order = require("../models/Order");

const router = require("express").Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

//CREATE
router.post("/", verifyToken, async(req, res) => {
    const newOrder = new Order({userId:req.body.userId,
                                customerName:req.body.customerName,
                                products:req.body.products,
                                amount:req.body.amount,
                                address:req.body.address});


    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder._id);
    }catch(err){
        res.status(500).json(err);
    }
})

//UPDATE 
router.put("/:id", verifyTokenAndAdmin, async(req, res) => {
    try{
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {$set : req.body},
            {new:true}
        );

        res.status(200).json(updatedOrder);
    }catch(err){
        res.status(500).json(err);
    }
})

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async(req, res) => {
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted successfully");
    }catch(err){
        res.status(500).json(err);
    }
})

// GET ORDER 
router.get("/find/:id", verifyTokenAndAuthorization, async(req, res) => {
    try{
        const orders = await Order.find({userId: req.params.id});
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
})

//GET ALL
router.get("/", verifyTokenAndAdmin, async(req, res) => {
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
})
//GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async(req, res) => {
    const date = new Date();
    const previousMonth = new Date(new Date().setMonth(date.getMonth() - 1));
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));

try{
    const income = await Order.aggregate([
        {$match: {createdAt: {$gte:previousMonth}}},
        {
            $project: {
                month:{  $month: "$createdAt"},
                sales: "$amount"
            },
        },
        {
            $group:{
                _id:"$month",
                total:{$sum: "$sales"},
            },
        },
    ]);
    res.status(200).json(income)
}catch(err){
    res.status.json(err);
}

})


module.exports = router;