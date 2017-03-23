/**
 * Created by Siddhesh on 3/20/2017.
 */
var mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');
var q = require('q');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    var inventorySchema = mongoose.Schema({
        name: String,
        age: Number
    }, {collection: 'inventory'});

    var Inventory = mongoose.model('Inventory', inventorySchema);
    /*Inventory.find(function (err, results) {
        if (err) return console.error(err);
        console.log(results);
    })*/
    /*var promise = Inventory.find();
    promise.then(function(results) {
        console.log(results);
    })*/

    trying()
        .then(function(data) {
            console.log(data);
        });


    function trying() {
        var deferred = q.defer();
        //var deferred = Promise.defer();

        Inventory.find(function (err, results) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(results);
            }
        });
        return deferred.promise;
    }

});