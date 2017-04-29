var express = require('express');
var router = express.Router();
var genericModel = require('../models/genericModel');
var multer = require('multer');
var fs = require("fs");
var upload = multer({ dest: 'public/images/' })


router.get("/GetEmployees", function(req, res) {
    genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
        if (user && user.employees)
            genericModel.selectAll("Employees", (data) => res.send(data), (err) => console.log(err))
        else
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Employees",ErrorText:""})
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}))
})

router.get("/GetEmp/:id",function(req,res){
  genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
    console.log(req.params.id);
        if (user && user.employees)
           genericModel.selectOneBy("Employees", { id : req.params.id},(data) => res.send(data), (err) => console.log(err))
        else
            res.send("error.html", { message: "You Can't Add new Employee" });
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}))

})

router.get("/newEmp", function(req, res) {
    genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
        if (user && user.employees) {
            res.redirect("/#/Employees");
        } else
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Employees",ErrorText:""})
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}))
});



router.post('/newEmp', upload.single('image'), function(req, res) {
    genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
        if (user && user.employees) {
            if (req.file)
                genericModel.insert(req.body, "Employees", u => fs.rename(req.file.path, req.app.get('mainDir') + '/public/images/emps/' + u.ops[0].id + '.jpeg'), e => console.log(e))
            else
                genericModel.insert(req.body, "Employees", u => console.log("Inserted : " + u.ops[0].id), e => console.log(e))
        } else {
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Employees",ErrorText:""})
        }
        console.log("Donnnn");
           res.redirect("/#/Employees");
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}));
});

router.post('/updateEmployee', upload.single('image'), function(req, res) {
    genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
        if (user && user.employees) {
            console.log(req.body);
            if (req.file)
                genericModel.update(req.body, "Employees", u => fs.rename(req.file.path, req.app.get('mainDir') + '/public/images/emps/' + req.body.id + '.jpeg'), e => console.log(e))
            else
                genericModel.update(req.body, "Employees", u => console.log("Updated"+ req.body.id), e => console.log(e))
        } else {
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Employees",ErrorText:""})
        }
           res.redirect("/#/Employees");
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}));
});


router.post("/deleteEmp", function(req, res) {
    genericModel.selectOneBy("UsersInfo", { decrypted: req.cookies.decrypted }, function(user) {
        if (user && user.employees) {
             genericModel.delete(req.body.id, "Employees", ()=>res.redirect("/#/Employees"),
             (m)=>res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}));
        }
        else
            res.render("ErrorPage.html",{ErrorMessage:"You aren't Authorized to View Employees",ErrorText:""})
    }, m => res.render("ErrorPage.html",{ErrorMessage:m,ErrorText:""}));
});

module.exports = router;
