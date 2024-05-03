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




require("./passport");

app.use(passport.initialize());
app.use(passport.session());

const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions'});

app.use(session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store:  sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

const index_routes = require('./routers/index');
const users_routes = require('./routers/users');
const login_routes = require('./routers/auth');
app.use("/", index_routes);
app.use("/users", users_routes);
app.use("/", login_routes);




app.listen(process.env.PORT, ()=>{
    console.log("server started!");
})