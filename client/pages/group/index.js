module.exports = groupCtrl;

function groupCtrl(dispatch, subscribe, getState){

	$('[data-role="group-summary"] [data-action="read-more"]').one('click', function(){
		$(this).hide();
		$('[data-role="group-description"]').show();
	});
	
}