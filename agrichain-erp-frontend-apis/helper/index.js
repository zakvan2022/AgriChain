var jwt = require('jsonwebtoken');
var moment = require('moment');
var CryptoJS = require("crypto-js");
var dotenv = require('dotenv').config();

module.exports = {
    issueJWT: function (user) {
        var payload = {
            email: user.email,
            type: user.type
        }

        var options = {
            audience: process.env.JWT_AUDIENCE,
            expiresIn: process.env.JWT_EXPIRY,
        }

        var jwtToken = jwt.sign(payload, process.env.JWT_KEY, options);
        return jwtToken;
    },
    verifyJWT: function (bearer) {
        var token = bearer.split(" ")[1];

        var verify = jwt.verify(token, process.env.JWT_KEY, {
            audience: process.env.JWT_AUDIENCE
        });

        return verify;
    },
    date: function() {
        return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    },

    create_output : function() {
        
    },
    remove_unnecessary: function(json, required_key_arr) {

    },
    encode_url_safe(input) {
        return encodeURI(this.encode(input));
    },
    encode: function(input) {
        return CryptoJS.AES.encrypt(input, dotenv.parsed.CRYPTO_CODE).toString();
    },
    decode: function(input) {
        let bytes = CryptoJS.AES.decrypt(input, dotenv.parsed.CRYPTO_CODE);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}