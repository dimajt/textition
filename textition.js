(function($){
   $.fn.textition = function(options){       
      
		var span = $('span', this),
		first = 0,
		last = span.size(),
		height = this.height(),
		width = this.width(),
		transition,
		transform,
        option = $.extend({
			speed: 0.5,
			distance: 100,
			animation: 'ease',
			axis: 'xy'
		}, options);
		
		browser();//detect browser
		
		span.css('opacity', 0)
		.each(function(i) {
			var t = '';
			var s = $(this).html().split('');

			$.each(s, function(i) {
				if (s[i] == ' ') {
					t += '<a>&nbsp;</a>';
				}
				else {
					t += '<a>'+s[i]+'</a>';				
				}
			});
			
			$(this).html(t).css({
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'height': '100%',
				'width': '100%'
			});
			if (i !== 0) disappear(i);
						
        }).first().css('opacity', 1);
		
		setTimeout(timeout, 10);//hide transition on start (Opera, Firefox)
		
		$('a', span).css({
			'display': 'inline-block',			
			transition: transform+' '+option.speed+'s '+option.animation
		});			

		this.css({
			'position': 'relative',
			'height' : height,
			'width' : width
		}).live('click', textition);
		 
		function textition() {			
			disappear(first);
			first++;
			if (first > last-1 ) first = 0;			
			appear(first);			
			return false;
		}
		
		function disappear(n) {
			span.eq(n).css('opacity', 0).children().each(function() {
				var x = 0, y = 0;
				if (option.axis == 'xy') {
					x = rand();
					y = rand();
				}
				else {
					if (option.axis == 'x') {
						x = rand();
					}
					else {
						y = rand();
					}
				}
				$(this).css(transform, 'translate('+x+'px, '+y+'px)');
			});			
		}
		
		function appear(n) {
			span.eq(n).css('opacity', 1).children().css(transform, 'translate(0, 0)');
		}		
		
		function rand() {
			var m = Math.random();
			var r = m * option.distance;
			if (m < 0.5) r *= -1;
			return r;			
		}
		
		function browser() {
			var t;			
			if ($.browser.msie)    t = '-ms-';
			if ($.browser.webkit)  t = '-webkit-';
			if ($.browser.opera)   t = '-o-';
			if ($.browser.mozilla) t = '-moz-';
			transform = t + 'transform';
			transition = t + 'transition';
		}
		
		function timeout() {
			span.css(transition, 'opacity '+option.speed+'s '+option.animation);
		}
   };
})(jQuery);