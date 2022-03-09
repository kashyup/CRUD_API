const { urlencoded } = require("express");

const express = require("express");

const createError = require("http-errors");

const { append } = require("express/lib/response");

const mongoose = require("mongoose");

const common = require("./config/config.js");

const router = require("./Routes/routes");


const app = express();

app.use(express.json({extended:true}));

app.use(express.urlencoded({extended:true}));


const PORT = common.config()["PORT"];

const URL = common.config()["MONGODB_URL"];

app.use("/api",router);

app.use((request,response,next)=>{
    // const err = new Error('not found');

    // err.status = 404;
    // next(err);

    next(createError(404,'not found'));
});
app.use((error,request,response,next)=>{

    response.status(error.status||500);
    response.send({
        error:{
            status : error.status||500,
            message : error.message
        }
    });


});

console.log(PORT);

console.log(URL);



mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true})
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`app is listening on port:${PORT}`);
    })
    console.log("mongoDB Connected");
})
.catch((error)=>{
    console.log("Error",error.message);
});