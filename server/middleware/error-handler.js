module.exports = errorHandler;

function errorHandler(err, req, res, next){

	// console error with stack
	console.error(err);
	console.error(err.stack);

	// return 500
	res.status(500).end();

}