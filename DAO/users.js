const users = require('../Models/users'),
    Validation = require('../validation'),
    validation = new Validation();

module.exports = class Users {
    checkUser(user) {
        return users.findOne({
            user: user
        }).then(user => {
            return validation.checkUser(user);
        }).catch(err => err => console.log(err));
    }
};