const lenis = new Lenis();

lenis.on("scroll", (e) => {
  // console.log(e);
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// header +  gnb
let changedHeader = false;
const elements =
  ".header-wrapper, .logo, .gnb-link, .btn-search, .btn-lang, .util .help button, .mobile-btn";
const headerMotion = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-intro",
    start: "100% 50%",
    end: "100% 0%",
    // markers: true,
    onEnter: function () {
      changedHeader = true;
      onEnterHeader();
    },
    onLeaveBack: function () {
      changedHeader = false;
      if (!openSearchMenu) onLeaveBackHeader();
    },
  },
});

function onEnterHeader() {
  $(elements).addClass("on");
}
function onLeaveBackHeader() {
  $(elements).removeClass("on");
  changedHeader = false;
}

function openGnb() {
  $(".hidden-menu, .sub-gnb, .header-banner").addClass("on");
}
function closeGnb() {
  $(".hidden-menu, .sub-gnb, .header-banner").removeClass("on");
}

$(".gnb").hover(
  function () {
    if (!changedHeader) onEnterHeader();
    openGnb();
  },
  function () {
    if (!changedHeader && !openSearchMenu) onLeaveBackHeader();
    closeGnb();
  }
);

let openSearchMenu = false;
$(".btn-search").click(function () {
  if ($(this).hasClass("open")) {
    openSearchMenu = false;
    $(this).removeClass("open");
    $(".search-menu").removeClass("open");
    if (!changedHeader) onLeaveBackHeader();
    $(".search-dim").hide();
  } else {
    openSearchMenu = true;
    onEnterHeader();
    $(this).addClass("open");
    $(".search-menu").addClass("open");
    $(".search-dim").show();
  }
});

// help-menu
$(".btn-help").click(function () {
  openMenu(".help-menu");
});
$(".help-menu .close").click(function () {
  closeMenu(".help-menu");
});

function openMenu(element) {
  $(".dim").show();
  $(element).addClass("open");
  $("body").addClass("no-scroll");
  lenis.stop(); // Lenis 스크롤 정지
}
function closeMenu(element) {
  $(".dim").hide();
  $(element).removeClass("open");
  $("body").removeClass("no-scroll");
  lenis.start(); // Lenis 스크롤 시작
}

$(document).click(function (event) {
  if (
    $(".help-menu").hasClass("open") &&
    !$(event.target).closest(".help").length &&
    !$(event.target).closest(".help-menu").length
  ) {
    closeMenu(".help-menu");
  }
});

// lenis의 영향을 받지 않도록
$(".help-menu, .mobile-menu").on("wheel", function (event) {
  event.stopPropagation();
});

// mobile-menu
$(".mobile-btn").click(function () {
  openMenu(".mobile-menu");
});
$(".mobile-menu .close").click(function () {
  closeMenu(".mobile-menu");
});

$(document).click(function (event) {
  if (
    $(".mobile-menu").hasClass("open") &&
    !$(event.target).closest(".mobile-btn").length &&
    !$(event.target).closest(".mobile-menu").length
  ) {
    closeMenu(".mobile-menu");
  }
});

// mobile-sub-gnb
$(".mobile-item").click(function (e) {
  e.preventDefault();
  $(this).toggleClass("on").siblings().removeClass("on");
  $(this).find(".mobile-sub-gnb").slideToggle();
  $(this).siblings().find(".mobile-sub-gnb").slideUp();
});

// sc-intro
var introVideo = document.getElementById("intro-video");
var videoBtn = document.getElementById("video-btn");
var progressBar = document.getElementById("progress-bar");

introVideo.addEventListener("loadedmetadata", function () {
  const barMotion = gsap.to("#progress-bar", introVideo.duration, {
    repeat: -1, // 무한 반복
    width: "100%",
    paused: true,
    ease: "none",
  });

  introVideo.play();
  barMotion.play();

  videoBtn.addEventListener("click", function () {
    if (introVideo.paused) {
      introVideo.play();
      barMotion.play();
      videoBtn.classList.remove("play");
    } else {
      introVideo.pause();
      barMotion.pause();
      videoBtn.classList.add("play");
    }
  });
});

const introMotion = gsap.timeline({
  ease: "power2.easeInOut",
  duration: 1,
});
introMotion
  .from(".sc-intro .content-wrapper .title-area", {
    opacity: 0,
    yPercent: 100,
    delay: 0.5,
  })
  .to(".animation .round", {
    onStart: () => $(".animation .round").addClass("on"),
  })
  .to(".animation .ky", {
    onStart: () => $(".animation .ky").addClass("on"),
  });

// top-btn
document.querySelector(".top-btn").addEventListener("click", function () {
  lenis.scrollTo(0);
});

gsap.from(".top-btn-wrapper", {
  scrollTrigger: {
    trigger: ".sc-competition",
    start: "30% 100%",
    end: "100% 0%",
    // markers: true,
    toggleActions: "play none none reverse",
  },
  opacity: 0,
});

// title-animation 공통
$(".title-animation").each(function (_, element) {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: "0% 100%",
      end: "100% 0%",
      // markers: true,
      toggleActions: "play none none reverse",
    },
    yPercent: 100,
    opacity: 0,
  });
});

// sc-competition
gsap.from(".sc-competition .content-wrapper .content", {
  scrollTrigger: {
    trigger: ".sc-competition .content-wrapper",
    start: "0% 100%",
    end: "100% 0%",
    // markers: true,
    toggleActions: "play none none reverse",
  },
  stagger: 0.1,
  yPercent: 30,
  opacity: 0,
});

//sc-solution
gsap.from(".sc-solution .solution-list .solution-item", {
  scrollTrigger: {
    trigger: ".sc-solution .solution-list",
    start: "0% 100%",
    end: "100% 0%",
    // markers: true,
    toggleActions: "play none none reverse",
  },
  stagger: 0.1,
  yPercent: 30,
  opacity: 0,
});

// sc-g-novia
gsap.to(".sc-g-novia .bg", {
  scrollTrigger: {
    trigger: ".sc-g-novia",
    start: "0% 100%",
    end: "100% 0%",
    scrub: true,
    // markers: true,
  },
  yPercent: 30,
});

// sc-synergy
const rollingMotion = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-synergy",
    start: "45% 100%",
    end: "100% 0%",
    toggleActions: "play none none reverse",
    // markers: true,
  },
});
rollingMotion.from(".sc-synergy .content-wrapper", {
  scaleX: 0,
  transformOrigin: "center",
});
rollingMotion.to(".sc-synergy .rolling-num", {
  yPercent: -100,
  bottom: "100%",
  stagger: {
    from: "random",
    each: 0.1,
  },
});

// sc-project
const projcetSwiper = new Swiper(".project-slide", {
  slidesPerView: "auto",
  spaceBetween: 8,
  navigation: {
    prevEl: ".btn-prev",
    nextEl: ".btn-next",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  breakpoints: {
    1023: {
      spaceBetween: 56,
    },
  },
});

gsap.from(".sc-project .project-slide", {
  scrollTrigger: {
    trigger: ".sc-project .project-slide",
    start: "0% 100%",
    end: "100% 0%",
    toggleActions: "play none none reverse",
    // markers: true,
  },
  xPercent: 20,
});

gsap.from(".sc-customer .common-header, .sc-customer .list-area, .sc-recruit", {
  scrollTrigger: {
    trigger: ".last-division",
    start: "10% 100%",
    end: "100% 0%",
    // markers: true,
    toggleActions: "play none none reverse",
  },
  stagger: 0.3,
  yPercent: 30,
  opacity: 0,
});
