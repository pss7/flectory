$(function () {

  $(window).load(function () {
    $('#headerWrap').addClass('active');
  });

  //헤더 
  $('#headerWrap nav .depth01 > li').mouseover(function () {
    $('#headerWrap').addClass('on');
  });
  $('#headerWrap').mouseleave(function () {
    $('#headerWrap').removeClass('on');
  });
  $('#headerWrap .sitemapBtn').click(function () {
    $('.sitemapWrap').addClass('active');
  });
  $('#headerWrap .sitemapCloseBtn').click(function () {
    $('.sitemapWrap').removeClass('active');
  });

  //모바일 메뉴
  $('.mobileMenuBtn').click(function () {
    $(".mobileMenuWrap").animate({
      right: 0
    }, 500)
  });
  $('.mobileMenuWrap .mobileMenuDepth01 li h2 a').click(function () {
    if ($(this).parents('li').find('.mobileMenuDepth02').length) {
      if ($(this).parent('h2').hasClass('active')) {
        $(this).parents('li').find('.mobileMenuDepth02').slideUp();
        $(this).parent('h2').removeClass('active');
      } else {
        $('.mobileMenuWrap .mobileMenuDepth01 li').find('.mobileMenuDepth02').slideUp();
        $(this).parents('li').find('.mobileMenuDepth02').slideDown();
        $('.mobileMenuWrap .mobileMenuDepth01 li h2').removeClass('active');
        $(this).parent('h2').addClass('active');
      }
      return false;
    }
  });
  $('.mobileMenuWrap .mobileMenuCloseBtn').click(function () {
    $('.mobileMenuWrap').animate({
      right: -3000
    }, 500);
  });
  $('.mobileMenuWrap .mobileMenuDepth01 li:has(ul)').children('h2').addClass('depht02');

  $('#headerWrap .languageBox > a').click(function () {
    if ($(this).hasClass('active')) {
      $(this).next().fadeOut();
      $(this).removeClass('active');
    } else {
      $(this).next().fadeIn();
      $(this).addClass('active');
    }
  });

  $('.textPopup .closeBtn').click(function () {
    $('.textPopup').fadeOut();
  });

});