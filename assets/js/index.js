// header +  gnb
let changedHeader = false;
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
      onLeaveBackHeader();
    },
  },
});

function onEnterHeader() {
  $(".header-wrapper, .logo, .gnb-link, .btn-search, .btn-lang, .util .help").addClass("on");
}
function onLeaveBackHeader() {
  $(".header-wrapper, .logo, .gnb-link, .btn-search, .btn-lang, .util .help").removeClass("on");
}
function openMenu() {
  $(".hidden-menu, .sub-gnb").addClass("on");
}
function closeMenu() {
  $(".hidden-menu, .sub-gnb").removeClass("on");
}

$(".gnb").hover(
  function () {
    openMenu();
    if (!changedHeader) onEnterHeader();
  },
  function () {
    closeMenu();
    if (!changedHeader) onLeaveBackHeader();
  }
);

// sc-intro
var introVideo = document.getElementById("intro-video");
var videoBtn = document.getElementById("video-btn");
var progressBar = document.getElementById("progress-bar");

videoBtn.addEventListener("click", function () {
  if (introVideo.paused) {
    introVideo.play();
    videoBtn.classList.remove("play");
  } else {
    introVideo.pause();
    videoBtn.classList.add("play");
  }
});

introVideo.addEventListener("timeupdate", function () {
  var progress = (introVideo.currentTime / introVideo.duration) * 100;
  progressBar.style.width = progress + "%";
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
const projcetSwiper = new Swiper(".swiper-container", {
  slidesPerView: 4,
  spaceBetween: 56,
  navigation: {
    prevEl: ".btn-prev",
    nextEl: ".btn-next",
  },
  autoplay: false,
  breakpoints: {
    1539: {
      slidesPerView: 4,
    },
    1366: {
      slidesPerView: 3.5,
    },
  },
  on: {
    slideChange: function () {
      const slideLength = this.slides.length; // 슬라이드 개수
      const currentIndex = this.realIndex; // 현재 활성화된 슬라이드의 인덱스
      const progress = ((currentIndex + 1) / (slideLength - 2)) * 100; // 10%부터 시작
      document.querySelector(".progress-bar").style.width = progress + "%";
    },
  },
});

gsap.from(".sc-project .swiper-container", {
  scrollTrigger: {
    trigger: ".sc-project .swiper-container",
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
