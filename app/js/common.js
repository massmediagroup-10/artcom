  'use strict';
  function scrollUp(block, targetBlock) {
    $(block).click(function (event) {
      event.preventDefault();
      var target = (typeof targetBlock !== 'undefined') ? $(targetBlock).offset().top : $('.header').offset().top;
      $('body, html').animate({scrollTop: target}, 800);
      return false;
    });
  }

  function navigation(block) {
    $(block).click(function(event){
      var href = $($(this).attr('href'));
      var target = href.offset().top;
      $('body, html').animate({scrollTop:target},800);
      return false;
    });
  }

  function slickModalInit() {
    if ($('.slider-for').length) {
      $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-nav',
        nextArrow: '<i class="fa fa-chevron-right slick-arrow-next"></i>',
        prevArrow: '<i class="fa fa-chevron-left slick-arrow-prev"></i>'
      });
      $('.slider-nav').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        nextArrow: '<i class="fa fa-chevron-right slick-arrow-next"></i>',
        prevArrow: '<i class="fa fa-chevron-left slick-arrow-prev"></i>',
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      });
    }
  }

  function slickInit() {
    if ($('.slider').length) {
      $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true
      });
    }
    var servicesSlider = $('.services-slider');
    if (servicesSlider.length) {
      servicesSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        adaptiveHeight: true,
        nextArrow: '<i class="fa fa-chevron-right slick-arrow-next"></i>',
        prevArrow: '<i class="fa fa-chevron-left slick-arrow-prev"></i>',
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false
            }
          }
        ]
      });

      $('.services-nav .services-item').click(function(e){
        e.preventDefault();
        $('.services-nav .services-item').removeClass('active');
        $(this).addClass('active');
        var slideIndex = $(this).index();
        servicesSlider[0].slick.slickGoTo( parseInt(slideIndex) );
      });
    }
  }

  function expandTool() {
    $('.expand-subject').slideUp(0);
    $('.expand-tool').click(function (e) {
      $(this).siblings('.expand-subject').stop().slideToggle();
      $(this).parent().toggleClass('active');
      e.preventDefault();
    });
  }

  function footerplaceholder() {
    $('.footer_placeholder')
      .height($('.footer')
        .outerHeight());
  }

  function tabs(block) {
    if (typeof(block) === 'undefined') {
      block = $('.tabs');
    }
    block.each(function () {
      var $wrap = $(this);
      if (!$wrap.is('.tabs-done')) {
        $wrap.addClass('tabs-done');
        $('[data-tabId]', $wrap).click(function (event) {
          event.preventDefault();
          //coneole.log(3);
          var tabid = $(this).data('tabid');
          $('[data-tabId]', $wrap).removeClass('active');
          $('[data-tabId="' + tabid + '"]', $wrap).addClass('active');
          $('[data-tab]', $wrap).removeClass('active').addClass('hidden');
          $('[data-tab="' + tabid + '"]', $wrap).addClass('active').removeClass('hidden');
        });
        if ($('.active[data-tabId]', $wrap).length > 0) {
          $('.active[data-tabId]', $wrap).click();
        }
        else {
          $('[data-tabId]:eq(0)', $wrap).click();
        }
      }
    });
  }

  function scrollHandler() {
    var ofcontent = $('.header-line').offset();
    var srollTop = $(document).scrollTop();
    if ((srollTop) > ofcontent.top) {
      $('.navbar ').addClass('fixed');
    } else {
      $('.navbar ').removeClass('fixed');
    }
  }

  function navbarHeight() {
    var collapseHeight = $(window).height() - $('.navbar-main').height();
    $('.navbar-collapse').css({'max-height': collapseHeight});
  }

  function isotopFilter() {
    var list = $('.portfolio-list');
    var listLink = $('.portfolio-nav a');

    list.isotope({
      filter: '*',
      resizable: true,
      masonry: {
        itemSelector: '.portfolio-item',
        percentPosition: true
      }
    });

    listLink.click(function (e) {
      e.preventDefault();
      var selector = $(this).data('filter');
      listLink.closest('li').removeClass('active');
      $(this).closest('li').addClass('active');
      list.isotope({
        filter: selector
      });
    });

    $(window).resize(function () {
      list.isotope({
        filter: '*',
        resizable: true,
        masonry: {
          itemSelector: '.portfolio-item',
          percentPosition: true
        }
      });
    });
  }

  function initMap() {
    var myLatLng = {lat: 56.9214493, lng: 24.0123207};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: myLatLng,
      scrollwheel: false,
      styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Plienciema 16, Mārupe, Latvija. LV-2167',
      icon: 'img/baloon.png'
    });
  }

  function fileinputInit() {
    $("#upload").fileinput({
      uploadUrl: '/file-upload-batch/2',
      maxFilePreviewSize: 25600,
      dropZoneTitle: 'Перетащите файлы сюда ваши файлы,\
      что бы загрузить их на сайт\
      (файл не должен превышать 25 Мб)',
      showCaption: false
    });
  }

  $(document).ready(function () {
    slickInit();
    slickModalInit();
    footerplaceholder();
    navbarHeight();
    //fileinputInit();
    scrollUp('.footer-up');
    navigation('.navbar-main a');
    $('select').selectize({
      create: true,
      sortField: 'text'
    });

    $('.modal').on('shown.bs.modal', function (e) {
      $(window).trigger('resize');
    });

    if ($('.advantages').length) {
      var waypoint = new Waypoint({
        element: document.getElementById('advantages'),
        handler: function () {
          $('.timer').countTo({
            speed: 1500,
            refreshInterval: 5,
          });
          waypoint.destroy();
        },
        offset: '60%'
      });
    }

    //and start googlemaps
    initMap();
  });

  $(window).on('load', function() {
    isotopFilter();
  });

  $(window).on('resize', function() {
    footerplaceholder();
    navbarHeight();
  });

  $(window).on('scroll', function() {
    scrollHandler();
    navbarHeight();
  });
