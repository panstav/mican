const _ = require('lodash');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// models
const groupModel = mongoose.model('group', mongoose.Schema(require('./models/group')));

module.exports = {

	init,
	close,

	models: {
		groups: groupModel
	},

	queries: {
		getGroupsOverview,
		getGroupsByCategory
	}

};

function getGroupsOverview(){
	return mongoose.model('group').find({}, 'displayName desc profile').lean().exec()
		.then(groups => groups.map(group => ({
			title: group.displayName,
			desc: group.desc,
			image: _.get(group, 'profile.hero.url')
		})));
}

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

		mongoose.connect(process.env.MONGO_URI);
	});

	return p.catch(err => {
		console.log(err.message);
		console.log(err.stack);
	});

}

function close(){
	return new Promise(resolve => mongoose.connection.close(resolve));
}