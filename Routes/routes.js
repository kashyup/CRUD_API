const express = require("express");

const router = express.Router();


const {getAllProducts,getProductById,deleteProductById,updateProductById,createProduct} = require("../controller/controller");


router.get("/",getAllProducts);

router.post("/:id",getProductById);

router.post("/",createProduct);

router.put("/:id",updateProductById);

router.delete("/:id",deleteProductById);

module.exports = router;
