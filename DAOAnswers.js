class DAOAnswers{
    constructor(pool){this.pool = pool;}

    idUserCorrect(email,password,callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(err);
            }else{
                const sql = "SELECT * FROM user WHERE email = ? AND password = ?";
                connection.query(sql,[email,password],function(err,resultado){
                    connection.release();
                    if(err){
                        callback(err);
                    }else{
                        callback(err,resultado);
                    }
                })
            }
        })
    }

    getUserImageName(email, callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(err);
            }else{
                const sql = "SELECT img FROM user WHERE email = ? ";
                connection.query(sql,[email],function(err,resultado){
                    connection.release();
                    if(err){
                        callback(err);
                    }else{
                        callback(err,resultado);
                    }
                })
            }
        })
    }

}
module.exports = DAOAnswers;