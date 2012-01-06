$(function() {
	$('#content > ul > li').each(function(index, element) {
		var toggleLink = $(element).children('.togglelink');
		var description = $(element).children('.description');
		var link = $(description).children('a.projectlink');
		var visible = false;

		toggleLink.css('background-image', 'url("plus.png")');
		link.text("Project's page");
		description.hide();

		toggleLink.click(function() {
			if (visible) {
				toggleLink.css('background-image', 'url("plus.png")');
				description.slideUp();
			} else {
				toggleLink.css('background-image', 'url("minus.png")');
				description.slideDown();
			}
			visible = !visible;
		});
	});
});
