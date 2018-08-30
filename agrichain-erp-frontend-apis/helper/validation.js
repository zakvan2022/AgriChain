const {
    check
} = require('express-validator/check');

module.exports = {
    email : function(field_name) {
        return check(field_name).isEmail().normalizeEmail()
    },
    string_val : function(field_name) {
        return check(field_name).not().isEmpty().trim().escape();
    }
}