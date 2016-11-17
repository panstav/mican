const guid = require('random-guid');

const config = {
	randomHash: guid.randomString().substr(0, 10),
	domain: process.env.NODE_ENV === 'production'
		? 'https://www.mican.co.il/'
		: `localhost:${process.env.PORT}/`,

	meta: require('./client/meta'),
	categories: require('./client/categories')
};

module.exports = config;