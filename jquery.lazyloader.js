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
                    
                    if (typeof settings.callback === 'function') {
                        var nextElements = $(selector + ":gt(" + all_elems.index(triggers[0]) + "):lt(" + settings.interval + ")");
                        
                        settings.callback.call(nextElements, 'fisk');
                    }
                    
					triggers = triggers.slice(1);
				}
			}
            
        });
        
        // Function for determining if element is in view of the user
        $.isInView = function(element, settings) {
            var elem = $(element);
			var fold;
            if (settings.container === undefined || settings.container === window) {
                fold = $(window).height() + $(window).scrollTop();
            } else {
                fold = $(settings.container).offset().top + $(settings.container).height();
            }
            return fold >= elem.offset().top;
            
        };
    };
})( jQuery );
