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
	// demos
	// -------------------
		
	var demos = function() {
		
		$('#axis-x').textition({
			map: {
				x: 100,
				y: 0,
				z: 0
			}
		})		
		
		$('#autoplay').textition({
			speed: 1,
			animation: 'ease-out',
			map: {
				x: 200,
				y: 100,
				z: 0
			},
			autoplay: true,
			interval: 1.5
		})
		
		$('#axis-z').textition({
			speed: 0.5,
			map: {
				x: 0,
				y: 0,
				z: 100
			},
			perspective: 30
		})
		
        $('#buttons a').each(function() {
            $(this).textition({
				speed: 0.7,
                handler: 'mouseenter mouseleave'
            })
        });
		
		$('#sliding').textition({
			speed: 0.5,
			animation: 'ease-out',
			map: {
				x: 0,
				y: 40,
				z: 0
			},
			element: $('#arrow-next')
		})								
	}
		
	
	
	// -------------------
	// utility
	// -------------------	
	
	// hash data	
	var getData = function() {
		var data = {};
		data.hash = (win.location.hash !== '') ? win.location.hash : '#about',
		data.url = getUrl(data.hash);
		return data;
	}
	
	var getUrl = function(val) {
		return 'pages/' + val.substring(1) + '.html'
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
			section.load(data.url, function() {
				section.fadeIn(speed, function() {
					restore(data.hash);
				});
				if (data.hash === '#demos') {
					demos();
				}				
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
	
	// preload templates
	var preload = function() {
		nav.each(function(i, e) {
			var name = $(e).attr('href');
            $.ajax({
				url: getUrl(name)
			});
        });
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
		
		preload();
		binding();
		run();		
	}
	
	
	$(document).ready(init);