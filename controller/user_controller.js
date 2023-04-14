const db = require('../models');
const Users= db.Users;
const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
require('dotenv').config()


function generateAccessToken(email,role,is_verified) {
    return jwt.sign({ email,role,is_verified }, process.env.SECRET, { expiresIn: '2 days' });
   
  }

 

function register(req, res){
  const password = req.body.password
  const email=req.body.email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if(!emailRegex.test(email)){
        return res.status(400).json({error:"Invalid email format"})
    }
    Users.findOne({where:{email:email}}).then((user)=>{
        if(user){
            return res.status(400).json({error:"Email already exists"})
        }
      
 
  const hashed_password = CryptoJS.SHA256(password).toString();
  Users.create({email,password:hashed_password,role:"user", is_verified:0}).then((data)=>{
    let token = generateAccessToken(email, 0)
            send_mail(email, token)
      res.status(201).json(data)
  }).catch((err)=>{
      res.status(500).json({error:err.message})
  })
})}


function login(req, res){
  const email = req.body.email
  const password = req.body.password
  const hashed_password = CryptoJS.SHA256(password).toString()
  Users.findOne({where:{email,password:hashed_password}}).then((data)=>{
      const  token = generateAccessToken(email,data.role,data.is_verified)
      if(data.email===email && data.password===hashed_password){
          res.send(JSON.stringify({status: "Logged in",jwt:token}))
      } else {
          res.send(JSON.stringify({status: "Wrong credentials"}));
      }
  })
      
  }

  function send_mail(mail,token){
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "ghayamyangohar@gmail.com",
            pass: "xgnqulspfuiaolbl"
        }
    })
    
    const mailOptions = {
        from: "ghayamyangohar@gmail.com",
        to: mail,
        subject: "Sending Email using Node.js",
        text: `sexmel http://localhost:5000/verify?token=${token}`
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        } else{
            console.log(`Email sent: ` + info.response)
        }
    })
  }

  function verify(req, res){
    const token=req.query.token
    const decoded=jwt.verify(token,SECRET)
    Users.update({is_verified:1}, {where:{email:decoded.email}}).then((user)=>{
        res.send("Email verfied")
    }).catch((err)=>{
        res.status(500).send("Error verfying email")
    })
  }
 

const Sequelize = require('sequelize')
const sequelize = new Sequelize("mydb",null,null,{dialect:"sqlite", storage:"database.db"})
const SECRET = process.env.SECRET
function authenticateToken(req, res, next){
    const token= req.headers.authorization
    if(token ==  null){
        return res.sendStatus(401)
    }
    jwt.verify(token, SECRET, (err, user)=>{
        if(err){
            return res.sendStatus(403)
        }
        if(user.role !== 'admin'){
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}


  module.exports={generateAccessToken,register,login,verify}
 