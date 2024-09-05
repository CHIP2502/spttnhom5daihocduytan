/**
 * Author: Lama
 * Version: 1.0
 * Purpose: Custom Sticky
 * Use Case Example
 * ================
  	$('.sticky-content').StickyDL({
 	    paddingTop : 220, // default is 200
 		heightRefElement: '.main-content-end-padding', // default is  '.main-content-end-padding'
         optionalBottomFix: 95, // default is 0
         optionalTopFix: 0
 	})
 */

(function ( $ ) {
    $.fn.StickyDL = function(options) {

        //paddingTop = Height from the top of the document to the start position of scrolling container
        //heightRefElement = id/class of the last element from which the sticky has to stop
        //optionalBottonFix = Sometimes it needs to be added to fix the bottom scrolling position in DOM(optional)
        //optionalTopFix = Sometimes it needs to be added to fix the top scrolling position in DOM(optional)
        var params = $.extend({
            // Default value
            paddingTop: 100,
            heightRefElement: '.main-content-end-padding',
            optionalBottomFix: 0,
            optionalTopFix: 0
        }, options );

        if($(this).length>0)
        {
            var $window = $(window);
            var $el = $(this);
            var elHeight = 0;
            var elOffset = $el.offset();
            var $refEl = $(params.heightRefElement);    
            var refElHeight = 0; 
            var $refElOffset = $refEl.offset();
            var currentScrollTop = 0;
            var stickyWidth = $el.parent().width() + 'px';

            // Initialize values
            initValues();

            $window.scroll(function() {
                processPositions();
            });
            $window.resize(function() {
                //TODO: Calculate values in resize little buggy for now with refreshin page fixes
            
                    // initValues();
                    // if ($window.scrollTop()>=params.paddingTop)
                    // {
                    //     $el.offset({"top":  $window.scrollTop() - params.paddingTop});
                    // }
                    // processPositions();
            });
        }

        function processPositions()
        {
            if(screen.width>=992)
            {
                var actualScrolltop = $window.scrollTop() + elHeight + refElHeight;
                if(actualScrolltop >= $refElOffset.top){
                    $el.css({"position": "relative"});
                    $el.offset({"top": currentScrollTop});
                }else
                {
                    if($window.scrollTop() < params.paddingTop)
                    {
                        $el.css({"position": "relative"});
                        $el.offset({"top": $el.offset().top + params.optionalTopFix});
                    }
                    else if ($window.scrollTop()>=params.paddingTop)
                    {
                        $el.css({"position": "fixed", "width": stickyWidth});
                        $el.offset({"top": ((elOffset.top + $window.scrollTop()) - params.paddingTop)});
                        currentScrollTop = $window.scrollTop() + params.optionalBottomFix;
                    }
                }
            }
            else
            {
                $el.css({"position": "relative", "width": '100%'});
                $el.offset({"top": $el.offset().top})
            }
        }

        function initValues()
        {
            elHeight = $el.height();
            refElHeight = $refEl.height();
            stickyWidth = $el.parent().width() + 'px';
        }

        return this;
    };
}( jQuery ));