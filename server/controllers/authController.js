const user = require("../models/auth");
const bcrypt = require('bcryptjs');
const {genratetoken} = require("../middlewares/jwt");
const signup = async(req , res)=>{

    const {name , email , password} = req.body;
    try{
        const existuser =  await user.findOne({email});
        if(existuser){
            return res.status(201).json({message:"user already exist"});
        }
        const hashpassword = await  bcrypt.hash(password , 10);
        const newuser =   new user({name , email  , password:hashpassword});
        await newuser.save();
        console.log("just reached here")
        const token =  genratetoken(newuser._id);
        return res.status(200).json({message:" User Registred  Sucessfully" , token});

    }catch(err){
        return res.status(400).json({mesaage:'Error withh signup : ' , err});
    }
}
const login = async(req , res)=>{
    const{email , password}= req.body;
    try{
        const existuser = await user.findOne({email});
        if(!existuser) return res.status(201).json({message:"Invalid user"});
        const comparepassword = await bcrypt.compare(password  , existuser.password);
        if(comparepassword){
            const token = genratetoken(existuser._id);
            return res.status(200).json({message:"Login sucessful" ,
                 token, 

                user:{
                    id : existuser._id,
                    email : existuser.email
                }
             })
        }
    }
    catch(err){
        return res.status(400).json({message : " Login Error" , err});
    }
}
module.exports =  {signup , login};