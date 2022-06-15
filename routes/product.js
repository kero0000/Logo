const Product = require("../models/Product");
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

// CREATE A NEW PRODUCT
router.post("/", verifyTokenAndAdmin, async (req, res) =>{
    const newProduct = new Product(req.body);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
})

// UPDATE A PRODUCT
router.put("/:id", verifyTokenAndAdmin, async (req, res) =>{
    try{
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set : req.body,
            },
            {new:true}
        );
        res.status(200).json(updateProduct);
    }catch(err){
        res.status(500).json(err);
    }
})

//DELETE A PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async(req, res) =>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted successfully!");
    }catch(err){
        res.status(500).json(err);
    }
})

//GET PRODUCT
router.get("/find/:id", async(req,res) => {
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    }catch(err){
        res.status(500)(err);
    }
})

//GET ALL PRODUCT
router.get("/", async(req, res) => {
    // fetch new products
    const queryNew = req.query.new;
    // fetch products by categories
    const qCategory = req.query.category;
    try{
        let products;

        if(queryNew){
            products = await Product.find().sort({createdAt: -1}).limit(1);
        }else if (qCategory){
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        }else{
            // return ALL products
            products = await Product.find()
        }
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;