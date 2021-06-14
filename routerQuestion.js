const express = require("express");
const alert = require("alert");
const controllerQuestion = require("./controllerQuestion")
const routerQuestion = express.Router();

routerQuestion.get("/", function (request, response, next) {
    controllerQuestion.getRandomQuestion(function (err, result) {
        if (err) { // error interior
            next(err);
        } else {
            response.status(200);
            response.render("preguntas", { questions: result });
        }
    })
})

routerQuestion.get("/listar_preguntas", function (request, response, next) {
    console.log("entra en listar preguntas");
    controllerQuestion.getQuestions(function (err, result) {
        console.log("dentro getQuestions");
        if (err) { // error interior
            console.log("error "+ err);
            next(err);
        } else {
            if (result.length == 0) {
                console.log("resultado vacio!!!!");
                response.redirect("/user/login");
            } else {
                console.log("llamamos al listar_preguntas");
                response.render("listar_preguntas", { questions: result});
            }
        }
    })
});


routerQuestion.get("/formular_pregunta", function (request, response, next) {
    console.log("redirige a formular pregunta");
    object = {};
    response.render("formular_pregunta",  { object2:object });
}); 

routerQuestion.post("/newQuestion", function (request, response, next) {
    if (request.body.cuerpo == "") {
        console.log("Introduciendo una pregunta NULA!");
        response.render("addPregunta", { errorMsg: "Pregunta no puede ser nulo !" });
    } else {
        let pregunta = []
        if (request.body.titulo != "")
        pregunta.push(request.body.titulo);
        if (request.body.cuerpo != "")
        pregunta.push(request.body.cuerpo);
        if (request.body.etiquetas != "")
        pregunta.push(request.body.etiquetas);
        if (pregunta.length == 0) {
            response.render("addPregunta", { errorMsg: "La pregunta esta vacia" });
        } else {
            controllerQuestion.createQuestion(request.session.currentUser, request.body, function (err, result) {
                if (err) { // error interior
                    next(err);
                } else {
                    if (result === "Pregunta ya existe") {
                        alert("La pregunta ya existe");
                        response.render("addPregunta", { errorMsg: result });
                    } else {
                        alert("Pregunta dada de alta correctamente");
                        response.render("principal", { user: request.session.currentUser});//que redirija bien
                    }
                }
            })
        }
    }
})

routerQuestion.get("/preguntasSinResponder", function (request, response, next) {
    console.log("entra en preguntas sin responder");
    controllerQuestion.getQuestionsSinRespuesta(function (err, result) {
        console.log("dentro getQuestionsSinRespuesta");
        if (err) { // error interior
            console.log("error "+ err);
            next(err);
        } else {
            if (result.length == 0) {
                console.log("resultado vacio!!!!");
                response.redirect("/user/login");
            } else {
                console.log("llamamos al listar_preguntas");
                response.render("listar_preguntas", { questions: result});
            }
        }
    })
});
/*
routerQuestion.get("/answer/:id", function (request, response, next) {
    controllerQuestion.getAnswer(request.session.currentUser, request.params.id, function (err, result) {
        if (err) { // error interior
            next(err);
        } else {
            if (result.option == null) {
                controllerQuestion.getQuestion(request.params.id, function (err, result) {
                    if (err) { // error interior
                        next(err);
                    } else {
                        result.questionID = request.params.id;
                        response.status(200);
                        response.render("responder", { question: result });
                    }
                })
            } else {
                response.redirect("/question/id/" + request.params.id);
            }
        }
    })

})

routerQuestion.post("/answer", function (request, response, next) {
    if (request.body.answer === "Other") {
        if(request.body.Other == ""){
            response.redirect("/question/answer/" + request.body.question);
        }else{
            controllerQuestion.newAnswer(request.session.currentUser, request.body.question, request.body.Other, function (err, result) {
                if (err) { // error interior
                    next(err);
                } else {
                    response.redirect("/question/id/" +request.body.question);
                }
            })
        }
    } else {
        controllerQuestion.answer(request.session.currentUser, request.body.question, request.body.answer, function (err, result) {
            if (err) { // error interior
                next(err);
            } else {
                response.redirect("/question/id/" +request.body.question);
            }
        })
    }
})

routerQuestion.get("/id/:id", function (request, response, next) {
    controllerQuestion.getAnswer(request.session.currentUser, request.params.id, function (err, result) {
        if (err) { // error interior
            next(err);
        } else {
            controllerQuestion.getFriendsByQuestion(request.session.currentUser, request.params.id, function (err, friends) {
                response.status(200);
                response.render("pregunta", { questionID: request.params.id, question: result, friends: friends });
            })
        }
    })
})

routerQuestion.get("/new", function (request, response, next) {
    response.status(200);
    response.render("addPregunta", { errorMsg: null });
})

routerQuestion.post("/newQuestion", function (request, response, next) {
    if (request.body.cuerpo == "") {
        console.log("Introduciendo una pregunta NULA!");
        response.status(200);
        response.render("addPregunta", { errorMsg: "Pregunta no puede ser nulo !" });
    } else {
        let pregunta = []
        if (request.body.titulo != "")
        pregunta.push(request.body.titulo);
        if (request.body.cuerpo != "")
        pregunta.push(request.body.cuerpo);
        if (request.body.etiquetas != "")
        pregunta.push(request.body.etiquetas);
        if (pregunta.length == 0) {
            response.status(200);
            response.render("addPregunta", { errorMsg: "La pregunta esta vacia" });
        } else {
            controllerQuestion.createQuestion(/*request.body.question, pregunta, function (err, result) {
                if (err) { // error interior
                    next(err);
                } else {
                    if (result === "Pregunta ya existe") {
                        response.status(200);
                        alert("La pregunta ya existe");
                        response.render("addPregunta", { errorMsg: result });
                    } else {
                        alert("Pregunta creada correctamente");
                        //ha introducido bien la pregunta y te redirige al menu principal¿?
                        response.redirect("id/" + result)
                    }
                }
            })
        }
    }
})*/

module.exports = routerQuestion;