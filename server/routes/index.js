const _ = require('lodash');
const fuzzy = require('fuzzyjs');

const config = require('../../config');
const db = require('../../db');

module.exports = router => {

	router.get('/search', search);

};

function search(req, res){

	// get search terms
	const terms = req.query.q;

	// redirect back to homepage upon empty terms
	if (!terms || !_.trim(terms)) return res.redirect(302, '/');

	return db.queries.getGroupsOverview()
		.then(groups => searchAlgo(groups))
		.then(sendResults)
		.catch(err =>{
			console.error(err);
			console.error(err.stack);
		});

	function searchAlgo(groups){

		return _(groups)
			.map(appendScore)
			.filter(group => group.score !== 0)
			.map(trimDesc)
			.sortBy('score')
			.sortBy(group => !group.hero)
			.map(group => {
				delete group.score;
				return group;
			})
			.value();

		function appendScore(group){

			group.score = fuzzy.match(terms, group.title).score;

			group.description.forEach(para => {
				const paraScore = fuzzy.match(terms, para).score;
				if (paraScore > 0.3) group.score += paraScore;
			});

			return group;
		}

		function trimDesc(group){
			group.description = group.description[0];
			return group;
		}

	}

	function sendResults(results){

		const meta = {
			namespace: 'search',
			title: `תוצאות חיפוש עבור ${terms} | מכאן`,
			description: _.get(results, '[0].description[0]') || 'לא נמצאו יוזמות למילות חיפוש אלו',
			url: `search?q=${terms.replace(' ', '+')}`
		};

		return res.pugRender('search', meta, { search: { terms, results } });
	}

}