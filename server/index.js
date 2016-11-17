const express =  require('express');
const enrouten = require('express-enrouten');
const compression = require('compression');
const morgan = require('morgan');
const pug = require('pug');
const _ = require('lodash');

const config = require('../config');
const isProduction = process.env.NODE_ENV === 'production';

const fourOhFour =    require('./middleware/four-o-four');
const errorHandler =  require('./middleware/error-handler');

module.exports = initServer;

function initServer(){

	// Boing
	const server = express();

	if (!isProduction) server.use(morgan('tiny'));

	// compress everything
	server.use(compression());

	// attach pug render function
	server.use(pugRender);

	// serve pages
	server.get('/', (req, res) => res.sendFile('homepage.html', { root: 'public/pages', maxAge: 0 }));
	// serve routes by their path and filename
	server.use(enrouten({ directory: 'routes' }));

	// serve static files
	server.use(express.static('public', { maxAge: 1000*60*60*24*365 }));
	
	//---======================================================---
	//--------- Fallback Routes
	//---======================================================---

	// 500
	server.use(errorHandler);

	// 404
	server.use(fourOhFour);

	return server;

}

function pugRender(req, res, next){
	res.pugRender = (path, meta, view) =>{

		if (meta.namespace) {
			_.merge(meta, { namespace: meta.namespace });
		}

		if (meta.title) {
			const title = meta.title;
			_.merge(meta, { title, og: { title }, twitter: { title } });
		}

		if (meta.description) {
			const description = meta.description;
			_.merge(meta, { description, og: { description }, twitter: { description } });
		}

		if (meta.image) {
			const image = meta.image;
			_.merge(meta, { image, og: { image }, twitter: { image } });
		}

		if (meta.author) {
			_.merge(meta, { author: meta.author });
		}

		const pugOptions = _.merge({ pretty: !isProduction }, config, { meta }, view);
		res.send(pug.renderFile(`client/pages/${path}/${path}.pug`, pugOptions));
		return Promise.resolve();
	};

	next();
}
