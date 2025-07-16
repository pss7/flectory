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

  //언어
  $('#headerWrap .languageBox > a').click(function () {
    if ($(this).hasClass('active')) {
      $(this).next().fadeOut();
      $(this).removeClass('active');
    } else {
      $(this).next().fadeIn();
      $(this).addClass('active');
    }
  });

});

//팝업
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
  const cname = name + "=";
  const ca = document.cookie.split(';');
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(cname) === 0) return c.substring(cname.length);
  }
  return "";
}

$(function () {
  $('.popup').each(function () {
    const $popup = $(this);
    const popupId = $popup.attr('id');
    if (!popupId) return;

    const cookieName = `hide_${popupId}`;
    if (getCookie(cookieName) === "true") {
      $popup.hide();
    }
  });

  $(document).on('click', '.popup .closeBtn', function () {
    const $popup = $(this).closest('.popup');
    const popupId = $popup.attr('id');
    if (!popupId) return;

    const cookieName = `hide_${popupId}`;
    const $chk = $popup.find('.chk');

    if ($chk.length && $chk.prop('checked')) {
      setCookie(cookieName, "true", 1);
    }

    $popup.hide();
  });
});
