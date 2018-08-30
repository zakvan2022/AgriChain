var express = require('express');
var Mongo = require('mongodb');
var MongoClient = Mongo.MongoClient;
var ObjectId = Mongo.ObjectId;
var dbConnect = require('../db');
var helpers = require('../helper');
var validations = require('../helper/validation');
var nodemailer = require('nodemailer');
var Mailgen = require('mailgen');
const util = require('util');
const {
    check,
    validationResult
} = require('express-validator/check');

const options = {
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: "7752bc804f8eb8",
        pass: "8150104a262b9e"
    }
};


// Configure mailgen by setting a theme and your product info
var mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        // Appears in header & footer of e-mails
        name: 'AgriChain',
        link: 'http://localhost:3000/'
        // Optional logo
        // logo: 'https://mailgen.js/img/logo.png'
    }
});


const transporter = nodemailer.createTransport(options);

var db;
MongoClient.connect(dbConnect.url, (err, database) => {
    if (err)
        return console.log(err)
    db = database
});
var router = express.Router();

router.post('/admin/sign-up', [
    validations.email('email'),
    validations.string_val('first_name'),
    validations.string_val('last_name'),
    validations.string_val('company_location'),
    validations.string_val('company_name'),
    check('password').isLength({
        min: 5
    })
], async function (req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    var creds = req.body;
    var UserExist = await db.collection('users').find({
        "email": creds.email
    }).toArray();

    if (UserExist.length > 0) {
        res.status(400).send({
            "status": "error",
            "message": "User already exists"
        });
    } else {
        let now             = helpers.date();
        creds['type']       = 'company-admin';
        creds['verified']   = false;
        creds['created_at'] = now;
        creds['updatd_at']  = now;
        var newUser = await db.collection('users').insert(creds);
        // Prepare email contents
        if (newUser) {
            var email = {
                body: {
                    name: creds.first_name,
                    intro: 'Welcome to AgriChain! Thank you so much for joining us. You’re on your way to super-productivity and beyond!',
                    action: {
                        instructions: 'Click the button below to verify your account:',
                        button: {
                            color: '#DC4D2F',
                            text: 'Verify your Account',
                            link: 'http://localhost:3000/change-activation-status?email='+helpers.encode_url_safe(creds.email)
                        }
                    },
                }
            };
            // Generate an HTML email with the provided contents
            var emailBody = mailGenerator.generate(email);
            transporter.sendMail({
                from: "8308fcb3e4aa73",
                to: creds.email,
                subject: 'Sign Up',
                html: emailBody
            }, function (error, response) {
                if (error) {
                    res.status(400).send(error);
                } else {
                    res.status(200).send({
                        "status": "ok",
                        "message": "User registered successfully."
                    });
                }
            });

        } else {
            res.status(400).send({
                "status": "error",
                "message": "not inserted , found error"
            });

        }
    }
});

router.get('/change-activation-status', [
    validations.email('email')
], async function (req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    var email = helpers.decode(req.query['email']);
    db.collection('users').find({
        'email': email
    }).toArray(function (err, user) {
        if (user[0].type == 'company-admin' || user[0].type == 'company-employee') {
            var type = user[0].verified;
            if (type == false) {
                type = true
            }
            db.collection('users').update({
                'email': email
            }, {
                $set: {
                    'verified': type
                }
            }, function (error, response) {
                if (error) {
                    res.status(400).send({
                        "status": "error",
                        "message": "Something bad happened.Please try later."
                    });
                } else {
                    res.status(200).send({
                        "status": "ok",
                        "message": "User privileges changed successfully."
                    });

                }
            })
        } else {
            res.status(400).send({
                "status": "error",
                "message": "You need admin privileges to perform this action."
            });

        }
    })
});
/**
 * user/login route
 */

router.post('/login', [
    validations.email('email'),
    check('password').isLength({
        min: 6,
        max: 14
    })
], async function (req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    var user = await db.collection('users').findOne({
        'email': req.body.email,
        'password': req.body.password
    });
    if (user) {
        if (user.verified == true) {
            var jwtToken = helpers.issueJWT(user);

            var params = {
                "token": jwtToken,
                "email": user.email,
                "type": user.type,
                "_id": user._id
            }

            res.status(200).send({
                "status": "ok",
                "params": params,
                "message": "Authentication Successfully - Token Issued"
            });


        } else {
            res.status(400).send({
                "status": "error",
                "message": "Your account is temporarily deactivated.Please contact support to activate again."
            });

        }
    } else {
        res.status(400).send({
            "status": "error",
            "params": "",
            "message": "Authentication Failed - Credentials Mismatch"
        });

    }
});

/**
 * user reset password 
 */

router.post('/reset-password', [
    validations.email('email')
], async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    var detail = req.body;
    db.collection('users').find({
        'email': detail.email
    }).toArray(function (err, user) {
        if (user.length == 0) {
            res.status(400).send({
                "status": "error",
                "message": "No user found for that email Id"
            });
        } else {
            db.collection('users').update({
                'email': detail.email
            }, {
                $set: {
                    'reset_pass': '1'
                }
            }, function (er, u) {
                if (err) {
                    res.status(400).send({
                        "status": "error",
                        "message": "Something bad happened.Please try later."

                    });
                } else {
                    var resetEmail = {
                        body: {
                            name: user[0].first_name,
                            intro: 'Welcome to AgriChain! Thank you so much for joining us. You’re on your way to super-productivity and beyond!',
                            action: {
                                instructions: 'Click the button below to reset your password:',
                                button: {
                                    color: '#DC4D2F',
                                    text: 'Reset your Account',
                                    link: 'http://localhost:3000/change-password?id=' + user[0]._id
                                }
                            }
                        }
                    };
                    // Generate an HTML email with the provided contents
                    var emailBody = mailGenerator.generate(resetEmail);
                    transporter.sendMail({
                        from: "8308fcb3e4aa73",
                        to: detail.email,
                        subject: 'Support-Agri Chain',
                        html: emailBody
                    }, function (error, resp) {
                        if (error) {
                            res.status(400).send(error);
                        } else {
                            res.status(200).send({
                                "status": "ok",
                                "message": "E-mail has been sent to your registered mail ID."
                            });
                        }
                    })

                }
            })
        }
    })
});

/**
 * change password for user
 */

router.post('/change-password', [
    check('password').isLength({
        min: 6,
        max: 14
    }),
    check('new_password').isLength({
        min: 6,
        max: 14
    }),
    check('id').exists()
], async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    const queryId = validationResult(req.query);
    if (!queryId.isEmpty()) {
        return res.status(422).json({
            errors: queryId.array()
        });
    }
    var creds = req.body;
    db.collection('users').find({
        '_id': ObjectId(req.query['id'])
    }).toArray(function (err, user) {
        if (user.length == 0) {
            res.status(400).send({
                "status": "error",
                "message": "no user found for that ID"
            });
        } else {
            if (user[0].password == creds.password) {
                db.collection('users').update({
                    '_id': ObjectId(req.query['id'])
                }, {
                    $set: {
                        'password': creds.new_password
                    }
                }, function (error, response) {
                    if (error) {
                        res.status(400).send({
                            "status": "error",
                            "message": "Something bad happened.Please try later."

                        });
                    } else {
                        res.status(200).send({
                            "status": "ok",
                            "message": "Password changed successfully."
                        });

                    }
                })
            } else {
                res.status(400).send({
                    "status": "error",
                    "message": "Verification failed.Please input correct password."
                });

            }
        }
    })
});
module.exports = router;