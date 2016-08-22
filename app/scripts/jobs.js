(function($) {
  'use strict';

  // Responsive menu toggle
  $('#toggle').click(function() {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
  });

  // Social media links
  $('.modal-social-open').click(function(e) {
    e.preventDefault();
    $('#modal-social').addClass('is-active');
  });
  $('#modal-social-close').click(function() {
    $('#modal-social').removeClass('is-active');
  });

  // Locations for mobile
  $('#modal-locations-open').click(function(e) {
    e.preventDefault();
    $('#modal-locations').addClass('is-active');
  });
  $('#modal-locations-close').click(function() {
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
    var dataToSend = $form.serialize() + '&' + location + '=1';
    $.ajax({
      type: 'GET',
      url: $form.attr('action'),
      data: dataToSend,
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
