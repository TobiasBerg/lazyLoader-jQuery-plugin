(function( $ ){
    
    $.fn.lazyLoader = function( options ) {
        var settings = {
            container : window,
            interval  : 1,
            callback  : false
        };
        
        var triggers = [];
        $this = this;
		all_elems = this;
        var selector = $this.selector;

        $.extend( settings, options );
        
        // Creating an array of the elements we want to have as triggers
        $i = 1;
        $this.each(function(index, value) {
            if (($i % settings.interval) === 0) {
                triggers.push(value);
            }
            $i++;
        });
		        
        // Bind on scroll
        $(settings.container).bind('scroll', function() {
            if (typeof triggers[0] === 'object') {
                if ($.isInView(triggers[0], settings)) {
                    
                    if (typeof settings.callback == 'function') {
                        var next_elems = $(selector + ":gt(" + all_elems.index(triggers[0]) + "):lt(" + settings.interval + ")");     
                        
                        settings.callback.call(next_elems, 'fisk');
                    }
                    
					triggers = triggers.slice(1);
				}
			}
            
        });
        
        // Function for determining if element is in view of the user
        $.isInView = function(element, settings) {
            var elem = $(element);
            if (settings.container === undefined || settings.container === window) {
                var fold = $(window).height() + $(window).scrollTop();
            } else {
                var fold = $(settings.container).offset().top + $(settings.container).height();
            }
            return fold >= elem.offset().top;
            
        };
    };
})( jQuery );
