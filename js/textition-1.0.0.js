
/* * * * * * * * * * * * * * * * * * * * * * *
 * textition.js v1.0.2
 * https://github.com/dimajt/textition.js
 * Dima Karpov (c) 2013
 * * * * * * * * * * * * * * * * * * * * * * */

(function($) {
	$.fn.textition = function(options) {
		
		
		
		// ----------------
		// VARS
		// ---------------
		
		// options
        var data = $.extend({			
			map: {
				x: 100,
				y: 50,
				z: 1000
			},
			speed:       1,
			animation:   'ease',
			handler:     'click',			
			perspective: 300,
			autoplay:    false,
			interval:    3,
			element:     this
		}, options);
		
		
		// vars
		var div = this,
			child = this.children(),
			letters,
			index = 0,
			position = {},
			playing;
		
		
		
		// ----------------
		// UTILITY
		// ---------------
		
		// filter text
		var filter = function(val) {
			switch(val) {
				case ' ':
					return '&nbsp;'
					
				default:
					return val
			}			
		}	
		
		// get position
		var getPosition = function() {
			var span = child.first();
			position.top = span.offset().top - div.offset().top;
			position.left = span.offset().left - div.offset().left;
			position.width = span.width();
		}
		
		
		// random distance
		var val = function(val) {			
			return Math.round(Math.random() * val) - val / 2;
		}							
		
		
		
		// ----------------
		// BIND
		// ---------------
		
		// hide letters
		var hide = function() {
			var x = 0, y = 0, z = 0;				
			for (var i in data.map) {
				switch(i) {
					case 'x':
						x = val(data.map.x)
						break						
					case 'y':
						y = val(data.map.y)
						break						
					case 'z':
						z = val(data.map.z)
						break													
				}
			}			
			$(this).css({
				'-webkit-transform': 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)',
				   '-moz-transform': 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)',
			 	    '-ms-transform': 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)',
				     '-o-transform': 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)',
				        'transform': 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)'
			});			
		}
		
		// disappear
		var disappear = function(span) {
			$(span)
			.css('opacity', 0)
			.children()
			.each(hide);
			
			index++;
			if (index > child.length - 1) {
				index = 0;
			}			
		}
		
		// show
		var show = function() {
			$(this).css({
				'-webkit-transform': 'translate3d(0px, 0px, 0px)',
				   '-moz-transform': 'translate3d(0px, 0px, 0px)',
				    '-ms-transform': 'translate3d(0px, 0px, 0px)',
				     '-o-transform': 'translate3d(0px, 0px, 0px)',
				        'transform': 'translate3d(0px, 0px, 0px)'
			});			
		}
		
		// appear
		var appear = function(span) {
			$(span)
			.css('opacity', 1)
			.children()
			.each(show);
		}
		
		
		// run
		var run = function(e) {
			if (data.autoplay && e && !e.isTrigger) {
				clearInterval(playing)
				playing = setInterval(play, data.interval * 1000);
			}
			disappear(child[index]);
			appear(child[index]);			
		}


		// ----------------
		// CSS
		// ---------------	


		// child style
		var childStyle = function() {
			$(this).css({
				'-webkit-transform-style': 'preserve-3d',
				   '-moz-transform-style': 'preserve-3d',
				    '-ms-transform-style': 'preserve-3d',
				     '-o-transform-style': 'preserve-3d',
				        'transform-style': 'preserve-3d',
				     '-webkit-transition': 'opacity ' + data.speed + 's ' + data.animation,
				        '-moz-transition': 'opacity ' + data.speed + 's ' + data.animation,
				         '-ms-transition': 'opacity ' + data.speed + 's ' + data.animation,
				          '-o-transition': 'opacity ' + data.speed + 's ' + data.animation,
				             'transition': 'opacity ' + data.speed + 's ' + data.animation,
				               'position': 'absolute',
				                'display': 'block',
								  'width': position.width,
				                   'left': position.left,
				                    'top': position.top
			});
		}
		
		
		// div style
		var divStyle = function() {
			var pos = div.css('position');
			div.css({
				'-webkit-perspective': data.perspective + 'px',
				   '-moz-perspective': data.perspective + 'px',
				    '-ms-perspective': data.perspective + 'px',
				     '-o-perspective': data.perspective + 'px',
				        'perspective': data.perspective + 'px',
						   'position': (pos === 'static') ? 'relative' : pos,
				             'height': div.height(),
							  'width': div.width()
			});
		}
				
		
		//	letter style
		var letterStyle	= function() {
			$(this).css({
				'-webkit-transition': '-webkit-transform ' + data.speed + 's ' + data.animation,
				   '-moz-transition':    '-moz-transform ' + data.speed + 's ' + data.animation,
				    '-ms-transition':     '-ms-transform ' + data.speed + 's ' + data.animation,
				     '-o-transition':      '-o-transform ' + data.speed + 's ' + data.animation,
				        'transition':         'transform ' + data.speed + 's ' + data.animation,
				           'display':         'inline-block'
			})
		}
		
		
		
		// ----------------
		// INITIALIZATION
		// ---------------	
				
		
		// create letters
		var createLetters = function() {
			
			var span = $(this);
			var text = span.text();
			var code = '';			

			for (var i = 0; i < text.length; i++) {
				code += '<l>' + filter(text[i]) + '</l>';
			}		
			span.html(code);
		}
		
		// draw
		var draw = function() {
			var other = child.not(':first');
			other.hide().css('opacity', 0);
			
			divStyle();
			child.each(createLetters);			
			child.each(childStyle);			
			
			letters = div.find('l');
			letters.each(letterStyle);
			other.show().children().each(hide);
		}
		
		// play
		var play = function() {
			run();
		}
		
		
		// init
		var init = function() {
			var time = new Date();
			getPosition();
			draw();
			
			if (data.handler) {
				data.element.bind(data.handler, run);
			}			
			
			if (data.autoplay) {
				playing = setInterval(play, data.interval * 1000);
			}			
		}
		
		
		// Run		
		init();		

	}
})(jQuery)