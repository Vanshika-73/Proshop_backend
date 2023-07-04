import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken= (id)=>{
    return Jwt.sign({id},process.env.SECRET_KEY,{
        expiresIn:"7d"
    });
}

export default generateToken;