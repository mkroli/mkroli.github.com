function getAnchor() {
	if (document.location.hash.length <= 1)
		return null;
	else
		return document.location.hash.substring(1);
}

function preload(images, callback) {
	var countdownLatch = images.length;
	for ( var i = 0; i < images.length; i++) {
		var img = new Image();
		img.src = images[i];
		img.onload = img.onerror = img.onabort = function() {
			countdownLatch--;
			if (0 == countdownLatch)
				callback();
		}
	}
}

$(function() {
	var onResize = function() {
		var em = parseFloat($('body').css('font-size'));
		$('.content').css(
				'height',
				$(window).height() - $('#content').offset().top
						- $('#tabs').height() - $('#footer').height() - 1 * em);
	};
	$(window).resize(onResize);

	$('#header, #github, #footer a').mousedown(function() {
		return false;
	});

	/* Display loading message */
	$('#github').hide();
	$('#content').hide();
	$('body').append('<h1 id="loading">Loading...Please Wait</h1>');

	function displayContent() {
		$('#loading').remove();
		$('#github').show();
		$('#content').show();
	}

	/* Preloading stuff */
	preload(
			[
					'background.png',
					'plus.png',
					'minus.png',
					'https://a248.e.akamai.net/assets.github.com/img/4c7dc970b89fd04b81c8e221ba88ff99a06c6b61/687474703a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f77686974655f6666666666662e706e67',
					'http://www.xing.com/img/buttons/10_en_btn.gif' ],
			function() {
				$.get('impressum.html', null, function(data) {
					$('#content > #footer').before(data);
					createMenu();
					createDescription();

					displayContent();
					onResize();
				}, 'html');
			});

	function createMenu() {
		var anchor = getAnchor();
		var currentContent = anchor == null || anchor.length < 1 ? 'Projects'
				: anchor;
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
									$('#content > #tabs > li').removeClass(
											'current').addClass('other');
									$(this).removeClass('other').addClass(
											'current');
									document.location.hash = '#' + newContent;
									$('#content > #' + newContent).show();
									$('#content > #' + currentContent).hide();
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
					description.slideUp();
				} else {
					toggleLink.css('background-image', 'url("minus.png")');
					description.slideDown();
				}
				visible = !visible;
			});
		});

		$('#content .projectlink')
				.mouseover(
						function(eventObject) {
							var gradient = 'linear-gradient(top, rgba(255,255,255,0.7) 0%,rgba(255,255,255,0) 75%)';
							var prefix = [ '', '-moz-', '-webkit-', '-o-',
									'-ms-' ];
							for ( var i in prefix)
								$(this).css('background', prefix[i] + gradient);
						});
		$('#content .projectlink')
				.mousedown(
						function(eventObject) {
							var gradient = 'linear-gradient(top, rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.2) 75%)';
							var prefix = [ '', '-moz-', '-webkit-', '-o-' ];
							for ( var i in prefix)
								$(this).css('background', prefix[i] + gradient);
							$(this).css({
								'margin-top' : '3px',
								'margin-bottom' : '1px',
								'margin-left' : '3px',
								'margin-right' : '1px',
								'box-shadow' : '0 0 4px black'
							});
							return false;
						});
		var onmouseup = function(eventObject) {
			var gradient = 'linear-gradient(top, rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 75%)';
			var prefix = [ '', '-moz-', '-webkit-' ];
			for ( var i in prefix)
				$(this).css('background', prefix[i] + gradient);
			$(this).css({
				'margin-top' : '2px',
				'margin-bottom' : '2px',
				'margin-left' : '2px',
				'margin-right' : '2px',
				'box-shadow' : '1px 1px 4px black'
			});
		};
		$('.projectlink').mouseleave(onmouseup);
		$('.projectlink').mouseup(onmouseup);
		$('.projectlink').each(onmouseup);
	}
});
