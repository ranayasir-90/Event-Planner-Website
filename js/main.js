(function () {
    'use strict';
    // Preloader — fast hide for deploy/production
    var hidePreloader = function () {
        $('#preloader, .preloader-bg').stop(true).fadeOut(200);
    };
    $(function () {
        setTimeout(hidePreloader, 80);
    });
    $(window).on('load', hidePreloader);
    setTimeout(hidePreloader, 1500); 
    // Animations
    var animateElement = function ($el) {
        if (!$el.length || $el.hasClass('animated')) {
            return;
        }
        var effect = $el.data('animate-effect');
        if (effect === 'fadeIn') {
            $el.addClass('fadeIn animated');
        } else if (effect === 'fadeInLeft') {
            $el.addClass('fadeInLeft animated');
        } else if (effect === 'fadeInRight') {
            $el.addClass('fadeInRight animated');
        } else {
            $el.addClass('fadeInUp animated');
        }
    };
    var revealVisibleAnimations = function () {
        var viewBottom = $(window).scrollTop() + $(window).height() * 0.92;
        $('.animate-box:not(.animated)').not('#pwe-footer2 .animate-box').each(function () {
            var $el = $(this);
            if ($el.offset().top < viewBottom) {
                animateElement($el);
            }
        });
    };
    var contentWayPoint = function () {
        $('.animate-box').not('#pwe-footer2 .animate-box').waypoint(function (direction) {
            if (direction === 'down') {
                animateElement($(this.element));
            }
        }, {
            offset: '85%'
        });
        revealVisibleAnimations();
        $(window).on('load', revealVisibleAnimations);
    };
    // Burger Menu 
    var burgerMenu = function () {
        $('.js-pwe-nav-toggle').on('click', function (event) {
            event.preventDefault();
            var $this = $(this);
            if ($('body').hasClass('offcanvason')) {
                $this.removeClass('active');
                $('body').removeClass('offcanvason');
            }
            else {
                $this.addClass('active');
                $('body').addClass('offcanvason');
            }
        });
    };
    // Click outside of offcanvasons
    var mobileMenuOutsideClick = function () {
        $(document).click(function (e) {
            var container = $("#pwe-aside, .js-pwe-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('offcanvason')) {
                    $('body').removeClass('offcanvason');
                    $('.js-pwe-nav-toggle').removeClass('active');
                }
            }
        });
        $(window).scroll(function () {
            if ($('body').hasClass('offcanvason')) {
                $('body').removeClass('offcanvason');
                $('.js-pwe-nav-toggle').removeClass('active');
            }
        });
    };
    // Slider (hero only if flexslider present)
    var sliderMain = function () {
        if ($('#pwe-hero .flexslider').length) {
            $('#pwe-hero .flexslider').flexslider({
                animation: "fade"
                , slideshowSpeed: 5000
                , directionNav: true
                , start: function () {
                    setTimeout(function () {
                        $('.slider-text').removeClass('animated fadeInUp');
                        $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                    }, 500);
                }
                , before: function () {
                    setTimeout(function () {
                        $('.slider-text').removeClass('animated fadeInUp');
                        $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                    }, 500);
                }
            });
        }
    };
    // Pricing page category scroll
    var pricingCategoryNav = function () {
        var $nav = $('.pricing-category-nav');
        if (!$nav.length) {
            return;
        }
        var scrollToTarget = function ($target) {
            if (!$target.length) {
                return;
            }
            var offset = $nav.outerHeight() + 25;
            $('html, body').animate({
                scrollTop: $target.offset().top - offset
            }, 600, 'easeInOutExpo');
        };
        $nav.find('a').on('click', function (e) {
            e.preventDefault();
            var $link = $(this);
            var $target = $($link.attr('href'));
            scrollToTarget($target);
            $nav.find('a').removeClass('active');
            $link.addClass('active');
            if (history.pushState) {
                history.pushState(null, null, $link.attr('href'));
            }
        });
        if (window.location.hash) {
            var $hashTarget = $(window.location.hash);
            setTimeout(function () {
                scrollToTarget($hashTarget);
                $nav.find('a[href="' + window.location.hash + '"]').addClass('active');
            }, 400);
        }
    };
    // Image hints — no lazy load on carousels (causes reload flicker on scroll)
    var optimizeImages = function () {
        $('img').each(function () {
            var $img = $(this);
            if (!this.getAttribute('decoding')) {
                this.setAttribute('decoding', 'async');
            }
            if ($img.closest('.owl-carousel, .team .item, .services .item, #pwe-logo, .banner-img, #pwe-hero').length) {
                this.removeAttribute('loading');
                return;
            }
            if ($img.closest('#pwe-footer2, .portfolio, .gallery-img').length) {
                if (!this.getAttribute('loading')) {
                    this.setAttribute('loading', 'lazy');
                }
            }
        });
        $('iframe').each(function () {
            if (!this.getAttribute('loading')) {
                this.setAttribute('loading', 'lazy');
            }
        });
    };
    // Document on load.
    $(function () {
        optimizeImages();
        contentWayPoint();
        burgerMenu();
        mobileMenuOutsideClick();
        sliderMain();
        pricingCategoryNav();

        $(".bg-img, section").each(function () {
            if ($(this).attr("data-background")) {
                $(this).css("background-image", "url(" + $(this).data("background") + ")");
            }
        });

        if ($('.services .owl-carousel').length && $.fn.owlCarousel) {
            $('.services .owl-carousel').owlCarousel({
                loop: true
                , margin: 30
                , mouseDrag: true
                , autoplay: false
                , dots: true
                , responsiveClass: true
                , responsive: {
                    0: { items: 1 }
                    , 600: { items: 2 }
                    , 1000: { items: 3 }
                }
            });
        }
        if ($('.team .owl-carousel').length && $.fn.owlCarousel) {
            $('.team .owl-carousel').owlCarousel({
                loop: true
                , margin: 30
                , dots: true
                , mouseDrag: true
                , autoplay: false
                , responsiveClass: true
                , responsive: {
                    0: { items: 1 }
                    , 600: { items: 2 }
                    , 1000: { items: 3 }
                }
            });
        }
        if ($('.price .owl-carousel').length && $.fn.owlCarousel) {
            $('.price .owl-carousel').owlCarousel({
                loop: true
                , margin: 30
                , dots: true
                , mouseDrag: true
                , autoplay: false
                , responsiveClass: true
                , responsive: {
                    0: { items: 1 }
                    , 600: { items: 2 }
                    , 1000: { items: 3 }
                }
            });
        }
        if ($('.testimonials .owl-carousel').length && $.fn.owlCarousel) {
            $('.testimonials .owl-carousel').owlCarousel({
                loop: true
                , margin: 30
                , mouseDrag: true
                , autoplay: false
                , dots: false
                , nav: true
                , navText: ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"]
                , responsiveClass: true
                , responsive: {
                    0: { items: 1 }
                    , 600: { items: 1 }
                    , 1000: { items: 1 }
                }
            });
        }
        if ($('.img-zoom').length && $.fn.magnificPopup) {
            $(".img-zoom").magnificPopup({
                type: "image"
                , closeOnContentClick: !0
                , mainClass: "mfp-fade"
                , gallery: {
                    enabled: !0
                    , navigateByImgClick: !0
                    , preload: [0, 1]
                }
            });
            $('.magnific-youtube, .magnific-vimeo, .magnific-custom').magnificPopup({
                disableOn: 700
                , type: 'iframe'
                , mainClass: 'mfp-fade'
                , removalDelay: 300
                , preloader: false
                , fixedContentPos: false
            });
        }
    });
    // Contact Form
    var form = $('.contact__form'),
        message = $('.contact__msg'),
        form_data;
    // success function
    function done_func(response) {
        message.fadeIn().removeClass('alert-danger').addClass('alert-success');
        message.text(response);
        setTimeout(function () {
            message.fadeOut();
        }, 2000);
        form.find('input:not([type="submit"]), textarea').val('');
    }
    // fail function
    function fail_func(data) {
        message.fadeIn().removeClass('alert-success').addClass('alert-success');
        message.text(data.responseText);
        setTimeout(function () {
            message.fadeOut();
        }, 2000);
    }
    form.submit(function (e) {
        e.preventDefault();
        form_data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: form_data
        })
        .done(done_func)
        .fail(fail_func);
    });
}());
    