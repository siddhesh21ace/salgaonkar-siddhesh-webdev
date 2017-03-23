/**
 * Created by Siddhesh on 3/21/2017.
 */

var mongoose = require("mongoose");

var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
    name: String,
    title: String,
    description: String,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref:'WidgetModel'}],
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "assignment.page"});

module.exports = pageSchema;