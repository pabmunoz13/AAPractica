class DAOUsers {
    constructor(pool) { this.pool = pool; }
    insertUser(user, callback){
        console.log('llamamos al metodo insertUser');
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(err);
            }else{
                //console.log('llamamos al metodo insertUser');
               // if(imagen === undefined){
                    //meter random que seleccione imagenes
                //    imagen =  "../img/defecto1.png";
                //}
                console.log('recogemos los datos a introducir ', user);
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
                const reputacion = 1;
                const num = 0;
                console.log('fecha ', fecha);
                const sql = "INSERT INTO usuarios(email,pass,nombre,imagen,fecha_alta,reputacion,num_preg,num_resp) VALUES(?,?,?,?,?,?,?,?);";
                connection.query(sql,[user.email,user.pass,user.nombre,user.imagen,fecha,reputacion,num,num],function(err,resultado){
                    connection.release();
                    if(err){
                        console.log('da algun error ',err);
                        callback(err);
                    }else{
                        console.log(resultado);
                        callback(err,resultado);
                    }
                })
            }
        })
    }
   /*insertUser(user, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "INSERT INTO user(nick,email,pass,sex,birthday,img,point) VALUES(?,?,?,?,?,?,?);";
                let values = [user.nick, user.email, user.password, user.sex, user.birthday, user.img, 0]
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
    }*/

    getUser(id, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                console.log("id " + id)
                const sql = "SELECT * FROM usuarios WHERE email = ? ";
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

    modifyUser(user, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "UPDATE user SET nick=?,password=?,sex=?,birthday=?,img=? WHERE id=?;";
                let values = [user.nick, user.password, user.sex, user.birthday, user.img, user.id]
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

    getUserByEmail(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "SELECT * FROM usuarios WHERE email = ? ";
                connection.query(sql, [email], function (err, resultado) {
                    
                    connection.release();
                    if (err) {
                        console.log('error QUERY en getUserByEmail');
                        callback(err);
                    } else {
                        console.log('QUERY correcta en getUserByEmail');
                        callback(err, resultado);
                    }
                })
            }
        })
    }

    isUserCorrect(email, pass, callback) {
        
        console.log("daoEntrada: "+ email + pass);
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "SELECT * FROM usuarios WHERE email = ? AND pass= ?";
                connection.query(sql, [email, pass], function (err, resultado) {
                    
                    console.log("dao: "+ email);
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

    getUserImageName(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "SELECT imagen FROM usuarios WHERE email = ? ";
                connection.query(sql, [email], function (err, resultado) {
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

    

    searchUser(word, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "SELECT * FROM usuarios WHERE nombre LIKE ?";
                connection.query(sql, "%" + word + "%", function (err, resultado) {
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


    addUserPhoto(id,photo,callback){
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "INSERT INTO photo(user,photo) VALUES(?,?);";
                connection.query(sql, [id, photo], function (err, resultado) {
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

   
    getUserPhoto(id,callback){
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                const sql = "SELECT imagen FROM usuarios WHERE email = ?";
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

}
module.exports = DAOUsers;