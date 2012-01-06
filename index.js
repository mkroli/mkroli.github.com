$(function() {
	$('#content > ul > li').each(function(index, element) {
		var toggleLink = $(element).children('.togglelink');
		var description = $(element).children('.description');
		var link = $(description).children('a.projectlink');

		link.text("Project's page");
		description.hide();

		toggleLink.click(function() {
			description.slideToggle();
		});
	});
});
