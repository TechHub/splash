(function($) {
  'use strict';

  // Full screen video as background cover
  $('.covervid-video').coverVid(1280, 720);

  // Responsive menu toggle
  $('#toggle').click(function() {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
  });

  // correct fullscreen
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

  // carousel
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

  // Mailchimp subscribe
  function isValidEmail($form) {
    var email = $form.find('input[type="email"]').val();
    if (!email || !email.length) {
      return false;
    } else if (email.indexOf('@') === -1) {
      return false;
    }
    return true;
  }

  function ajaxMailChimpForm($form, $resultElement) {
    $form
      .submit(function(e) {
        e.preventDefault();
        if (!isValidEmail($form)) {
          var error = 'A valid email address must be provided.';
          $resultElement.html(error);
          $resultElement.css('color', 'red');
        } else {
          $resultElement.css('color', 'black');
          $resultElement.html('Subscribing...');
          submitSubscribeForm($form, $resultElement);
        }
      });
  }

  function submitSubscribeForm($form) {
    $('#mce-subscribe-button').addClass('is-loading');
    $.ajax({
      type: 'GET',
      url: $form.attr('action'),
      data: $form.serialize(),
      cache: false,
      dataType: 'jsonp',
      jsonp: 'c', // trigger MailChimp to return a JSONP response
      contentType: 'application/json; charset=utf-8',
      success: function(data) {
        $('#mce-subscribe-button').removeClass('is-loading');
        $('.mce-responses').removeClass('is-hidden');
        if (data.result === 'error') {
          $('#mce-error-response').removeClass('is-hidden').html(data.msg);
        } else {
          $('#mce-success-response').removeClass('is-hidden').html(data.msg);
        }
      }
    });
  }

  ajaxMailChimpForm($('#mce-form'), $('#mce-success-response'));



})(jQuery);
