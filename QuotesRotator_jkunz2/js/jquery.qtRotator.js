; (function ($, window, undefined) {

    'use strict'; //requires the var keyword for variables and other more strict syntax.
    var Modernizr = window.Modernizr;

    //Ctor
    $.QTRotator = function (options, divQuoteRotator) {
        //save the passed in DOM element into a property of our 
        //plugin object 
        //and make sure this property is a JQuery object
        this.$element = $(divQuoteRotator);

        //get the party started by calling an initial method
        //of this plugin class
        this._init(options);
    };

    //Defaults Property
    $.QTRotator.defaults = {
        speed: 700,
        easing: 'ease',
        interval: 8000
    };


    //Define property of our plugin object

    //inefficient since the prototype property is not used to define the object's methods
    // $.QTRotator._init = function (options) {

    // }

    $.QTRotator.prototype = {

        _init: function (options) {
            this.mergedOptions = $.extend($.QTRotator.defaults, options);
            console.log(`${this.mergedOptions.speed} \n${this.mergedOptions.easing} \n${this.mergedOptions.interval}`)
        }
    };


    //Define methods of our plugin object

    //Define our new jquery method definition (qtRotator)
    $.fn.qtRotator = function (options) {

        if (typeof options === 'string') {

            // not as common, leave off code for now...

        }
        else {  // options !== 'string', usually meaning it is an object

            // here, this refers the jQuery object that was used
            // to call this plugin method ($('#quoteRotator'))
            this.each(function () {

                //Here, this refers to div.quoteRotator because
                //n a JQuery each() method's function parameter,
                //the this keyword refers to the current
                //matched DOM element that is currewntly
                //iterating (looping) over
                var instance = $.data(this, 'qtRotator');

                if (instance) {
                    instance._init();
                }
                else {
                    //call from low-level (utility) JQuery data() method again
                    //this time in setter mode (3 paramaters) to create a named 
                    //data store named 'qtrotator' in the DOM on the div.quoteRotator tag.

                    instance = $.data(this, 'qtRotator', new $.QTRotator(options, this));

                }

            });

        }

        return this; // make this method chainable because it returns it's JQuery object.

    };

})(jQuery, window);
