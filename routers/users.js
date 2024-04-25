const express = require('express');
const router = express.Router();
var crypto = require("crypto");

const Users = require("../models/users.js");

// let users = [1,2,3,4,5];

router.get("/", async (req, res)=>{
    let users = await Users.find({});
    // console.log(users);
    res.render('users', {title: "Users page", users: users});
});

router.post("/", async (req, res) => {
    
    let id = crypto.randomBytes(20).toString('hex');

    const user = new Users({
        "username": "ivn",
        "hash": "spdlifjisdjf",
        "salt": "sdfh328"
    });

    await user.save();

    //console.log(user);

    res.json(user);
});

module.exports = router
