const queryString = require('query-string');

module.exports = searchCtrl;

function searchCtrl(dispatch, subscribe, getState){
	setSearchBar();

	function setSearchBar(){
		const searchQuery = queryString.parse(window.location.search).q;
		if (searchQuery) $('#search-input').val(searchQuery);
	}

}