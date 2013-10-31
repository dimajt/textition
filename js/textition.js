
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
			speed:       0.5,             // animation speed in seconds
			distance:    1000,            // transition distance, can be set for each axis: [50, 150, 100]
			animation:   'ease-in-out', // ease, ease-in, ease-out, ease-in-out, linear
			handler:     'click',       // all events
			axis:        'z',           // axises: ['x', 'y', 'z']
			perspective: 300,			// perspectve in pixels
			autoplay:    true,          // true or false
			intrval:     500			// autoplay interval
		}, options);
		
		
		// vars
		var div = this,
			child = this.children(),
			letters,
			index = 0,
			position = {},
			prefix = [
				'-webkit-', 
				'-moz-', 
				'-ms-', 
				'-o-',
				''
			];		
		
		
		
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
		}
		
		
		var setAxis = function() {
			if (!data.distance.length) {
				var val = data.distance;
				data.distance = [];
				for (var i = 0; i < 3; i++) {
					data.distance[i] = val;
				}				
			}			
			if (data.distance.length == 2) {
				data.distance[2] = 0;
			}
		}
		
		// random distance
		var val = function(axis) {			
			return Math.round(Math.random() * data.distance[axis]) - data.distance[axis] / 2;
		}							
		
		
		
		// ----------------
		// BIND
		// ---------------
		
		// hide letters
		var hide = function() {
			var x = 0, y = 0, z = 0;				
			for (var i = 0; i < data.axis.length; i++) {
				switch(data.axis[i]) {
					case 'x':
						x = val(0)
						break						
					case 'y':
						y = val(1)
						break						
					case 'z':
						z = val(2)
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
		var run = function() {
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
				                   'left': position.left,
				                    'top':  position.top				
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
				             'height': div.height()				
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
			other.css('opacity', 0);
			
			divStyle();
			child.each(createLetters);			
			child.each(childStyle);			
			
			letters = div.find('l');
			letters.each(letterStyle);
			other.children().each(hide);
		}
		
		
		// init
		var init = function() {
			var time = new Date();
			getPosition();
			setAxis();
			draw();
			div.bind(data.handler, run);
			//play();
		}
		
		
		// Run		
		init();		

	}
})(jQuery)