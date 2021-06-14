const mysql = require("mysql");

const config = require("./config");
const pool = mysql.createPool(config.mysqlConfig);

const DAOUsers = require("./DAOUsers")
const DAOQuestion = require("./DAOQuestion");
const { request } = require("express");
const daoU = new DAOUsers(pool);
const daoQ = new DAOQuestion(pool);


function getQuestion(id, callback) {
    let question = {}
    daoQ.getQuestion(id, function (err, result) {
        if (err) {
            callback(err);
        } else {
            question.question = result[0].question;
            daoQ.getOptions(id, function (err, options) {
                if (err) {
                    callback(err);
                } else {
                    question.options = options;
                    callback(null, question);
                }
            })
        }
    })
}


function getQuestions(callback) {
    console.log("obtener datos preguntas");
    let lista_resultado = [];
    daoQ.getAllQuestions(function (err, result) {
        if (err) {
            console.log("error recuperando preguntas ",err);
            callback(err);
        } else {
            console.log('preguntas',result);
            
            for(let k=0;k<=result.length-1;k++){
                console.log('el valor de la query en la posicion ',k+1,' es => ',result[k]);
                daoQ.getTagsFromQuestions(result[k].id_pregunta, function (err, result2) {
                    if (err) {
                        console.log("error recuperando tags de las preguntas ",err);
                        callback(err);
                    } else {
                        let tags = [];
                        let resultado = {};
                        resultado.titulo = result[k].titulo;
                        resultado.cuerpo = result[k].cuerpo;
                        resultado.fecha_pregunta = result[k].fecha;
                        resultado.nombre = result[k].nombre;
                        resultado.imagen = result[k].imagen;
                        for(let j=0;j<=result2.length-1;j++){
                            tags.push(result2[j].etiquetas);
                        }
                        resultado.tags = tags;
                        //modificar fecha aqui¿¿
                        lista_resultado.push(resultado);
                        console.log('este es el objeto ',k+1,' => ',resultado);

                        return resultado;
                    }
                })
            }
            callback(null, result);
        }
    })
}

function getQuestionsSinRespuesta(callback) {
    console.log("obtener datos preguntas");
    let lista_resultado = [];
    daoQ.getAllQuestions(function (err, result) {
        if (err) {
            console.log("error recuperando preguntas ",err);
            callback(err);
        } else {
            console.log('preguntas',result);
            
            for(let k=0;k<=result.length-1;k++){
                console.log('el valor de la query en la posicion ',k+1,' es => ',result[k]);
                daoQ.getTagsFromQuestions(result[k].id_pregunta, function (err, result2) {
                    if (err) {
                        console.log("error recuperando tags de las preguntas ",err);
                        callback(err);
                    } else {
                        let tags = [];
                        let resultado = {};
                        resultado.titulo = result[k].titulo;
                        resultado.cuerpo = result[k].cuerpo;
                        resultado.fecha_pregunta = result[k].fecha;
                        resultado.nombre = result[k].nombre;
                        resultado.imagen = result[k].imagen;
                        for(let j=0;j<=result2.length-1;j++){
                            tags.push(result2[j].etiquetas);
                        }
                        resultado.tags = tags;
                        //modificar fecha aqui¿¿
                        lista_resultado.push(resultado);
                        console.log('este es el objeto ',k+1,' => ',resultado);

                        return resultado;
                    }
                })
            }
            callback(null, result);
        }
    })
}

function createQuestion(user, question, callback) {
    daoQ.hasThisQuestion(question.titulo, function (err, result_question) {
        if (!err) {
            console.log('si encuentra resultados => no tiene que hacer la insercion');
            //alert pregunta introducida
            callback(err);
        } else {
            daoQ.getMaxId(function (err, result_id){
                if (err) {
                    console.log('ERROR CONTROLLER ')
                    callback(err);
                } else {
                    console.log('antes esto tenia cosas', user);
                    daoQ.getUserId(user, function (err, result_id_user){
                        if (err) {
                            console.log('ERROR CONTROLLER ')
                            callback(err);
                        } else {
                            console.log('Dentro del controller valor recuperado => ',result_id);
                            daoQ.insertQuestion(result_id, result_id_user, question, function (err, result) {
                                if (err) {
                                    console.log('error insertanbdo etiquetas ')
                                    callback(err);
                                } else {
                                    console.log('insertadas etiquetas correctamente')
                                    callback(null, result);
                                }
                            })
                        }
                    })
                }
            })
   
        }
    })
}

/*
function getAnswer(user, questionID, callback) {
    let answer = {}
    daoQ.getQuestion(questionID, function (err, question) {
        if (err) {
            callback(err);
        } else {
            answer.question = question[0].question;
            daoQ.getAnswer(user, questionID, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    if (result.length == 0) {
                        answer.option = null
                        callback(null, answer)
                    } else {
                        daoQ.getOption(result[0].option, function (err, option) {
                            if (err) {
                                callback(err);
                            } else {
                                answer.option = option[0]
                                callback(null, answer)
                            }
                        })
                    }
                }
            })
        }
    })
}

function getQuestionByTag(user, question, callback) {
    let friendsList = [];
    daoQ.getFriendsByQuestion(user, question, function (err, friends) {
        if (err) {
            callback(err);
        } else {
            daoQ.getGuess(user, question, function (err, guesses) {
                if (err) {
                    callback(err);
                } else {
                    friends.forEach(friend => {
                        let x = {}
                        x.friend = friend
                        let guess = guesses.find(guess => guess.friend === friend.ID)
                        if (guess) {
                            x.guess = guess;
                        } else {
                            x.guess = null;
                        }
                        friendsList.push(x);
                        if (friends[friends.length - 1].ID === friend.ID)
                            callback(null, friendsList)
                    })
                    if (friends.length == 0)
                        callback(null, friendsList)
                }
            })
        }
    })
}

function answer(user, question, option, callback) {
    daoQ.insertAnswer(user, question, option, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, "Contestado!");
        }
    })
}

function newAnswer(user, question, option, callback) {
    daoQ.searchOption(question, option, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result.length == 0) {
                daoQ.insertOption(question, option, false, function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        answer(user, question, result.insertId, callback)
                    }
                })
            } else {
                answer(user, question, result[0].ID, callback)
            }
        }
    })

}

*/
/*
function createQuestion(question, pregunta, callback) {
    daoQ.hasThisQuestion(pregunta.titulo, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result.length != 0)
                callback(null, "Pregunta ya existe")
            else
                daoQ.insertQuestion(question, function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        daoQ.insertOptions(result.insertId, options, true, function (err, options) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(err, result.insertId);
                            }
                        })
                    }
                })
        }
    })
}
*/
module.exports = {
    getQuestions                :   getQuestions,
    getQuestionsSinRespuesta    :   getQuestionsSinRespuesta,
    getQuestion                 :   getQuestion,
    createQuestion              :   createQuestion
}