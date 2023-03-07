const mongoose = require('mongoose');
const User = require('../models/users.model');
require('dotenv').config()
mongoose.set('strictQuery', true);

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Established a connection to the database');
  User.findOne({email: 'admin'})
  .then((res) => {
    if(res == null) {
      User.create({
        admin: true,
        name: 'admin',
        email: 'admin',
        password: process.env.PW
      })
      .then(console.log('Admin creado'))
    }else {
      console.log('Admin existente')
    }
  })
  
})
.catch(err => console.log("Something went wrong when connecting to the database", err));

                                              