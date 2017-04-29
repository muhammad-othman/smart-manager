var express = require('express');
var router = express.Router();
var genericModel = require('../models/genericModel');
var multer = require('multer');
var fs = require("fs");
var upload = multer({ dest: 'public/images/' })


router.get("/getCategories", function(req, res) {
    genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
        if (user && user.categories)
            genericModel.selectAll("Categories", (data) => res.send(data), (err) => console.log(err))
        else
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Categories",ErrorText:""});
    }, m =>res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}))
})

router.get("/getCategories/:id",function(req,res){
  genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
    console.log(req.params.id);
        if (user && user.categories)
           genericModel.selectOneBy("Categories", { id : req.params.id},(data) => res.send(data), (err) => console.log(err))
        else
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Categories",ErrorText:""})
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}))

})




router.post('/newCategory', upload.single('image'), function(req, res) {
    genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
        if (user && user.categories) {
            if (req.file)
                genericModel.insert(req.body, "Categories", u => fs.rename(req.file.path, req.app.get('mainDir') + '/public/images/categories/' + u.ops[0].id + '.jpeg'), e => console.log(e))
            else
                genericModel.insert(req.body, "Categories", u => console.log("Inserted : " + u.ops[0].id), e => console.log(e))
        } else {
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Categories",ErrorText:""})
        }
           res.redirect("/#/ProductsCategories");
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}));
});

router.post('/updateCategory', upload.single('image'), function(req, res) {
    genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
        if (user && user.categories) {
            console.log(req.body);
            if (req.file)
                genericModel.update(req.body, "Categories", u => fs.rename(req.file.path, req.app.get('mainDir') + '/public/images/categories/' + req.body.id + '.jpeg'), e => console.log(e))
            else
                genericModel.update(req.body, "Categories", u => console.log("Updated"+ req.body.id), e => console.log(e))
        } else {
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Categories",ErrorText:""})
        }
           res.redirect("/#/ProductsCategories");
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}));
});


router.post("/deleteCategory", function(req, res) {
    genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
        if (user && user.categories) {
             genericModel.delete(req.body.id, "Categories", ()=>res.redirect("/#/ProductsCategories"),
             (error)=>res.render("ErrorPage.html",{ErrorMessage:error,ErrorText:""}));
        }
        else
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Categories",ErrorText:""})
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}));
});

module.exports = router;
