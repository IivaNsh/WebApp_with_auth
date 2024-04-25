const express = require('express');
const router = express.Router();
var crypto = require("crypto");

const Users = require("../models/users.js");

// let users = [1,2,3,4,5];

router.get("/", async (req, res)=>{
    let users = await Users.find({});
    console.log(users);
    res.render('users', {title: "Users page", users: users});
});

router.post("/", async (req, res) => {
    
    let id = crypto.randomBytes(20).toString('hex');

    const user = new Users({
        "id": id,
        "email": "ivansh@yandex.ru",
        "password": "1234",
        "name": "ivn"
    });

    await user.save();

    //console.log(user);

    res.json(user);
});

module.exports = router
