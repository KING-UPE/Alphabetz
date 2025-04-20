var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,

    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },


    breakpoints:{
        0: {
            slidesPerView: 1,
        },
        950: {
            slidesPerView: 2,
        },

    },
  });