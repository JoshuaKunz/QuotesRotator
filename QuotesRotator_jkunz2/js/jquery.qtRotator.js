; (function ($, window, undefined) {
    //Ctor

    //Default Property

    //Define property of our plugin object

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

                var instance = $.data(this, 'qtRotator');

                if (instance) {
                    instance._init();
                }
                else {



                }

            });

        }
    };



})(jQuery, window);
