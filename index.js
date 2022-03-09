const { urlencoded } = require("express");

const express = require("express");

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