require('dotenv').config();
const path = require("path");

//const cors = require('cors');
const express = require('express');
const app = express();

const session = require("express-session");
var passport = require("passport");
var crypto = require("crypto");
var connection = require("./database.js");

const MongoStore = require("connect-mongo")(session);

app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(express.static(path.join(__dirname, 'public')))
//app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions'});

app.use(session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store:  sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));


const routers = require('./routers');
app.use(routers);




app.listen(process.env.PORT, ()=>{
    console.log("server started!");
})