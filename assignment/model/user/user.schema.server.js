/**
 * Created by Siddhesh on 3/21/2017.
 */
var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "assignment.user"});

module.exports = userSchema;