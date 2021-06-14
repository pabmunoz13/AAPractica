const express = require("express");
const multer = require("multer");
const alert = require("alert");
const controllerUser = require("./controllerUser");

const routerUser = express.Router();

const multerFactory = multer({ storage: multer.memoryStorage() });

routerUser.get("/register", function (request, response) {
    response.status(200);
    response.render("register", { errorMsg: null });
});
routerUser.post("/register", multerFactory.single("img"), function (request, response, next) {
    console.log('Usuario introducido ',request.body.nombre);
    let user = {
        email: request.body.email,
        pass: request.body.pass,
        nombre: request.body.nombre,
        imagen: null
    }
    console.log('Usuario introducido ',request.body.nombre);
  /* if (request.file) {
        user.img = request.file.buffer;
    }*/
    console.log('dentro del router');
    controllerUser.userRegister(user, function (err, result) {
        if (err) { // error interior
            next(err);
        } else {
            console.log('dentro del user');
            if (result === "Usuario existe !") {
                response.render("register", { errorMsg: "Usuario existe !" });
            } else {
                alert('USUARIO CREADO CORRECTAMENTE');
                response.render("login", { errorMsg: "Usuario creado !" });
            }
        }
    })
});


routerUser.get("/login", function (request, response) {
    response.status(200);
    response.render("login", { errorMsg: null });
});
routerUser.post("/login", function (request, response, next) {
    console.log("usuario: " + request.body.email + " pass: "+ request.body.pass);
    controllerUser.userLogin(request.body.email, request.body.pass, function (err, result) {
        if (err) { // error interior
            next(err);
        } else {
            if (result.length == 0) { // usuario incorrecto
                response.status(200);
                response.render("login", { errorMsg: "Dirección de correo y/o contraseña no válidos" });
            } else {
                request.session.currentUser = result[0].email;
                response.redirect("principal/" + result[0].email);
            }
        }
    })
});
routerUser.get("/principal/:id", function (request, response, next) {
    console.log("entra");
    controllerUser.getUser(request.params.id, function (err, result) {
        console.log("dentro ");
        if (err) { // error interior
            console.log("error "+ err);
            next(err);
        } else {
            if (result.length == 0) {
                console.log("resultado vacio!!!!");
                response.redirect("/user/login");
            } else {
                console.log("user:"+ request.params.id + result[0].nombre);
                let user2 = {
                    id: request.params.id,
                    nombre: result[0].nombre
                }
                console.log('Usuario introducido ',user2);
                response.status(200);
                response.render("principal", { user: user2});
            }
        }
    })
});

/*routerUser.get("/listar_preguntas", function (request, response, next) {
    console.log("entra en listar preguntas de Usuario");
    controllerUser.getUser(request.params.id, function (err, result) {
        console.log("dentro ");
        if (err) { // error interior
            console.log("error "+ err);
            next(err);
        } else {
            if (result.length == 0) {
                console.log("resultado vacio!!!!");
                response.redirect("/user/login");
            } else {
                console.log("user:"+ request.params.id + result[0].nombre);
                let user2 = {
                    id: request.params.id,
                    nombre: result[0].nombre
                }
                console.log('Usuario introducido ',user2);
                response.status(200);
                response.render("principal", { user: user2});
            }
        }
    })
}); */
routerUser.get("/logout", function (request, response) {
    request.session.destroy();
    console.log("usuario destruido, se mete por el get");
    response.redirect("/user/login");
})

/*
routerUser.get("/perfil/:id", function (request, response, next) {
    controllerUser.getUser(request.params.id, function (err, result) {
        if (err) { // error interior
            next(err);
        } else {
            if (result.length == 0) {
                response.redirect("/user/login");
            } else {
                let user = {
                    id: request.params.id,
                    nick: result[0].nick,
                    years: new Date().getFullYear() - new Date(result[0].birthday).getFullYear(),
                    sex: result[0].sex,
                    point: result[0].point
                }
                controllerUser.getUserPhotos(user.id, function (err, photos) {
                    if (err) { // error interior
                        next(err);
                    } else {
                        response.status(200);
                        response.render("perfil", { user: user, isCurrentUser: (request.params.id == request.session.currentUser), photos: photos });
                    }
                })
            }
        }
    })
});

routerUser.get("/perfil_img/:id", function (request, response, next) {
    controllerUser.getUser(request.params.id, function (err, result) {
        if (err) { // error interior
            next(err);
        } else {
            if (result[0].img) {
                response.status(200);
                response.end(result[0].img);
            } else {
                response.status(200);
                response.sendFile(__dirname + "/public/img/foto_usuario.jpg")
            }
        }
    })
});
*/

module.exports = routerUser;