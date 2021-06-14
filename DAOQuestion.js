class DAOQuestion {
    constructor(pool) { this.pool = pool; }

    getQuestion(id, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "SELECT * FROM question WHERE ID = ? ";
                connection.query(sql, [id], function (err, resultado) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, resultado);
                    }
                })
            }
        })
    }
    getAllQuestions(callback){
        console.log("Recuperando todas las preguntas");
        this.pool.getConnection(function(err,connection){
            if(err){
                console.log("error recuperando preguntas ",err);
                callback(err);
            }else{
                const sql = "SELECT id_pregunta, titulo, cuerpo, nombre, imagen, DATE_FORMAT(fecha_pregunta, '%d/%m/%Y') AS fecha FROM preguntas INNER JOIN usuarios WHERE preguntas.usuario = usuarios.id_usuario";
                connection.query(sql,function(err,resultado){
                    connection.release();
                    if(err){
                        console.log('Error en query que recupera preguntas',err);
                        callback(err);
                    }else{
                        console.log('Query que recupera preguntas')
                        callback(err,resultado);
                    }
                })
            }
        })
    }
    getTagsFromQuestions(id, callback){
        console.log("Recuperando tags de las preguntas");
        this.pool.getConnection(function(err,connection){
             if(err){
                console.log("Error recuperando tags de preguntas ",err);
                callback(err);
            }else{
                const sql = "SELECT etiquetas FROM etiqueta WHERE id_pregunta = ?";
                connection.query(sql, [id], function(err,resultado){
                    connection.release();
                    if(err){
                        console.log('Error en query que recupera tags de la pregunta',err);
                        callback(err);
                    }else{
                        callback(null,resultado);
                    }
                })
            }
        })
    }
    getQuestionsSinRespuesta(callback){
        console.log("Recuperando las preguntas sin respuesta");
        this.pool.getConnection(function(err,connection){
            if(err){
                console.log("error recuperando preguntas ",err);
                callback(err);
            }else{
                const sql = "SELECT id_pregunta, titulo, cuerpo, nombre, imagen, DATE_FORMAT(fecha_pregunta, '%d/%m/%Y') AS fecha FROM preguntas INNER JOIN usuarios WHERE preguntas.usuario = usuarios.id_usuario AND respuesta = '' ";
                connection.query(sql,function(err,resultado){
                    connection.release();
                    if(err){
                        console.log('Error en query que recupera preguntas',err);
                        callback(err);
                    }else{
                        console.log('Query que recupera preguntas')
                        callback(err,resultado);
                    }
                })
            }
        })
    }

   /* getAllQuestion(callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "SELECT * FROM question";
                connection.query(sql, function (err, resultado) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, resultado);
                    }
                })
            }
        })
    }*/

    getOptions(questionID, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "SELECT * FROM option WHERE question = ? AND isInit =?";
                connection.query(sql, [questionID, true], function (err, resultado) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, resultado);
                    }
                })
            }
        })
    }

    getOption(id, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "SELECT * FROM option WHERE ID = ?";
                connection.query(sql, id, function (err, resultado) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, resultado);
                    }
                })
            }
        })
    }

    getAnswer(user, question, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "SELECT * FROM answer WHERE user = ? AND question = ?";
                connection.query(sql, [user, question], function (err, resultado) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, resultado);
                    }
                })
            }
        })
    }

    getGuess(user, question, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "SELECT * FROM guess WHERE user = ? AND question = ?";
                connection.query(sql, [user, question], function (err, resultado) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, resultado);
                    }
                })
            }
        })
    }

    setGuess(user, friend, question, correct, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "INSERT INTO guess(user,friend,question,correct) VALUES(?,?,?,?);";
                connection.query(sql, [user, friend, question, correct], function (err, resultado) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, resultado);
                    }
                })
            }
        })
    }

   

    insertAnswer(user, question, option, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "INSERT INTO respuestas(user,question,option) VALUES(?,?,?);";
                connection.query(sql, [user, question, option], function (err, resultado) {
                    connection.release();
                    if (err) {
                        console.log('Error en query que verifica si ya existe una pregunta con ese tituloCOSA',err)
                        callback(err);
                    } else {
                        callback(err, resultado);
                    }
                })
            }
        })
    }

    hasThisQuestion(question, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "SELECT * FROM preguntas WHERE titulo = ?;";
                console.log(question);
                connection.query(sql, question, function (err, resultado) {
                    connection.release();
                    if (err) {
                        console.log('Error en query que verifica si ya existe una pregunta con ese titulo',err)
                        callback(err);
                    } else {
                        console.log('No existe ninguna pregunta con el titulo ',resultado);
                        callback(resultado);
                    }
                })
            }
        })
    }

    /*insertQuestion(question, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "INSERT INTO question(question) VALUES(?);";
                connection.query(sql, question, function (err, resultado) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, resultado);
                    }
                })
            }
        })
    }*/
    
    insertQuestion(id, id_user,question, callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(err);
            }else{   
                let id_valor = id[0].id_pregunta;  
                let id_usuario = id_user[0].id_usuario;  
                id_valor++;
                let fecha = new Date();
                var d = new Date(fecha),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();
            
                if (month.length < 2) 
                    month = '0' + month;
                if (day.length < 2) 
                    day = '0' + day;

                fecha = [year, month, day].join('-');
                const sql = "INSERT INTO preguntas(id_pregunta,titulo,cuerpo,usuario,fecha_pregunta,respuesta) VALUES(?,?,?,?,?,?);";             
                //console.log('QUERY INSERT => ',sql);
                connection.query(sql,[id_valor.toString(10),question.titulo,question.cuerpo,id_usuario,fecha,''],function(err,resultado){
                    connection.release();
                    if(err){
                        console.log('Error en query que inserta preguntas ',err)
                        callback(err);
                    }else{
                        console.log('INSERT BIEN HECHO => AHORA TEMA ETIQUETAS')
                        let arr = question.Etiquetas.split("@");
                        arr.shift();
                        if(arr.length>=1){
                            let sql2 = "INSERT INTO etiqueta (id_pregunta, etiquetas) VALUES ";
                            let values=[];
                            let i;
                            for(i=0;i<arr.length-1;i++){
                                values.push(id_valor)
                                values.push(arr[i]);
                                sql2+="(?, ?),";
                            }
                            values.push(id_valor)
                            values.push(arr[arr.length-1]);
                            sql2 += "(?, ?)";
                            console.log('query a ejecutar ',sql2)
                            connection.query(sql2,values,function(err,resultado){
                                if(err){
                                    console.log('Error en query que inserta etiquetas ',err)
                                    callback(err);
                                }else{
                                    console.log('query que inserta etiquetas ',resultado)
                                    callback(null);
                                }
                            })
                        }
                    }
                })
            }
        })
    }
    getMaxId(callback){
        console.log('Comienzo getMaxId');
        this.pool.getConnection(function(err,connection){
            if(err){
                console.log('Error en getMaxId');
                callback(err);
            }else{
                const sql = "SELECT id_pregunta FROM preguntas WHERE id_pregunta = ( SELECT MAX(id_pregunta) FROM preguntas )";
                connection.query(sql, function (err, resultado) {
                    connection.release();
                    if (err) {
                        console.log('Error en query recupera el id maximo',err)
                        callback(err);
                    } else {
                        console.log('MAX ID', resultado);
                        callback(err, resultado);
                    }
                })
            }
               
        })
    }
    getUserId(user, callback){
        console.log('Comienzo getUserId');
        this.pool.getConnection(function(err,connection){
            if(err){
                console.log('Error en getUserId');
                callback(err);
            }else{
                const sql = "SELECT id_usuario FROM usuarios WHERE email = ?";
                connection.query(sql, user ,function (err, resultado) {
                    connection.release();
                    if (err) {
                        console.log('Error en query getUserId',err)
                        callback(err);
                    } else {
                        console.log('Id usaurio', resultado);
                        callback(err, resultado);
                    }
                })
            }
               
        })
    }
    /*
    SELECT id_usuario FROM usuarios WHERE email = 'gustavo_rana@gmail.com'
    */
    


    getQuestionsByTag(tag,callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(err);
            }else{
                const sql = "SELECT * FROM etiqueta WHERE etiquetas = ?";
                connection.query(sql,[tag],function(err,resultado){
                    connection.release();
                    if(err){
                        console.log('Error en query que recupera id_pregunta por etiqueta ',err)
                        callback(err);
                    }else{
                        console.log('Ha recibido etiquetas', resultado);
                        const sql2 = "SELECT * FROM preguntas WHERE id_pregunta IN (";
                        for(i=0;i<resultado.id_pregunta.length-1;i++){
                            sql2+="?,";
                        }
                        sql2 = sql2.substring(0, sql2 - 1);
                        sql2+=")";
                        console.log('la uqery que va a ejecutar ',sql2);
                        connection.query(sql,[resultado.id_pregunta],function(err,resultado){
                            connection.release();
                            if(err){
                                console.log('Error en query que recupera preguntas por etiqueta ',err)
                                callback(err);
                            }else{
                                console.log('Query que recupera preguntas por etiqueta ',resultado)
                                callback(err,resultado);
                            }
                        })
                    }    
                })
            }
        })
    }

    getQuestionsByWord(word,callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(err);
            }else{
                const sql = "SELECT * FROM preguntas WHERE cuerpo CONTAINS = ?";
                connection.query(sql,[word],function(err,resultado){
                    connection.release();
                    if(err){
                        console.log('Error en query que recupera preguntas por palabra ',err)
                        callback(err);
                    }else{
                        console.log('Query que recupera preguntas por palabra ',resultado)
                        callback(err,resultado);
                    }
                })
            }
        })
    }

    getQuestionsBySpace(callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(err);
            }else{
                const sql = "SELECT * FROM preguntas WHERE respuesta CONTAINS = ?";
                connection.query(sql,'',function(err,resultado){
                    connection.release();
                    if(err){
                        console.log('Error en query que recupera preguntas sin respuesta',err)
                        callback(err);
                    }else{
                        console.log('Query que recupera preguntas sin respuesta',err)
                        callback(err,resultado);
                    }
                })
            }
        })
    }
    /*insertOption(question, option, isInit, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "INSERT INTO option(question,option,isInit) VALUES(?,?,?);";
                connection.query(sql, [question, option, isInit], function (err, resultado) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, resultado);
                    }
                })
            }
        })
    }

    insertOptions(question, options, isInit, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                let sql = "INSERT INTO option(question,option,isInit) VALUES";
                let values = [];
                let i;
                for (i = 0; i < options.length - 1; i++) {
                    values.push(question);
                    values.push(options[i]);
                    values.push(isInit);
                    sql += "(?,?,?),"
                }
                values.push(question);
                values.push(options[options.length - 1]);
                values.push(isInit);
                sql += "(?,?,?)"

                connection.query(sql, values, function (err, resultado) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, resultado);
                    }
                })
            }
        })
    }

    searchOption(question, option, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "SELECT * FROM option WHERE question = ? AND option =?";
                connection.query(sql, [question, option], function (err, resultado) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, resultado);
                    }
                })
            }
        })
    }*/
}
module.exports = DAOQuestion;