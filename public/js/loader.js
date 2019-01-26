$(document).ready(function() {
	var top = $(window).height() / 2;
	var left = $(window).width() / 2;
	var size = left * (0.20);

	$("#loadertwo").css({
		"width" : size + "px",
		"height" : size + "px",
		"top" : top + "px",
		"left" : left + "px",
	});

	$(window).resize(function() {
		console.log("Setting configuration");
		var top = $(window).height() / 2;
		var left = $(window).width() / 2;
		var size = left * (0.20);

		$("#loadertwo").css({
			"width" : size + "px",
			"height" : size + "px",
			"top" : top + "px",
			"left" : left + "px",
		});
	});
})

function hideLoader() {
	$(document).ready(function() {
		console.log("Hiding loader");
		$("#loader-wrapper").css({
			"display" : "none"
		});
	});
}
function showLoader() {
	$(document).ready(function() {
		console.log("Loader visible");
		$("#loader-wrapper").css({
			"display" : "block"
		});
	});
}