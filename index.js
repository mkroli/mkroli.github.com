function getAnchor() {
	if (document.location.hash.length <= 1)
		return null;
	else
		return document.location.hash.substring(1);
}

$(function() {
	/* Display loading message */
	$('#content').hide();
	$('body').append('<h1 id="loading">Loading...Please Wait</h1>');

	function displayContent() {
		$('#loading').fadeOut(function() {
			$('#content').fadeIn();
		});
	}

	/* Impressum */
	$.get('impressum.html', null, function(data) {
		$('#content > #footer').before(data);
		createMenu();
		createDescription();

		displayContent();
	}, 'html');

	function createMenu() {
		var anchor = getAnchor();
		var currentContent = anchor == null || anchor.length < 1 ? 'Projects' : anchor.substring(1);
		$('#content').prepend('<ul id="tabs"></ul>');
		$('#content > div.content').each(
				function(index, element) {
					var id = $(element).attr('id');
					$('#content > #tabs').append(
							'<li id="' + id + '">' + id.replace(/_/g, ' ')
									+ '</li>');
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
								var newContent = $(this).attr('id')
								if (currentContent != newContent) {
									$('#content > #tabs > li').removeClass('current')
											.addClass('other');
									$(this).removeClass('other').addClass('current');
									document.location.hash = '#_' + newContent;
									$('#content > #' + currentContent).fadeOut(
											function() {
												$('#content > #' + newContent)
														.fadeIn();
											});
									currentContent = newContent;
								}
							});
				});
	}

	function createDescription() {
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
	}
});
