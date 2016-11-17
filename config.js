const version = require('./package.json').version;

const isProduction = process.env.NODE_ENV === 'production';

const config = {
	isProduction,
	version,

	domain: isProduction
		? 'https://www.mican.co.il/'
		: `localhost:${process.env.PORT}/`,

	meta: require('./client/meta'),
	categories: require('./client/categories')
};

module.exports = config;