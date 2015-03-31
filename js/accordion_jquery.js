$(document).ready(function(){
    
    /*
     *Allgemeine Accordion einstellungen
     */
    $('#profilContent').accordion({
        icons: { "header": "ion-chevron-down", "activeHeader": "ion-chevron-up" },
        collapsible: true,
        heightStyle: "content",
        active: false
    });
    
    /*
     *Scrolle zum jeweils geöffneten Accordion-Teil
     */
    $('h3').on('click',function(){
        $('body').scrollTo(this);
    });
    
    /*
     *ScrollTo-Funktion, um auch ohne Anchor zu einem beliebigen Element der FAQ-Seite
     *scrollen zu können
     */
    $.fn.scrollTo = function( target, options, callback ){
        if(typeof options == 'function' && arguments.length == 2){ 
            callback = options; 
            options = target; 
        }
        
        var settings = $.extend({
            scrollTarget  : target,
            offsetTop     : 50,
            duration      : 500,
            easing        : 'swing'
        }, options);
        
        return this.each(function(){
            var scrollPane = $(this);
            var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
            var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
            scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
                if (typeof callback == 'function') { 
                    callback.call(this); 
                }
            });
        });
    }
});