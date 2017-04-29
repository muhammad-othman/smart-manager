var express = require('express');
var router = express.Router();
var genericModel = require('../models/genericModel');
var multer = require('multer');
var fs = require("fs");
var upload = multer({ dest: 'public/images/' })


router.get("/getProducts", function(req, res) {
    genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
        if (user && user.products)
            genericModel.selectAll("Products", (data) => res.send(data), (err) => console.log(err))
        else
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Products",ErrorText:""})
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}))
})

router.get("/getProducts/:id",function(req,res){
  genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
    console.log(req.params.id);
        if (user && user.products)
           genericModel.selectOneBy("Products", { id : req.params.id},(data) => res.send(data), (err) => console.log(err))
        else
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Products",ErrorText:""})
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}))

})


router.get("/getCategoryProducts/:category",function(req,res){
  genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
    console.log(req.params.id);
        if (user && user.products)
           genericModel.selectBy("Products", { category : req.params.category},(data) => res.send(data), (err) => console.log(err))
        else
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Products",ErrorText:""})
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}))

})

router.post('/newProduct', upload.single('image'), function(req, res) {
    genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
        if (user && user.products) {
            if (req.file)
                genericModel.insert(req.body, "Products", u => fs.rename(req.file.path, req.app.get('mainDir') + '/public/images/products/' + u.ops[0].id + '.jpeg'), e => console.log(e))
            else
                genericModel.insert(req.body, "Products", u => console.log("Inserted : " + u.ops[0].id), e => console.log(e))
        } else {
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Products",ErrorText:""})
        }
           res.redirect("/#/Products");
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}));
});

router.post('/updateProduct', upload.single('image'), function(req, res) {
    genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
        if (user && user.products) {
            console.log(req.body);
            if (req.file)
                genericModel.update(req.body, "Products", u => fs.rename(req.file.path, req.app.get('mainDir') + '/public/images/products/' + req.body.id + '.jpeg'), e => console.log(e))
            else
                genericModel.update(req.body, "Products", u => console.log("Updated"+ req.body.id), e => console.log(e))
        } else {
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Products",ErrorText:""})
        }
           res.redirect("/#/Products");
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}));
});

router.post("/deleteProduct", function(req, res) {
    genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
        if (user && user.products) {
             genericModel.delete(req.body.id, "Products", ()=>res.redirect("/#/Products"),
             (err)=>res.render("ErrorPage.html",{ErrorMessage:err,ErrorText:""}));
        }
       else
        res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Products",ErrorText:""})
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}));
});

module.exports = router;


