const mysql = require("mysql");

const config = require("./config");
const pool = mysql.createPool(config.mysqlConfig);

const DAOUsers = require("./DAOUsers")
const daoU = new DAOUsers(pool);

function userRegister(user, callback) {
    console.log('llamamos a la creacion de usuario');
    daoU.getUserByEmail(user.email, function (err, result) {
        console.log('verificamos si ya existe el usuario');
        if (err) {
            callback(err);
        } else {
            if (result.length != 0) {
                console.log('Usuario existe !');
                callback(err, "Usuario existe !");
            } else {
                console.log('Va a crear usuario');
                daoU.insertUser(user, function (err, result) {
                    callback(err, result);
                })

            }
        }
    })
}

function userLogin(email, pass, callback) {
    daoU.isUserCorrect(email, pass, callback);
}

function getUser(id, callback) {
    daoU.getUser(id, callback);
}

/*
function uploadPhoto(id, photo, callback) {
    if (photo == null) {
        callback(null, "Elige una foto.");
    } else {
        daoU.getUser(id, function (err, user) {
            if (err) {
                callback(err);
            } else {
                if (user[0].point < 100) {
                    callback(null, "Putuacion insuficiente !");
                } else {
                    daoU.addUserPhoto(id, photo, function (err, result) {
                        if (err) {
                            callback(err);
                        } else {
                            daoU.addUserPoint(id, -100, function (err, result) {
                                if (err) {
                                    callback(err);
                                } else {
                                    callback(null, "Foto subido !");
                                }
                            })
                        }
                    });
                }
            }
        })
    }
}

function getUserPhotos(user, callback) {
    daoU.getUserPhotos(user, callback);
}

function getUserPhoto(id, callback) {
    daoU.getUserPhoto(id, callback);
}
*/
module.exports = {
    userRegister: userRegister,
    userLogin: userLogin,
    getUser: getUser
}