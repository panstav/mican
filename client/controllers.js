const controllers = {
	'/': require('./pages/homepage'),
	'/search': require('./pages/search'),
	'/group/': require('./pages/group')
};

module.exports = { getCtrlByPath };

function getCtrlByPath(){

	const currentUrl = window.location.pathname;

	const matchControllerKey = Object.keys(controllers)
		.filter(path => currentUrl.indexOf(path) === 0)
		.reduce((matchPath, path) => matchPath.length < path.length ? path : matchPath, '');

	return controllers[matchControllerKey];
}