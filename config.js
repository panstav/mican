const fs = require('fs');

const config = {
	domain: process.env.NODE_ENV === 'production'
		? 'https://www.mican.co.il/'
		: `localhost:${process.env.PORT}/`,

	meta: require('./client/meta'),
	categories: require('./client/categories')
};

fs.readdir('./public', (err, files) => {
	config.randomHash = files.find(filename => filename.includes('.js')).split('.')[0];
});

module.exports = config;