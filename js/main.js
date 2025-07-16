$(function () {
  
  //aos 초기화
  $(window).load(function () {
    AOS.init({
      duration: 1300
    });
  });

  let lastSelectedIndex = 0,
    autoTimer = null,
    isPaused = false,
    swiperInstance = null,
    isSwiperMode = false;

  const $mainWrap = $('#mainWrap');
  const $mainBox = $mainWrap.find('.mainBox');
  const $slideBox = $mainWrap.find('.slideBox');

  function getSlides() {
    return $('#mainWrap .box');
  }

  function applyActive(index) {
    if (isSwiperMode) return;
    if (lastSelectedIndex === index) return;

    const $slides = getSlides();
    $slides.removeClass('active');
    $slides.eq(index).addClass('active');
    lastSelectedIndex = index;
  }

  function startAutoPlay() {
    if (isSwiperMode) return;
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      const $slides = getSlides();
      const nextIndex = (lastSelectedIndex + 1) % $slides.length;
      applyActive(nextIndex);
    }, 10000);
    isPaused = false;
  }

  function pauseAutoPlay() {
    clearInterval(autoTimer);
    isPaused = true;
  }

  function bindCustomEvents() {
    const $slides = getSlides();

    $slides.each(function (i) {
      $(this).on('click.custom', () => applyActive(i));
    });

    $mainWrap.find('.control .prev').on('click.custom', () => {
      applyActive((lastSelectedIndex - 1 + getSlides().length) % getSlides().length);
    });

    $mainWrap.find('.control .next').on('click.custom', () => {
      applyActive((lastSelectedIndex + 1) % getSlides().length);
    });

    $mainWrap.find('.control .pause').on('click.custom', () => {
      pauseAutoPlay();
      $('.pause').hide();
      $('.play').show();
    });

    $mainWrap.find('.control .play').on('click.custom', () => {
      if (isPaused) startAutoPlay();
      $('.play').hide();
      $('.pause').show();
    });
  }

  function unbindCustomEvents() {
    clearInterval(autoTimer);
    const $slides = getSlides();
    $slides.off('.custom');
    $mainWrap.find('.control .prev, .next, .pause, .play').off('.custom');
    $('.pause').show();
    $('.play').hide();
  }

  function initSwiper() {
    $mainBox.addClass('swiper');
    $slideBox.addClass('swiper-wrapper');
    getSlides().addClass('swiper-slide');

    swiperInstance = new Swiper('.swiper', {
      slidesPerView: 1,
      loop: true,
      navigation: { nextEl: '.control .next', prevEl: '.control .prev' },
      autoplay: { delay: 10000, disableOnInteraction: false },
      speed: 1500,
    });

    $('.control .pause').on('click.swiper', () => {
      swiperInstance.autoplay.stop();
      $('.pause').hide();
      $('.play').show();
    });

    $('.control .play').on('click.swiper', () => {
      swiperInstance.autoplay.start();
      $('.play').hide();
      $('.pause').show();
    });
  }

  function destroySwiper() {
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }
    $mainBox.removeClass('swiper');
    $slideBox.removeClass('swiper-wrapper');
    getSlides().removeClass('swiper-slide');

    $('.control .pause').off('.swiper');
    $('.control .play').off('.swiper');
  }

  function checkMode() {

    const winW = window.innerWidth;

    if (winW <= 1024 && !isSwiperMode) {
      getSlides().removeClass('active');

      unbindCustomEvents();
      destroySwiper();
      initSwiper();
      isSwiperMode = true;

    } else if (winW > 1024 && isSwiperMode) {
      destroySwiper();
      isSwiperMode = false;

      requestAnimationFrame(() => {
        bindCustomEvents();
        lastSelectedIndex = 0;
        startAutoPlay();

        const $slides = getSlides();
        $slides.removeClass('active');
        $slides.eq(0).addClass('active');
      });

    } else if (!isSwiperMode && autoTimer === null) {
      bindCustomEvents();
      lastSelectedIndex = 0;
      startAutoPlay();
      getSlides().eq(0).addClass('active');
    }

  }

  $(window).on('resize orientationchange', checkMode);
  checkMode();

});