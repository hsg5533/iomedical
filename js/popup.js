// 오늘 날짜와 팝업 숨김 기준 가져오기
const today = new Date();
const hideUntil = localStorage.getItem("hidePopupUntil");

// 셀렉터 배열에 넣어 한 번에 처리
document.querySelectorAll(".popup").forEach((popup) => {
  if (!popup) {
    return;
  }
  // 슬라이더 초기화 (jQuery Slick 사용)
  const listEl = popup.querySelector(".popup-list");
  $(listEl).slick({
    speed: 500,
    prevArrow: "",
    nextArrow: "",
    autoplay: true,
    infinite: true,
    draggable: true,
    autoplaySpeed: 4000,
  });

  // 슬라이드 번호 표시
  $(listEl).on("afterChange", (event, slickObj, currentIndex) => {
    popup.querySelector(".slider-pagination").textContent = `${
      currentIndex + 1
    }/${slickObj.slideCount}`;
  });

  // 첫 슬라이드로 이동
  $(listEl).slick("slickGoTo", 0);

  // hideUntil이 오늘보다 이후면 팝업 숨기기
  if (hideUntil && new Date(hideUntil) > today) {
    popup.classList.add("dpnone");
  }

  // “오늘 하루 그만 보기” 버튼
  popup.querySelector(".close-today").addEventListener("click", () => {
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    localStorage.setItem("hidePopupUntil", tomorrow.toISOString());
    popup.classList.add("dpnone");
  });

  // 일반 닫기 버튼
  popup.querySelector(".close").addEventListener("click", () => {
    popup.classList.add("dpnone");
  });
});
