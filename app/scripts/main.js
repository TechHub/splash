(function($) {
  'use strict';

  // Full screen video as background cover
  $('.covervid-video').coverVid(1280, 720);

  // smooth scroll
  $('#join-the-community').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 250
        }, 1000);
        return false;
      }
    }
  });

  // Responsive menu toggle
  $('#toggle').click(function() {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
  });

  // Social media links
  $('.modal-social-open').click(function(e){
    e.preventDefault();
    $('#modal-social').addClass('is-active');
  });
  $('#modal-social-close').click(function(){
    $('#modal-social').removeClass('is-active');
  });

  // Locations for mobile
  $('#modal-locations-open').click(function(e){
    e.preventDefault();
    $('#modal-locations').addClass('is-active');
  });
  $('#modal-locations-close').click(function(){
    $('#modal-locations').removeClass('is-active');
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
    var location = $('#select-location-newsletter').val().toUpperCase();
    var data = $form.serialize()+ '&' + location + '=1';
    $.ajax({
      type: 'GET',
      url: $form.attr('action'),
      data: data,
      cache: false,
      dataType: 'jsonp',
      jsonp: 'c', // trigger MailChimp to return a JSONP response
      contentType: 'application/json; charset=utf-8',
      success: function(data) {
        console.log(data);
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
