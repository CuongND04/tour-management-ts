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

// Cart
// Khởi tạo giỏ hàng
const cart = localStorage.getItem("cart");
if (!cart) {
  // value của localStorage luôn là chuỗi, phải biến nó thành json để chuyển về mảng nó dễ
  localStorage.setItem("cart", JSON.stringify([]));
}
// Thêm tour vào giỏ hàng
const formAddToCart = document.querySelector("[form-add-to-cart]");
if (formAddToCart) {
  formAddToCart.addEventListener("submit", (event) => {
    event.preventDefault();
    const quantity = parseInt(formAddToCart.quantity.value);
    const tourId = parseInt(formAddToCart.getAttribute("tour-id"));
    console.log(quantity, tourId);

    if (quantity > 0 && tourId) {
      // chuyển cart về mảng javascript
      const cart = JSON.parse(localStorage.getItem("cart"));
      // kiểm tra xem có tour đấy trong giỏ hàng chưa
      const indexExistTour = cart.findIndex((item) => item.tourId == tourId);

      if (indexExistTour == -1) {
        cart.push({
          tourId: tourId,
          quantity: quantity,
        });
      } else {
        cart[indexExistTour].quantity =
          cart[indexExistTour].quantity + quantity;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  });
}

// End Cart
