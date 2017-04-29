var express = require('express');
var router = express.Router();
var genericModel = require('../models/genericModel.js');
var path = require('path');
var randomstring = require("randomstring");

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.cookies.decrypted)
        genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
            if (user)

                res.sendFile(path.join(req.app.locals.dir + '/MasterPage.html'));
            else
                next();
        }, function() {
            next();
        })
    else
        next();
});

router.get('/', function(req, res, next) {
    res.sendFile(path.join(req.app.locals.dir + '/index.html'));
});

router.get("/ussser", function(req, res) {
    if (req.cookies.decrypted)
        genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
            if (user)
                genericModel.selectOneBy("Employees", { Name: user.empName }, function(emp) {
                    res.send({
                        name: emp.Name,
                        empId: emp.id
                    })
                })
        },m=> res.render("ErrorPage.html",{ErrorMessage:"Something Went Wrong",ErrorText:"Please Contact the Admin"}))
})

router.get("/logout", function(req, res) {
    res.clearCookie("decrypted");
    res.sendFile(path.join(req.app.locals.dir + '/index.html'));
});

router.post("/login", function(req, res) {
    genericModel.selectOneBy("UsersInfo", { username: req.body.username }, function(user) {
        if (user && user.password == req.body.password) {
            user.decrypted = randomstring.generate();
            genericModel.update(user, "UsersInfo", function() {
                if (req.body.remmber)
                    res.cookie('decrypted', user.decrypted, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                else
                    res.cookie('decrypted', user.decrypted);
                res.redirect('/')
            }, (error) => res.render("ErrorPage.html",{ErrorMessage:error,ErrorText:""}))
        } else
            res.render("ErrorPage.html",{ErrorMessage:"Wrong Password",ErrorText:""})
            
    }, function(err) {
        res.render("ErrorPage.html",{ErrorMessage:err,ErrorText:""})
    })
});

module.exports = router;
