const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const genratetoken = (userId)=>{
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.log("hii")
    // return jwt.sign({ userId }, "test123", { expiresIn: "7d" });

     return jwt.sign({userId}, JWT_SECRET , {expiresIn : "7d"});
};
const validatetoken = (req , res , next)=>{
    console.log("step1")
    const authheader = req.headers.authorization;
    if(!authheader || !authheader.startsWith("Bearer ")){
        return res.status(401).json({message:"unathorized token missing"});
    }
    const token = authheader.split(" ")[1];
    try{
        const decode = jwt.verify(token , JWT_SECRET);
        req.user = decode;
        next();
    }
    catch(err){
        return res.status(401).json({message:"Invalid user"});
    }
}
module.exports = {validatetoken, genratetoken};