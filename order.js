let cartItems = localStorage.getItem("productsInCart");
cartItems = JSON.parse(cartItems);

let products = [];
Object.values(cartItems).map((item) => {
  products.push(item.id);
});

function sendOrder(e) {
  e.preventDefault();
  let contact = {
    firstName: document.getElementById("firstname").value,
    lastName: document.getElementById("lastname").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };
  fetch("https://p5oc.herokuapp.com/api/cameras/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact,
      products,
    }),
  })
    .then(function (res) {
      if (res.ok) {
        console.log(res);
        return res.json();
      }
    })
    .then(function (value) {
      console.log("Order ID :", JSON.stringify(value.orderId));
      localStorage.setItem("orderID", value.orderId);
      confirmationTab();
    })
    .catch((error) => console.log("erreur : ", error));
}

const ck = document.getElementById("form-checkout");
ck.addEventListener("submit", sendOrder);

function confirmationTab() {
  location.href = "confirmation.html";
}
