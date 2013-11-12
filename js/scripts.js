	// -------------------
	// vars
	// -------------------
	
	// dom
	var section,
		nav,
		links,
		win = window;
		
	// vars	
	var speed = 250;
	var params = 'height=600, width=600';
	
	
	
	
	// -------------------
	// utility
	// -------------------	
	
	// hash data	
	var getData = function() {
		var data = {};
		data.hash = (win.location.hash !== '') ? win.location.hash : '#about',
		data.url = 'pages/' + data.hash.substring(1) + '.html'
		return data;
	}
	
	// restore hashchanges
	var restore = function(h) {
		win.location.hash = h;
		setTimeout(function() {
			$(win).bind('hashchange', change);
		}, speed / 10);
	}
	
	// add active class
	var addClass = function(h) {
		nav.each(function(i, e) {
			var n = $(e).attr('href');
			if (n == h) $(e).addClass('active');
			else $(e).removeClass();
		});
	}
	
	
	
	// -------------------
	// handlers
	// -------------------	
	
	// share
	var share = function() {
		win.open(this.href, '', params);
		return false;
	}	
	
	// hashchange
	var change = function() {
		var data = getData();
		
		$(win).unbind('hashchange');		
		section.fadeOut(speed, function() {
			section
				.load(data.url)
				.fadeIn(speed, function() {
					restore(data.hash);
				});
		})
		addClass(data.hash);
		return false;
	}
	
	
	
	// -------------------
	// init
	// -------------------	
	
	// binding
	var binding = function() {		
		$(win).bind('hashchange', change);
		links.bind('click', share);		
	}
	
	// run
	var run = function() {
		if (window.location.hash === '') {
			window.location.hash = '#about';
		}	
		else change();
	}
		
	// init
	var init = function() {		
		nav     = $('nav a');
		section = $('section');
		links   = $('header div:last a');
		
		$('header span').textition({
			autoplay: true,
			handler: false,
			interval: 3,
			speed: 1,
			map: {x: 50, y: 20, z: 500},
		});
		
		binding();
		run();		
	}
	
	
	$(document).ready(init);