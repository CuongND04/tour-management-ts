//  slide tour detail

var imagesThumb = new Swiper(".imagesThumb", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
});
var imagesMain = new Swiper(".imagesMain", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: imagesThumb,
  },
});
// end slide tour detail
