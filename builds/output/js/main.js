var app = app || {}; // set namespace

app.lib = (function () { // set lib for reusable functions
    var lib = {};

    /**
        * fadeIn function to show an element(el) with a opacity transition
        * @param {HTMLElement} el
    */

    lib.fadeIn = function(el) {
      el.style.opacity = 0;

      var last = +new Date(),
        tick = function() {
            el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
            last = +new Date();

            if (+el.style.opacity < 1) {
              (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
      };

      tick();
    }

    /**
        * toggleVisibility function to show or hide an element(item)
        * @param {HTMLElement} item
    */

    lib.toggleVisibility = function(item) {
        if (item.style.display !== "inline-block") {
            item.style.display = "inline-block";
        }
        else {
            item.style.display = "";
        }
    };

    return lib;
})();

app.slide = (function () { // set slide like an app attribute
        var settings; // create settings variable

        // handleControlClick function to control the next slide behavior

        function handleControlClick() {
            var activeIndex = getIndex(),
                nextActiveIndex = getNextIndex(this, activeIndex);
            setNextActiveSlide(nextActiveIndex);
        }

        // * getIndex function to get the index position when the user click on the next or prev button

        function getIndex() {
            var index = 0;
            for (var i = 0; i < settings.nodelist.slides.length; i++) {
                if (settings.nodelist.slides[i].classList.contains(settings.classes.slideVisible)) {
                    index = i;
                    i = settings.nodelist.slides.length;
                }
            }
            return index;
        }

        /**
            * getNextIndex function to get the right activeIndex when the user click on the next or prev button
            * @param {HTMLElement} e
            * @param {number} activeIndex
            * @returns activeIndex
        */


        function getNextIndex(e, activeIndex) {
            var isNext = e.classList.contains(settings.classes.next);
            if (isNext) {
                return (activeIndex + 1 > slideLength - 1) ? 0 : activeIndex + 1;
            } else {
                return (activeIndex === 0) ? slideLength - 1 : activeIndex - 1;
            }
        }


        /**
            * setNextActiveSlide function to add or remove the slideVisible css class
            * @param {number} nextActiveIndex
        */


        function setNextActiveSlide(nextActiveIndex) {
            var activeClass = settings.nodelist.slideVisible,
                currentClass = activeClass[0],
                slideId = document.getElementById('s-' + nextActiveIndex);
            currentClass.classList.remove(settings.classes.slideVisible);
            app.lib.fadeIn(slideId);
            slideId.classList.add(settings.classes.slideVisible);
        }

        // initialize function to define settings and "initialize" the slide module

        function initialize() {
            settings = {
                "classes": {
                    "slideVisible": "slide-visible",
                    "next": "next"
                },
                "nodelist": {
                    "slides": document.getElementsByClassName("slide-item"),
                    "slideVisible": document.getElementsByClassName("slide-visible"),
                    "next": document.getElementsByClassName("next"),
                    "slideButton": document.getElementsByClassName("slide-button")
                }
            }
            slideLength = settings.nodelist.slides.length;

            for (var i = 0; i < settings.nodelist.slideButton.length; i++) {
                settings.nodelist.slideButton[i].addEventListener('click', handleControlClick );
            }
        }

        return {
            initialize: initialize
        };
})();

app.nav = (function () { // set nav like an app attribute

        var settings; // create settings variable

        // hideNavResize function to remove inline styles for the nav when resize event is launched

        function hideNavResize() {
            var w = window.innerWidth;
            if(w > 768 ) {
                settings.nodelist.nav[0].removeAttribute('style');
            }
        }

        // initialize function to define settings and "initialize" the nav module

        function initialize() {
            settings = {
                    "nodelist": {
                        "menu": document.getElementsByClassName("nav-bar-toggle"),
                        "subDrop": document.getElementsByClassName("drop-down-toogle"),
                        "subNav": document.getElementsByClassName("nav-bar-subnav"),
                        "nav": document.getElementsByClassName("nav-bar-list"),
                        "header": document.getElementsByClassName("header"),
                    }
            };

            window.addEventListener('resize', hideNavResize);
            settings.nodelist.menu[0].addEventListener('click', function() {app.lib.toggleVisibility(settings.nodelist.nav[0]);} );
            settings.nodelist.subDrop[0].addEventListener('click', function(e) {
                e.preventDefault();
                app.lib.toggleVisibility(settings.nodelist.subNav[0]);
            });
        }

        return {
            initialize: initialize
        };
})();

document.addEventListener('DOMContentLoaded', function() {
    app.nav.initialize();
    app.slide.initialize();
});