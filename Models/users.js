const mongoose = require('mongoose'),
      users = new mongoose.Schema({
        user: String,
        role: String
      }, {collection: 'users'});

const Users = mongoose.model('Users', users);

module.exports = Users;