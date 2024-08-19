// Vẽ ra danh sách tour
const drawListTour = () => {
  fetch("http://localhost:3000/cart/list-json", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: localStorage.getItem("cart"),
  })
    .then((res) => res.json())
    .then((data) => {
      const htmlsArray = data.tours.map((item, index) => {
        return `
            <tr>
              <td>${index + 1}</td>
              <td>
                <img 
                  src="${item.image}" 
                  alt="${item.info.title}" 
                  width="80px"
                >
              </td>
              <td>
                <a href="/tours/detail/${item.info.slug}">
                  ${item.info.title}
                </a>
              </td>
              <td>${item.info.price_special.toLocaleString()}đ</td>
              <td>
                <input 
                  type="number" 
                  name="quantity" 
                  value="${item.quantity}" 
                  min="1" 
                  item-id="${item.tourId}" 
                  style="width: 60px"
                >
              </td>
              <td>${item.info.total.toLocaleString()}đ</td>
              <td>
                <button 
                  class="btn btn-sm btn-danger" 
                  btn-delete="${item.tourId}"
                >
                  Xóa
                </button>
              </td>
            </tr>
        `;
      });
      const listTour = document.querySelector("[list-tour]");
      listTour.innerHTML = htmlsArray.join("");

      const elementTotalPrice = document.querySelector("[total-price]");
      elementTotalPrice.innerHTML = data.total.toLocaleString();
      updateQuantityInCart();
      deleteItemCart();
    });
};
// END Vẽ ra danh sách tour
// Xóa sản phẩm trong giỏ hàng
const deleteItemCart = () => {
  const listBtnDelete = document.querySelectorAll("[btn-delete]");
  listBtnDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const tourId = button.getAttribute("btn-delete");
      const cart = JSON.parse(localStorage.getItem("cart"));
      const newCart = cart.filter((item) => item.tourId != tourId);
      localStorage.setItem("cart", JSON.stringify(newCart));

      drawListTour();
    });
  });
};
// END Xóa sản phẩm trong giỏ hàng

// Cập nhật số lượng trong giỏ hàng
const updateQuantityInCart = () => {
  const listInputQuantity = document.querySelectorAll("input[name='quantity']");
  if (listInputQuantity.length > 0) {
    listInputQuantity.forEach((input) => {
      input.addEventListener("change", () => {
        const quantity = parseInt(input.value);
        const tourId = input.getAttribute("item-id");

        const cart = JSON.parse(localStorage.getItem("cart"));
        const tourUpdate = cart.find((item) => item.tourId == tourId);
        if (tourUpdate) {
          tourUpdate.quantity = quantity;
          localStorage.setItem("cart", JSON.stringify(cart));
          drawListTour();
        }
      });
    });
  }
};
// Hết Cập nhật số lượng trong giỏ hàng

// lấy ra data và in ra giao diện
drawListTour();
// lấy ra data và in ra giao diện

// Đặt tour
const formOrder = document.querySelector("[form-order]");
if (formOrder) {
  formOrder.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = formOrder.fullName.value;
    const phone = formOrder.phone.value;
    const note = formOrder.note.value;

    const cart = JSON.parse(localStorage.getItem("cart"));

    const dataFinal = {
      info: {
        fullName: fullName,
        phone: phone,
        note: note,
      },
      cart: cart,
    };

    fetch("/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataFinal),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          localStorage.setItem("cart", JSON.stringify([]));
          window.location.href = `/order/success?orderCode=${data.orderCode}`;
        } else {
          alert("Đặt hàng không thành công!");
        }
      });
  });
}
// Hết Đặt tour
