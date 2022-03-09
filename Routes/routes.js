const express = require("express");

const {getAllProducts,getProductById,deleteProductById,updateProductById,createProduct} = require("../controller/controller");

const router = express.Router();

router.get("/",getAllProducts);

router.post("/:id",getProductById);

router.post("/",createProduct);

router.put("/:id",updateProductById);

router.delete("/:id",deleteProductById);

module.export = router;
