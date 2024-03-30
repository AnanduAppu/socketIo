const asyncHandlers = require('express-async-handler')
const userModel = require('../Model/userModel')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");


const registration = asyncHandlers(async(req,res)=>{
    console.log("we are in registration")

    console.log( req.body.formData)
    const {name,email,password,pic} = req.body.formData

    const userExist = await userModel.findOne({email}) 

    if(userExist){
        res.status(400).json({
            message:"user already exist",
            status:false
        })
        return
    }


    const user = await userModel.create({
        name , email,password,pic
    })

    res.status(200).json({
        message:"user created",
        Data:user,
        status:true
    })
})


const loginUser = asyncHandlers(async(req,res)=>{
    const {email,password} = req.body

    console.log("helow")

    const existUser = await userModel.findOne({email})
    if(!existUser){
        res.status(400).json({
            message:"user  not exist",
            status:false
        })
        return
    }
    const result = await bcrypt.compare(password, existUser.password)
    if (!result) {
        res.status(401).json({
            status:false,
            message:"password is failed"
        })
    }

    const id = existUser._id
    const userToken = jwt.sign({id},process.env.secretKey)

    res.cookie("userToken",userToken)

    res.status(200).json({
        status:true,
        data:existUser,
        message:"login successfull"
    })

})


const allUsers = asyncHandlers(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  });

module.exports ={
    registration ,
    loginUser,
    allUsers
}