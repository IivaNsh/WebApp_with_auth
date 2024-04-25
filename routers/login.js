const express = require('express');
const router = express.Router();

router.get("/login", (req, res)=>{
    res.render('login');
});

router.get("/register", (req, res)=>{
    res.render('register');
});

router.post("/logout", (req, res)=>{
    res.render('logout');
});

router.get("/protected_route", (req, res)=>{
    res.render('protected_route');
});

module.exports = router