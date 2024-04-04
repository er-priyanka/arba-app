const { User } = require('../Models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserController = {
    async register(req, res){
        // register
        const {
            fullName, 
            userName, 
            email, 
            password, 
            avatar } = req.body;

        try{

            const existingUser = await User.findOne({email});
            if(existingUser){
                return res.status(400).json({message: "Email is already exist!"});
            }

            bcrypt.hash(password, 8, async(err, hash)=>{
               
                const newUser = new User({
                    fullName,
                    userName,
                    email,
                    password: hash,
                    avatar
                });

                await newUser.save();
                res.status(201).json({
                    message: "User created successfully!",
                    newUser
                })
            })
        }catch(err){
            // console.log(err);
            res.status(401).json({
                message: err.message
            });
        }
    },

    async login(req, res){
        // login
        const {email, password} = req.body;

        try{
            const user = await User.findOne({email});
            console.log(user)
            if(!user){
               return res.status(401).json({message: "Invalid credentials!"}); 
            }

            const checkPassword = await bcrypt.compare(password, user.password);

            if(!checkPassword){
                return res.status(401).json({message: "Invalid credentials!"});
            }

            const token = jwt.sign({
                userID: user._id
            }, process.env.JWT_KEY)

            res.status(200).json({
                message: "Login successful",
                token
            })

        }catch(err){
            res.status(401).json({
                message: err.message
            })
        }
    },

    async getProfile(req, res){
        // get profile

        
    },

    async updateProfile(req, res){
        // update profile
    },

    async changePassword(req, res){
        // change password
    },
    async logout(req, res){
        // logout
    }
}

module.exports = { UserController };