const queryString = require('query-string');

module.exports = searchCtrl;

function searchCtrl(dispatch, subscribe, getState){

	// sets search-input value to search that got us here
	const searchQuery = queryString.parse(window.location.search).q;
	if (searchQuery) $('#search-input').val(searchQuery);

}