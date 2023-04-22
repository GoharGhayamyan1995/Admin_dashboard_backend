const express=require('express');
const app=express();
const Sequelize = require('sequelize');
const DataTypes=require('sequelize')
app.use(express.json())
const cors = require('cors')
app.use(cors())
require("dotenv").config();
const jwt = require("jsonwebtoken");
const CryptoJS = require('crypto-js');
const sequelize=new Sequelize("mydb",null,null,{dialect:"sqlite", storage:"database.db"})
const Users = require('./models/users')(sequelize,DataTypes)
app.use('/uploads', express.static('./_uploads'));
const products = require('./models/product')
const category=require('./models/category')
const categories_routes=require('./routes/categories_routes')
const product_routes=require('./routes/products_routes')
const user_routes=require('./routes/user_routes')



    
    categories_routes.create_categories_routes(app)
    product_routes.create_products_routes(app)
    user_routes.create_users_routes(app)
    



app.get('/',(req,res)=>{
    res.send('hello world');
})
app.listen(5000,()=>{
    console.log('server running on port 5000');
});