const controllers = {
	'/': require('./pages/homepage'),
	'/search': require('./pages/search'),
	'/group/': require('./pages/group')
};

module.exports = { getCtrlByPath };

function getCtrlByPath(){

	return Object.keys(controllers)
		.filter(ctrl => window.location.pathname.indexOf(ctrl) === 0)
		.reduce((prevMatch, key) => prevMatch.length < key.length ? controllers[key] : prevMatch);

}