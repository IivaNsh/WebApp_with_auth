const mongoose = require('mongoose');
const connection = require("../database");

const userSchema = new mongoose.Schema({
    "username": {type: String, required: true},
    "hash": {type: String, required: true},
    "salt": {type: String, required: true}
});

const Users =  connection.model("users", userSchema);

module.exports = Users;