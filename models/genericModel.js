var mongo = require("mongodb");
var randomstring = require("randomstring");
var url = "mongodb://admin:admin91@ds131041.mlab.com:31041/smartmanager"


var MongoClient = mongo.MongoClient;
var database;

MongoClient.connect(url, function(err, db) {
    if (err)
        console.log(err.toString());
    else {console.log("mongoConnection");
        database = db;
    }
});

exports.insert = function(data, col, success, failed) {
    data.id = randomstring.generate();
    database.collection(col).insert(data, function(err, records) {
        if (err) {
            if (typeof(failed) === typeof(Function))
                failed(err);
        } else {
            if (typeof(success) === typeof(Function))
                success(records);
        }
    });
};

exports.sellOrBuy = function(prodId, q) {
    database.collection('Products').update({ id: prodId }, { $inc: { 'inStock': q } });
}

exports.update = function(data, col, success, failed) {
    database.collection(col).findOne({ id: data.id }, function(err, d) {
        if (err) {
            if (typeof(failed) === typeof(Function))
                failed(err);
        } else if (d) {
            database.collection(col).update({ id: d.id }, { $set: data }, false, true);
            if (typeof(success) === typeof(Function))
                success(d);
        } else
        if (typeof(failed) === typeof(Function))
            failed("Doesn'tExist");
    });
};


exports.delete = function(deleteingID, col, success, failed) {
    database.collection(col).findOne({ id: deleteingID }, function(err, d) {
        if (err) {
            if (typeof(failed) === typeof(Function))
                failed(err);
        } else if (d) {
            database.collection(col).remove({ id: deleteingID });
            if (typeof(success) === typeof(Function))
                success(d);
        } else
            failed("Doesn'tExist");
    });
};


exports.selectAll = function(col, success, failed) {
    database.collection(col).find().toArray(function(err, d) {
        if (err) {
            if (typeof(failed) === typeof(Function))
                failed(err);
        } else if (d) {
            if (typeof(success) === typeof(Function))
                success(d);
        } else
            failed("Doesn't Exist");
    });
};

exports.selectOneBy = function(col, by, success, failed) {
    database.collection(col).findOne(by, function(err, d) {
        if (err) {
            if (typeof(failed) === typeof(Function))
                failed(err);
        } else if (d) {
            if (typeof(success) === typeof(Function))
                success(d);
        } else
        if (typeof(failed) === typeof(Function))
            failed("Doesn't Exist");
    });
};


exports.selectBy = function(col, by, success, failed) {
    database.collection(col).find(by).toArray(function(err, d) {
        if (err) {
            if (typeof(failed) === typeof(Function))
                failed(err);
        } else if (d) {
            if (typeof(success) === typeof(Function))
                success(d);
        } else
        if (typeof(failed) === typeof(Function))
            failed("Doesn't Exist");
    });
};
