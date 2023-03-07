const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    },
    
    email: {
      type: String,
      required: [true, "Email is required"]
    },
    admin: {
      type: Boolean
    }
}, {timestamps: true})

// Password encrypted
UserSchema.pre('save', async function(next){
  try{
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
  }catch{
    console.log('Error at save user')
  }
})



const User = mongoose.model('users', UserSchema);

module.exports = User