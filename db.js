module.exports = require('mysql').createPool({
	connectionLimit: 100,
	host: 'localhost',
	user:'root',
	password:'root@lamp',
	database: 'auto-torrent',
	debug: false
});
