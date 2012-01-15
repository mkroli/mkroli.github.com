function getAnchor() {
	if (document.location.hash.length <= 1)
		return null;
	else
		return document.location.hash.substring(1);
}

$(function() {
	/* Menu */
	var anchor = getAnchor();
	var currentContent = anchor == null ? 'Projects' : anchor;
	$('#content > div.content').each(function(index, element) {
		var id = $(element).attr('id');
		$('#content > #tabs').append('<li id="' + id + '">' + id + '</li>');
		if (id != currentContent) {
			$(element).hide();
			$('#content > #tabs > li#' + id).addClass('other');
		} else
			$('#content > #tabs > li#' + id).addClass('current');
	});
	$('#content > #tabs > li').each(
			function(index, element) {
				$(element).click(
						function() {
							$('#content > #tabs > li').removeClass('current')
									.addClass('other');
							$(this).removeClass('other').addClass('current');
							var newContent = $(this).attr('id')
							document.location.hash = '#' + newContent;
							if (currentContent != newContent) {
								$('#content > #' + currentContent).fadeOut(
										function() {
											$('#content > #' + newContent)
													.fadeIn();
										});
								currentContent = newContent;
							}
						});
			});

	/* Description */
	$('#content > .content > ul > li').each(function(index, element) {
		var toggleLink = $(element).find('.togglelink');
		var description = $(element).find('.description');
		var link = $(description).find('a.projectlink');
		var visible = false;

		toggleLink.css('background-image', 'url("plus.png")');
		link.text("Project's page");
		description.hide();

		toggleLink.click(function() {
			if (visible) {
				toggleLink.css('background-image', 'url("plus.png")');
				description.hide();
			} else {
				toggleLink.css('background-image', 'url("minus.png")');
				description.show();
			}
			visible = !visible;
		});
	});
});
