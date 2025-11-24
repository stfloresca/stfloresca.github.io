/* =============================================
   Steven Floresca - Personal Portfolio
   Custom JavaScript
   ============================================= */

(function($) {
    "use strict";

    // Navbar scroll effect
    $(window).on('scroll load', function() {
        if ($(".navbar").offset().top > 60) {
            $(".fixed-top").addClass("top-nav-collapse");
        } else {
            $(".fixed-top").removeClass("top-nav-collapse");
        }
    });

    // Smooth scrolling for page navigation
    $(function() {
        $(document).on('click', 'a.page-scroll', function(event) {
            var $anchor = $(this);
            var target = $($anchor.attr('href'));
            if (target.length) {
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 70
                }, 600, 'easeInOutExpo');
                event.preventDefault();
            }
        });
    });

    // Hamburger menu toggle
    $('[data-toggle="offcanvas"]').on('click', function() {
        $('.offcanvas-collapse').toggleClass('open');
        $(this).toggleClass('active');
    });

    // Close mobile menu when clicking a nav link
    $('.navbar-nav li a:not(.dropdown-toggle)').on('click', function() {
        $('.offcanvas-collapse').removeClass('open');
        $('.hamburger-menu').removeClass('active');
    });

    // Dropdown hover for desktop
    function toggleDropdown(e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function() {
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }

    $('body')
        .on('mouseenter mouseleave', '.dropdown', toggleDropdown)
        .on('click', '.dropdown-menu a', toggleDropdown);

    // Form field animations
    $("input, textarea").on('keyup blur', function() {
        if ($(this).val() !== '') {
            $(this).addClass('notEmpty');
        } else {
            $(this).removeClass('notEmpty');
        }
    });

    // Back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });

    // Remove focus on buttons after click
    $(".button, a, button").mouseup(function() {
        $(this).blur();
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.offcanvas-collapse').removeClass('open');
            $('.hamburger-menu').removeClass('active');
        }
    });

    // Add active class to nav items on scroll
    $(window).on('scroll', function() {
        var scrollPos = $(document).scrollTop() + 100;

        $('.navbar-nav a.page-scroll').each(function() {
            var href = $(this).attr('href');
            if (href.charAt(0) === '#') {
                var target = $(href);
                if (target.length) {
                    if (target.offset().top <= scrollPos && target.offset().top + target.outerHeight() > scrollPos) {
                        $('.navbar-nav a.page-scroll').removeClass('active');
                        $(this).addClass('active');
                    }
                }
            }
        });
    });

    // Intersection Observer for scroll animations
    if ('IntersectionObserver' in window) {
        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                    animateOnScroll.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements that should animate
        document.querySelectorAll('.cert-card, .company-card, .testimonial-card, .profile-link-item, .writeup-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            animateOnScroll.observe(el);
        });
    }

    // Music Toggle Functionality
    var musicPlayer = null;
    var isMuted = false;

    // Initialize YouTube IFrame API
    function initMusicPlayer() {
        // Create YouTube iframe player (hidden)
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Called by YouTube API when ready
    window.onYouTubeIframeAPIReady = function() {
        musicPlayer = new YT.Player('ytMusicPlayer', {
            height: '0',
            width: '0',
            videoId: '8Ktn2weSyf4',
            playerVars: {
                'autoplay': 1,
                'loop': 1,
                'playlist': '8Ktn2weSyf4',
                'controls': 0,
                'showinfo': 0,
                'modestbranding': 1,
                'playsinline': 1
            },
            events: {
                'onReady': onPlayerReady
            }
        });
    };

    function onPlayerReady(event) {
        event.target.setVolume(30);
        event.target.playVideo();
    }

    // Music toggle button click handler
    $('#musicToggle').on('click', function() {
        if (musicPlayer && musicPlayer.getPlayerState) {
            if (isMuted) {
                musicPlayer.unMute();
                musicPlayer.playVideo();
                $('#musicIcon').removeClass('fa-volume-mute').addClass('fa-volume-up');
                isMuted = false;
            } else {
                musicPlayer.mute();
                $('#musicIcon').removeClass('fa-volume-up').addClass('fa-volume-mute');
                isMuted = true;
            }
        }
    });

    // Initialize music player on page load
    initMusicPlayer();

})(jQuery);
