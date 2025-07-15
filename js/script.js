// AOS 초기화
AOS.init();

// --vh CSS 변수 세팅 및 즉시 실행
function updateVH() {
  document.documentElement.style.setProperty(
    "--vh",
    0.01 * window.innerHeight + "px"
  );
}
window.addEventListener("resize", updateVH);
updateVH();

// 스크롤 처리 (메뉴 고정/해제 + Go-Top 토글)
function onScroll() {
  const sy = window.scrollY;
  const menu = document.querySelector(".main-menu");
  const icon = document.querySelector(".main-menu .menu-icon");
  if (sy < 0.1) {
    menu.style.top = 0.1 - sy + "px";
    if (menu.classList.contains("fixed")) {
      menu.classList.remove("fixed");
      icon.classList.remove("on");
    }
  } else {
    menu.style.top = "0";
    menu.classList.add("fixed");
    icon.classList.add("on");
  }
  document.getElementById("go-top").style.display = sy > 100 ? "block" : "none";
}
window.addEventListener("scroll", onScroll);
onScroll();

// 로딩 페이드아웃 (간단히 숨김 처리)
document.querySelector(".loading").style.display = "none";

// 메인 슬라이더 초기 애니메이션
const currSlide = document.querySelector(".main-slider .slick-current");
if (currSlide) {
  currSlide.classList.remove("slick-active");
  currSlide.classList.add("reset-animation");
  setTimeout(() => {
    currSlide.classList.remove("reset-animation");
    currSlide.classList.add("slick-active");
  }, 1);
}

// Slick 초기화 (jQuery 필요)
$(".main-slider").slick({
  dots: true,
  fade: true,
  slidesToShow: 1,
  draggable: true,
  speed: 1200,
  lazyLoad: "ondemand",
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnFocus: false,
  pauseOnHover: false,
  pauseOnDotsHover: false,
  pauseOnArrowsHover: false,
  appendArrows: $(".arrow-con > .arrows"),
  prevArrow:
    '<button type="button" class="slick-prev"><i class="xi-angle-left-thin"></i><span class="font-poppins"></span></button>',
  nextArrow:
    '<button type="button" class="slick-next"><i class="xi-angle-right-thin"></i><span class="font-poppins"></span></button>',
});

$(".single-item").slick({
  dots: false,
  centerMode: true,
  slidesToShow: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 2500,
  lazyLoad: false,
  pauseOnFocus: false,
  pauseOnHover: false,
  arrows: true,
});

// footer-select 토글 (순수 JS)
document.querySelectorAll(".footer-select .placeholder").forEach((el) => {
  el.addEventListener("click", () => {
    const sel = el.closest(".footer-select");
    sel.classList.toggle("is-open");
    document.querySelectorAll(".footer-select.is-open").forEach((o) => {
      o !== sel && o.classList.remove("is-open");
    });
  });
});
document.querySelectorAll(".footer-select ul>li").forEach((li) => {
  li.addEventListener("click", () => {
    const sel = li.closest(".footer-select");
    sel.classList.remove("is-open");
    sel.querySelector(".placeholder").textContent = li.textContent;
  });
});

// 모바일 내비게이션 토글
document.querySelector(".nav-mobile-button").addEventListener("click", () => {
  document.querySelector(".nav-mobile-menu").classList.toggle("active");
  document.querySelectorAll(".nav-mobile-bar").forEach((nav) => {
    nav.classList.toggle("active");
  });
});

// FAQ 토글
document.querySelectorAll(".open").forEach((btn) => {
  btn.addEventListener("click", () => {
    const box = btn.closest(".faq-box");
    const ans = box.querySelector(".answer");
    ans.style.display = ans.style.display === "block" ? "none" : "block";
    box.classList.toggle("expanded");
  });
});

// Go-Top 클릭 스크롤 업
document.querySelector("#go-top a").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
