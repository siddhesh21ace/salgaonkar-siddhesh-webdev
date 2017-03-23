/**
 * Created by Siddhesh on 2/25/2017.
 */

module.exports = function (app) {
    var models = require('./model/models.server')();
    require("./services/user.service.server")(app, models);
    require("./services/website.service.server")(app, models);
    require("./services/page.service.server")(app, models);
    require("./services/widget.service.server")(app, models);
};