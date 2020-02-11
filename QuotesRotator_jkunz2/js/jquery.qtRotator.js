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
            //console.log(`${this.mergedOptions.speed} \n${this.mergedOptions.easing} \n${this.mergedOptions.interval}`)

            this.$items = $(".quoteContent");
            this.itemsCount = this.$items.length;
            //console.log(`The length is ${this.itemsCount}`);

            //property used to determine which div.quoteContent is showing
            this.currentIndex = 0;

            $.QTRotator.support = Modernizr.csstransitions;

            if ($.QTRotator.support) {
                // The users browser supports CSS transition property
                this.$progressBar = $('<span class="quoteProgress"></span>').appendTo(this.$element);
            }
            else {
                //users browser does not support css transions property
                //MARK: do some alternative logic here
            }

            //show the current quote
            //reduce the jquery object down to just 1 in the node list.
            this.$items.eq(this.currentIndex).addClass('quoteCurrent');

            if ($.QTRotator.support) {
                this._setTransition();
            }

            //start rotating the quotes
            this._startRotator();
        },

        _setTransition: function () {
            // Use setTimeout() method to create a very short delay before we set a transition property
            // on our div.quoteContent element.

            /*
            in a .css file a css transition looks like the following
            .quoteContent {
                color: green;
                opacity: 0;
                transition: opacity 2s [easing], attribute durationg [easing];

                transition: opacity 1s ease-in-out, color 2s;
            }
            */

            setTimeout($.proxy(function () {
                this.$items.css('transition', `opacity ${this.mergedOptions.speed}ms  ${this.mergedOptions.easing}`);
            }, this), 25);
        },

        _startRotator: function () {

            //animate the progress bar
            if ($.QTRotator.support) {
                this._startProgressBar();
            }

            //rotate the quote
            setTimeout($.proxy(function () {

                //reset the progress bar
                if ($.QTRotator.support) {
                    this._resetProgressBar();
                }

                //bring in the next quote
                this._nextQuote();

                //reset timer recursively
                this._startRotator();

            }, this), this.mergedOptions.interval + 25);
        },

        _startProgressBar: function () {

            setTimeout($.proxy(function () {
                this.$progressBar.css({
                    transition: `width ${this.mergedOptions.interval}ms linear`,
                    width: '100%'
                });
            }, this), 25);

        },

        _resetProgressBar: function () {

            this.$progressBar.css({
                transition: `none`,
                width: '0%'
            });
        },

        _nextQuote: function () {

            //Hide the current quote
            this.$items.eq(this.currentIndex).removeClass('quoteCurrent');


            //get the index of the next quote 
            this.currentIndex = (this.currentIndex < this.itemsCount - 1) ? this.currentIndex + 1 : 0;

            //show the next quote
            this.$items.eq(this.currentIndex).addClass('quoteCurrent');

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
