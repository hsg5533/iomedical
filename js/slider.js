function initSlider(mainSelector, thumbSelector) {
  const isMobile = window.innerWidth <= 768;

  // 공통 옵션
  const baseOptions = {
    spaceBetween: 0,
    autoplay: true,
    loop: true,
    navigation: {
      nextEl: `${mainSelector} .swiper-button-next`,
      prevEl: `${mainSelector} .swiper-button-prev`,
    },
  };

  if (isMobile) {
    // 모바일 뷰: 페이징 추가
    return new Swiper(mainSelector, {
      ...baseOptions,
      pagination: {
        el: `${mainSelector} .swiper-pagination`,
        clickable: true,
      },
    });
  }

  // 데스크탑 뷰: 썸네일 슬라이더 먼저 생성
  return new Swiper(mainSelector, {
    ...baseOptions,
    thumbs: {
      swiper: new Swiper(thumbSelector, {
        direction: "vertical",
        slidesPerView: 5,
        spaceBetween: 0,
        watchSlidesProgress: true,
      }),
    },
  });
}
