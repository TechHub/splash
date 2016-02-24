(function($) {
  'use strict';

  $('.covervid-video').coverVid(1280, 720);

  $('#toggle').click(function() {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
  });

  function fullscreen() {
    var fullpage = $('.hero.is-fullheight');
    var windowH = $(window).height();
    var windowW = $(window).width();

    fullpage.width(windowW);
    fullpage.height(windowH);
  }

  fullscreen();
  $(window).resize(fullscreen);

  // same height membership columns
  var membershipColumns = document.querySelectorAll('.same-height .message-body');
  var membershipColumnsMaxHeight = 0;
  Array.prototype.forEach.call(membershipColumns, function(el) {
    membershipColumnsMaxHeight = Math.max(membershipColumnsMaxHeight, el.offsetHeight);
  });
  Array.prototype.forEach.call(membershipColumns, function(el) {
    el.style.minHeight = membershipColumnsMaxHeight + 'px';
  });

  $('.carousel.carousel-members').slick({
    slidesToShow: 3,
    mobileFirst: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: true,
        centerPadding: '40px',
        slidesToShow: 3
      }
    }, {
      breakpoint: 320,
      settings: {
        arrows: true,
        slidesToShow: 1
      }
    }]
  });
})(jQuery);
