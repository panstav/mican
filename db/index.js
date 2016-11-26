const _ = require('lodash');

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
mongoose.Promise = global.Promise;

// models
const groupSchema = mongoose.Schema(require('./models/group'));
groupSchema.plugin(timestamps);
const groupModel = mongoose.model('group', groupSchema);

module.exports = {

	init,
	close,

	models: {
		groups: groupModel
	},

	queries: {
		getGroupsByCategory
	}

};

function getGroupsByCategory(category){
	return mongoose.model('group').find({ color: category }).lean().exec();
}

function init(){

	const p = new Promise((resolve, reject) => {
		mongoose.connection.on('error', reject);
		mongoose.connection.on('disconnected', () => console.log('Mongoose connection disconnected'));
		mongoose.connection.on('connected', () => {
			console.log('Mongoose connection established');
			resolve(mongoose.connection);
		});

		mongoose.connect(process.env.MONGODB_URI);
	});

	return p.catch(err => {
		console.log(err.message);
		console.log(err.stack);
	});

}

function close(){
	return new Promise(resolve => mongoose.connection.close(resolve));
}