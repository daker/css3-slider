$(function () {
    'use strict';

    var Modernizr = window.Modernizr,
        slider = $('#slider'),
        slideCount = $('.slide').length,
        slidewidth = 960,
        sliderwidth = slidewidth * slideCount,
        support = Modernizr.csstransitions && Modernizr.csstransforms,
        support3d = Modernizr.csstransforms3d,
        current = 0,
        paused = true,
        interval = null,
        transEndEventName = null,
        transformName = null;

    var transProperties = {
        'WebkitTransition': {
            transitionEndEvent: 'webkitTransitionEnd',
            tranformName: '-webkit-transform'
        },
        'MozTransition': {
            transitionEndEvent: 'transitionend',
            tranformName: '-moz-transform'
        },
        'OTransition': {
            transitionEndEvent: 'oTransitionEnd',
            tranformName: '-o-transform'
        },
        'msTransition': {
            transitionEndEvent: 'MSTransitionEnd',
            tranformName: '-ms-transform'
        },
        'transition': {
            transitionEndEvent: 'transitionend',
            tranformName: 'transform'
        }
    };

    if (support) {
        transEndEventName = transProperties[Modernizr.prefixed('transition')].transitionEndEvent + '.cbpFWSlider';
        transformName = transProperties[Modernizr.prefixed('transition')].tranformName;
    }

    slider.css('width', sliderwidth + 'px');
    if (support) {
        slider.css('transition', transformName + ' 500ms ease');
    }

    function updateSlider() {
        if (current > slideCount - 1) {
            current = 0;
        }
        if (current < 0) {
            current = slideCount - 1;
        }
        if (support) {
            var g = -1 * current * slidewidth;
            slider.stop().css("transform", support3d ? "translate3d(" + g + "px,0,0)" : "translate(" + g + "px)");
        } else {
            slider.stop().css('margin-left', -1 * current * 100 + '%');
        }

        $('a.dot[rel=' + current + ']').addClass('active')
            .siblings()
            .removeClass('active');
    }

    updateSlider();

    $('.dot').click(function (event) {
        current = parseInt($(this).attr('rel'));
        clearInterval(interval);
        paused = false;
        updateSlider();
    });

    $('.arrow-right').on('click', function (event) {
        current = current + 1;
        paused = true;
        updateSlider();
        return false;
    });

    $('.arrow-left').on('click', function (event) {
        current = current - 1;
        paused = true;
        updateSlider();
        return false;
    });

    if (paused) {
        clearInterval(interval);
        interval = setInterval(function () {
            $('.arrow-right').click();
        }, 8000);
        paused = false;
    }
});