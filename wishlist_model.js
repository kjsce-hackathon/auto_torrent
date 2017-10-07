module.exports = {
	insert: (user_id,type,query,time)=>{

		return new Promise((resolve,reject)=>{
			pool = require("./db.js");
			pool.getConnection(function(err, connection){
				if(err)
					return reject(err);
				else
				{
					let sql = "INSERT INTO wishlist (user_id,type,query,time) VALUES("+user_id+",'"+type+"','"+query+"','"+time+"')";
					connection.query (sql,function(err,rows){
						connection.release();
						if(err)
							return reject(err);
						else
							resolve(rows);
					}); 
				}
			});
		});
	}
	,

	get: (user_id)=>{
		return new Promise((resolve,reject)=>{
			pool = require("./db.js");
			pool.getConnection(function(err, connection){
				if(err)
					return reject(err);
				else{

					let sql = "select type, query ,time from wishlist where user_id="+user_id+";";
					connection.query (sql,function(err,rows){
						connection.release();
						if(err)
							return reject(err);
						else
							resolve(rows);
					});

				  }; 

			});

	});
	}
}