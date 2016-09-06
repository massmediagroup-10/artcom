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

  function slickInit() {
    if ($('.slider').length) {
      $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true
      });
    }
    if ($('.slider-for').length) {
      $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-nav'
      });
      $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        centerMode: true,
        centerPadding: '0px',
        focusOnSelect: true
      });
    }
    var servicesSlider = $('.services-slider');
    if (servicesSlider.length) {
      servicesSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        adaptiveHeight: true
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

  $(document).ready(function () {
    slickInit();
    footerplaceholder();
    navbarHeight();
    scrollUp('.footer-up');
    navigation('.navbar-main a');
    $('select').selectize({
      create: true,
      sortField: 'text'
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
  });

  $(window).load(function () {
    isotopFilter();
  });

  $(window).resize(function () {
    footerplaceholder();
    navbarHeight();
  });

  $(window).scroll(function () {
    scrollHandler();
    navbarHeight();
  });
