var url = "BillBoardServer";
var fillUpPage = function(result){
	$.each( result, function( key, val ) {
	    console.log(val);
	  });
}
var postHttpRequest = function(url) {
	var text = $('#contents').val();
	$.ajaxSetup({
		url : url,
		global : true,
		type : "POST"
	});
	$.ajax({
		data : {
			"text" : text
		}
	});
};
var putHttpRequest = function(url, id) {
	var iF = "input_field_";
	iF += id;
	var text = $("#"+iF).val();
	alert(text);
	$.ajaxSetup({
		url : url,
		global : true,
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
	$.ajaxSetup({
		url : url,
		global : true,
		type : "DELETE"
	});
	$.ajax({
		data : {
			"idToDelete" : id.toString()
		}
	});
};
var getHttpRequest = function(url) {
	/*$.ajaxSetup({
		url : url,
		global : true,
		type : "GET"
	});*/
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
			fillUpPage(result);
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

