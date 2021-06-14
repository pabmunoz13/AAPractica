"use strict";

const config = require("./config");
const express = require("express");
const path = require("path");
//const multer = require("multer");
//const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore(config.mysqlConfig);
const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});

const routerUser = require("./routerUser");
const routerQuestion = require("./routerQuestion");

const app = express();



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/views"));


app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(middlewareSession);

// middleware if not login
app.use(function (request, response, next) {
    if (request.url != "/user/login" && request.url != "/user/register") {
        if (request.session.currentUser === undefined) {
            response.redirect("/user/login");
        } else {
            response.locals.userID = request.session.currentUser;
            next();
        }
    } else {
        if (request.session.currentUser !== undefined) {
            response.locals.userID = request.session.currentUser;
            response.redirect("/user/principal/" + response.locals.userID);
        } else {
            next();
        }
    }
});

app.use("/user", routerUser);
app.use("/question", routerQuestion);

app.use(function (request, response, next) {
    let isLogin = !(request.session.currentUser === undefined);
    response.status(404);
    response.render("404", { isLogin: isLogin });
});

app.use(function (error, request, response, next) {
    // Código 500: Internal server error
    // let isLogin = !(request.session.currentUser === undefined);
    response.status(500);
    response.render("500");
});


app.listen(3000, function (err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " + err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});