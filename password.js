const crypto = require('crypto')

function genPassword(password){
    let salt = crypto.randomBytes(32).tiString("hex");
    let genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return { salt: salt, hash: genHash };
}

function validatePassword(password, hash, salt) {
    let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash == hashVerify;
}

module.exports.validatePassword = this.validatePassword;
module.exports.genPassword = this.genPassword;