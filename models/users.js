const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const connection = require("../database");

const userSchema = new mongoose.Schema({
    "id": {type: String, required: true, unique: true},
    "email": {type: String, required: true},
    "password": String,
    "name": {type: String, required: true}
});

const Users =  connection.model("users", userSchema);

module.exports = Users;