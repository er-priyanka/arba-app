require('dotenv').config();
const jwt = require("jsonwebtoken");

export const authenticate = (req, res, next) =>{
    const token = req.headers['authorization'];

    if(!token){
        return res.status(401).json({message: "Unauthorized user!"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY);

    }catch(err){
        return res.status(403).json({message: "Invalid token"});
    }
}