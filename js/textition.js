
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
			speed:       1,             // animation speed in seconds
			distance:    50,            // transition distance, can be set for each axis: [50, 150, 100]
			animation:   'ease-in-out', // ease, ease-in, ease-out, ease-in-out, linear
			handler:     'click',       // all events
			axis:        'x',           // axises: ['x', 'y', 'z']
			perspective: 300,			// perspectve in pixels
			autoplay:    true,          // true or false
			intrval:     500			// autoplay interval
		}, options);
		
		
		// vars
		var div = this,
			span = this.children(),
			index = 0,
			position = {};
		
		
		// ----------------
		// CSS
		// ---------------
		
		
		
		
		// create styles
		var createStyles = function() {
			var position = div.css('position');
			var height = div.height();
			var current = (position === 'static') ? 'relative' : position;
			
			var styles = {
				position: current,
				height: height
			}
			styles.add('perspective');
			div.css(styles)

			/*
			var css = 't {display:inline-block; ' + transition('string') + ';}'
			var head = $('head');
			var style = $('<style>');
			
			style
			.attr('type', 'text/css')
			.text(css)
			.appendTo(head);
			*/

		}
		
		
		// draw
		var draw = function() {
			createStyles();
		}
		
		
		// init
		var init = function() {
			draw();
			//bind();
			//play();
		}
		
		
		// Run		
		init();
		
		
		/*
		var wrap = this;
		var span = this.children();
		var wrapTop = wrap.offset().top;
		var wrapLeft = wrap.offset().left;
		var index = 0;
		var top, left;
		var interval;
		
        var option = $.extend({
			speed: 1,
			animation: 'ease-in-out',
			distance: 50,
			axis: ['x', 'y', 'z'],
			handler: 'click',
			autoplay: true,
			changeSpeed: 500
		}, options);
		
		var next = function() {
			index++;
			if (index > span.length - 1) {
				index = 0;
			}			
		}
		
		var val = function() {
			return Math.round(Math.random() * option.distance) - option.distance / 2;
		}
		
		var disappear = function(e) {
			$(e)
			.css('opacity', 0)
			.children().each(function() {
				var x = 0, y = 0, z = 0;
				
				for (var i = 0; i < option.axis.length; i++) {
					switch(option.axis[i]) {
						case 'x':
							x = val()
							break
							
						case 'y':
							y = val()
							break
							
						case 'z':
							z = val()
							break														
					}
				}				
				
				$(this).css('-webkit-transform', 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
			});			
		}
		
		var appear = function(e) {
			$(e)
			.css('opacity', 1)
			.children().each(function() {
				$(this).css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
			});			
		}
		
		var run = function() {
			disappear(span[index]);
			next();
			appear(span[index]);
			return false;
		}
		
		var binding = function() {
			wrap.bind(option.handler, run)
		}
		
		var rewrite = function(i) {
			var e = $(this);
			var text = e.html();
			var code = '';

			for (var j = 0; j < text.length; j++) {
				var s = (text[j] == ' ') ? '&nbsp;' : text[j];
				code += '<t>' + s + '</t>';
			}						
			e.html(code);
			
			if (i != 0) {
				disappear(e)
			}			
			
			e.css({
				'display': 'block',
				'position': 'absolute',				
				'left': left,
				'top': top,
				'-webkit-transform-style': 'preserve-3d',
				'-webkit-transition': 'opacity ' + option.speed + 's ' + option.animation
			})
		}
				
		var styles = function() {			
			var p = wrap.css('position');
			var h = wrap.height();
			var t = '\nt {\n\tdisplay:inline-block;\n\t-webkit-transition:-webkit-transform ' + option.speed + 's ' + option.animation + ';\n}\n'
			wrap.css({
				'position': (p === 'static') ? 'relative' : p,
				'height': h,
				'-webkit-perspective': '700px'
			});
			$('head').append('<style type="text/css">' + t + '</style>');
			
			var first = span.hide().first().show();			
			left = first.offset().left - wrapLeft;
			top = first.offset().top - wrapTop;
						
		}
				
		var draw = function() {			
			styles();
			span.each(rewrite);			
		}		
		
		var autoplay = function() {
			run();
		}
		
		var init = function() {
			draw();
			binding();  
			if (option.autoplay) {
				interval = setInterval(autoplay, option.changeSpeed);
			}
		}
		
		init();
		*/
	}
})(jQuery)