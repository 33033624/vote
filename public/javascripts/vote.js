$(document).ready(function($) {
	$.ajax({
		url: '/vote/index/data?limit=10&offset=0',
		type: 'GET',
		success: function(data) {
			data = JSON.parse(data)
			console.log(data)
		}
	})

});