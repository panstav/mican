const dotenv = require('dotenv').config({ silent: process.env.NODE_ENV === 'production' });

const db = require('./db');
const initServer = require('./server');

initServer().listen(process.env.PORT || 3000, () => {
	console.log('Server is up!');
	db.init();
});