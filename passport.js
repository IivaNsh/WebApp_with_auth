const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('./models/users');

const validatePassword = require('./password').validatePassword;

const customFeilds = {
    usernameField: "username",
    passwordField: "password"
};

const verifyCallback =  (username, password, done) => {
    User.findOne({ username: username})
    .then((user) => {
        console.log(user);
        if( !user ) {
            console.log("user not found");
            return done(null, false); }

        const isValid = validatePassword(password, user.hash, user.salt);
        if( isValid ) {
            console.log("all good");
            
            return done(null, user);
        }
        else{
            console.log("not valid password for user");
            return done(null, false)
        }

    })
    .catch((err)=>{
        done(err);
    });
};

const strategy = new LocalStrategy(customFeilds, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( (userId, done) => {
    User.findById(userId)
    .then(( user) => {
        done(null, user);
    })
    .catch( err => done(err));
});