var express = require('express');
var router = express.Router();
var genericModel = require('../models/genericModel.js');
var path = require('path');


router.get("/GetUsers", function(req, res) {
    genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
        if (user && user.users)
            genericModel.selectAll("UsersInfo", (data) => res.send(data), (err) => console.log(err))
        else
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Users",ErrorText:""})
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}))
})


router.get("/GetUser/:id",function(req,res){
  genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
    console.log("usersss");
        if (user && user.users)
           genericModel.selectOneBy("UsersInfo", { id : req.params.id},(data) => res.send(data), (err) => console.log(err))
        else
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Users",ErrorText:""})
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}))
})


router.post('/updateUser',function(req, res) {
    genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
        if (user && user.users) {
                genericModel.update(req.body, "UsersInfo", u => console.log("Updated"+ req.body.id), e => console.log(e))
        } else 
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Users",ErrorText:""})
        
           res.redirect("/#/Users");
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}));
});

router.post("/deleteUser", function(req, res) {
    genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
        if (user && user.users) {
             genericModel.delete(req.body.id, "UsersInfo", ()=>res.redirect("/#/Users"),
             (m)=>res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}));
        }
        else
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Users",ErrorText:""})
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}));
});

router.post("/newUser", function(req, res) {
    genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(u) {
        if (u && u.users) {
            genericModel.insert(req.body,"UsersInfo",()=>console.log("inserted"),(m)=>console.log(m))
            res.redirect("/#/Users");
        } else
        res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Users",ErrorText:""})
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}))
})


router.post("/updateUser", function(req, res) {
   genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(u) {
            if (u && u.users) {
            genericModel.update(req.body,"UsersInfo",()=>console.log("inserted"),(m)=>console.log(m))
        } else
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Users",ErrorText:""})
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}))
})

module.exports = router;
