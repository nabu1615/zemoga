
function hello() {

    var menu = document.getElementsByClassName("nav-bar-toggle"),
    subDrop = document.getElementsByClassName("drop-down-toogle"),
    subNav = document.getElementsByClassName("nav-bar-subnav"),
    nav = document.getElementsByClassName("nav-bar-list"),
    header = document.getElementsByClassName("header"),
    menuHeight = "-" + nav.clientHeight + "px";

    window.addEventListener('resize', hideNavResize);

    function hideNavResize() {
        var w = window.innerWidth;
        if(w > 768 ) {
            nav[0].removeAttribute('style');
        }
    }

    function showNav(item) {
        if (item.style.display !== "inline-block") {
            item.style.display = "inline-block";
        }
        else {
            item.style.display = "";
        }
    };

    menu[0].addEventListener('click', function() {showNav(nav[0]); } );
    subDrop[0].addEventListener('click', function(e) {
        e.preventDefault();
        showNav(subNav[0]);
    });

};
hello();


document.addEventListener('DOMContentLoaded', function() {
    var settings = {
            "selectors": {
                "slideVisible": "slide-visible",
                "next": "next"
            },
            "classes": {
                "slides": document.getElementsByClassName("slide-item"),
                "slideVisible": document.getElementsByClassName("slide-visible"),
                "next": document.getElementsByClassName("next"),
                "slideButton": document.getElementsByClassName("slide-button")
            }
        },
        slideLength = settings.classes.slides.length;

    function initialize() {
        for (var i = 0; i < settings.classes.slideButton.length; i++) {
            settings.classes.slideButton[i].addEventListener('click', handleControlClick );
        }
    }

    function handleControlClick(e) {
        var activeIndex = getIndex(),
            nextActiveIndex = getNextIndex(this, activeIndex);
        setNextActiveSlide(nextActiveIndex);
    }

    function getIndex() {
        var index = 0;
        for (var i = 0; i < settings.classes.slides.length; i++) {
            if (settings.classes.slides[i].classList.contains(settings.selectors.slideVisible)) {
                index = i;
                i = settings.classes.slides.length;
            }
        }
        return index;
    }


    function getNextIndex(e, activeIndex) {
        var isNext = e.classList.contains(settings.selectors.next);
        if (isNext) {
            return (activeIndex + 1 > slideLength - 1) ? 0 : activeIndex + 1;
        } else {
            return (activeIndex === 0) ? slideLength - 1 : activeIndex - 1;
        }
    }


    function setNextActiveSlide(nextActiveIndex) {
        var activeClass = settings.classes.slideVisible,
            currentClass = activeClass[0],
            slideId = document.getElementById('s-' + nextActiveIndex);
        currentClass.classList.remove(settings.selectors.slideVisible);
        fadeIn(slideId);
        slideId.classList.add(settings.selectors.slideVisible);
    }

    function fadeIn(el) {
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



    initialize();
});


