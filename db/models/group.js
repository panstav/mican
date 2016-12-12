module.exports = {

	title: String,
	description: [String],
	namespace: String,
	logo: String,
	hero: String,
	category: String,
	links: {
		homepage: String,
		twitter: String,
		facebook: String,
		google: String
	},
	contacts: [{
		channel: String,
		name: String,
		publicity: String,
		value: String
	}],
	pending: Boolean

};