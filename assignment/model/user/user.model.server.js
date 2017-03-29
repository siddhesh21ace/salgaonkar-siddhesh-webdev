/**
 * Created by Siddhesh on 3/21/2017.
 */
module.exports = function () {
    var models = null;
    var mongoose = require("mongoose");
    var userSchema = require('./user.schema.server');
    var UserModel = mongoose.model('UserModel', userSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserbyUsername: findUserbyUsername,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        updateUser: updateUser,
        setModels: setModels
    };

    return api;

    function createUser(user) {
        delete user._id;
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserbyUsername(username) {
        return UserModel.find({"username": username});
    }

    function findUserByCredentials(username, password) {
        return UserModel.find({"username": username, "password": password});
    }

    function deleteUser(userId) {
        return UserModel.remove({"_id": userId});
    }

    function updateUser(userId, updatedUser) {
        return UserModel.update({"_id": userId}, {$set: updatedUser});
    }

    function setModels(_models) {
        models = _models;
    }
};