var section;
var nav;
var links;
var win = window;
var speed = 250;
var params = 'height=600, width=600';

var share = function() {
	win.open(this.href, '', params);
	return false;
}

var addClass = function(hash) {
	nav.each(function(i, e) {
		var name = $(e).attr('href');
		if (name == hash) {
			$(e).addClass('active');
		}
		else {
			$(e).removeClass();
		}
	});
}

var check = function() {
	var hash = win.location.hash;
	if (hash === '') hash = '#about';
	$(win).unbind('hashchange');	
	
	section.fadeOut(speed, function() {
		section
			.load('pages/' + hash.substring(1) + '.html')
			.fadeIn(speed, function() {
				win.location.hash = hash;
				setTimeout(function() {
					$(win).bind('hashchange', check);
				}, speed / 10);
			});
	})
	addClass(hash);
	return false;
}

var binding = function() {
	check();
	$(win).bind('hashchange', check);
	links.bind('click', share);
	
}

var init = function() {
	section = $('section');
	nav = $('nav a');
	links = $('header div:last a');
	$('header span').textition({
		autoplay: true,
		handler: false,
		interval: 3,
		speed: 1,
		map: {
			x: 50,
			y: 20,
			z: 500
		},
	});
	binding();
}


$(document).ready(init);