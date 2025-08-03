const express = require('express');
const authRoute = require("./routes/authRoute");

const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv')
dotenv.config();
app.use(express.json());
const router = express();
app.use( '/api',authRoute);
const { validateJwtToken } = require('./middlewares/jwt');

mongoose.connect(process.env.MONGO_URI).then( ()=>{
    console.log("MongoDb connected sucessfully"),
    app.listen(process.env.PORT , ()=>{
        console.log(`Server running on ${process.env.PORT}`);
    })
});