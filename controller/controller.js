const res = require("express/lib/response");
const createError = require("http-errors");
const { default: mongoose } = require("mongoose");
const Product =require("../model/product.model");

async function getAllProducts(request, response,next){
 try{
     const result = await Product.find({},{});

     response.send(result);
 }
 catch(error){
     console.log(error.message);
 }

}

async function getProductById(request,response,next){

    const id = request.params.id;

    try{
        const result = await Product.findOne({_id:id});
    
        if(!result){
            throw createError(404,"product does not exist");
        }
        response.send(result);
    }
    catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'invalid id'))
            return;
        }

        next(error);
    }
}

async function deleteProductById(request,response,next){

    const id = request.params.id;
    try{
        const result = await Product.findByIdAndDelete(id);
    
        if(!result){
            throw createError(404,'product does not exist');
        }
        response.send(result);

    }
    catch(error){
        console.log(error.message);

        if(error instanceof mongoose.CastError){
            next(createError(404,'invalid product id'))
            return
        }
        next(error);
    }
}
async function updateProductById(request,response,next){

    try{
        const id = request.params.id;
        const updates = request.body;
        const options= {new :true};
        const result = await Product.findByIdAndUpdate(id,updates,options);
        if(!result){
            throw createError(404,'product does not exist');
        }
        response.send(result);
    }
    catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            return next(createError(400,"invalid product id"));
        }

        next(error);
 }

}

async function createProduct(request,response,next){
    try{
        const product = new Product(request.body);
        const result = await product.save();
        response.send(result);
    }
    catch(error){
        console.log(error.message);
        if(error.name==='validation Error'){
            next(createError(422,error.message))
            return;
        }
        next(error);
        
    }

}

module.exports = {
    getAllProducts,
    getProductById,
    deleteProductById,
    updateProductById,
    createProduct
};