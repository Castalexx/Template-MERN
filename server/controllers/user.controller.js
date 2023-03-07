const User = require('../models/users.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.KEYJWT

  const getUserByid = async(req, res) => {
    const user = req.headers.user
    User.findById(user)
    .then((userDoc) => res.json(userDoc))
  }
  const getUser = async(req, res) => {
      const token = req.headers.user
      const user = jwt.verify(token, SECRET)
      User.findById(user._id)
      .then((response) => {   
        res.json(response)
    })
    };

  const registerUser = async(req, res) => {
      try{
        const newUser = await User.create(req.body);
        console.log(newUser._id)
        const userToken = jwt.sign({_id:newUser._id}, SECRET)
        console.log(userToken)
        res.status(200).json({accessToken: userToken})
      }catch(error){
        res.status(404).json(error)
      }
    };
  
    const loginUser = async (req, res)=>{
      const user = await User.findOne({email:req.body.email})
      if(!user){
          res.status(400).json({error: "Email no existe"})
      }
      try{
          const passwordValida = await bcrypt.compare(req.body.password, user.password)
          if(!passwordValida){
              res.status(400).json({error: "Password incorrecto"})
          }else{

            const userToken = jwt.sign({_id: user._id}, SECRET) 
            res.json({accessToken: userToken}).status(200)
          }
      }catch(error){
        console.log(error)
      }
    };

    const loginUserInternal = async (req, res)=>{
      const user = await User.findOne({email:req.body.email})
      if(!user){
          res.status(400).json({error: "Email no existe"})
      }
      try{
          const passwordValida = await bcrypt.compare(req.body.password, user.password)
          if(!passwordValida){
              res.status(400).json({error: "Password incorrecto"})
          }else{
            if(!user.collaborator) {
              res.status(400).json({error:'No es colaborador'})
            } else {
              const userToken = jwt.sign({_id: user._id}, SECRET) 
              res.json({accessToken: userToken}).status(200)
              
            }
            
          }
      }catch(error){
        console.log(error)
      }
    };
  
module.exports = {
  getUser, registerUser, loginUser, loginUserInternal, getUserByid
}