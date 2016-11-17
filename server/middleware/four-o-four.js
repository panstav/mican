module.exports = fourOFour;

function fourOFour(req, res){

	// respond with redirection to homepage for html requests
	if (req.accepts('html')) return res.redirect('/');

	// otherwise just return 404
	res.status(404).end();
}