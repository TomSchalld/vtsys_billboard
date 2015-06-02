var url = "BillBoardServer";

var postHttpRequest = function(url) {
	var text = $('#contents').val();
	$.ajaxSetup({
		url : url,
		global : false,
		type : "POST"
	});
	$.ajax({
		data : {
			"text" : text
		}
	});
};
var putHttpRequest = function(url, id) {
	var iF = "'#input_field_";
	iF += id;
	iF += "'";
	var text = $(iF).val();
	$.ajaxSetup({
		url : url,
		global : false,
		type : "PUT"
	});
	$.ajax({
		data : {
			"indexToUpdate" : id,
			"text" : text

		}
	});
};
var deleteHttpRequest = function(url, id) {
	alert(url + id);
	$.ajaxSetup({
		url : url,
		global : false,
		type : "DELETE"
	});
	$.ajax({
		data : {
			"text" : "test"
		}
	});
};
var getHttpRequest = function(url) {
	$.ajaxSetup({
		url : url,
		global : true,
		type : "GET",
		dataType: "json"
	});
	$.ajax({
		data : {

		},
		success : function(result) {
			console.log(result);
			$('#posters').html(result);
			$('.updatebutton').click(function() {
				putHttpRequest(url, this.id);
			});
			$('.deletebutton').click(function() {

				deleteHttpRequest(url, this.id);
			});
		},
		error : function(error) {
			$('#posters').html('Seite wird geladen ...');

		}
	});

};
$(window).load(function() {
	window.setInterval(function() {
		getHttpRequest('BillBoardServer');
		$('#timestamp').html(new Date().toString());
	}, 8000);

});
$('#postbutton').click(function() {
	postHttpRequest(url);
});
/*
 * $('#updatebutton').click(function() { alert("update"); });
 * $('#deletebutton').click(function() { alert("delete"); });
 */

