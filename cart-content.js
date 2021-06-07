let cartContent = document.getElementById("cart-content");

let cartItems = localStorage.getItem("productsInCart");
cartItems = JSON.parse(cartItems);

/*Object.values(cartItems).map((item) => {
  cartContent.innerHTML += `
  <div class="test">
    <img src="${item.imageUrl}" />
    <h2>${item.name}</h2>
    <p>${item.price / 100} €</p>
    <i class="far fa-times-circle"></i>
  </div>
  `;
});*/
function printCart() {
  if (cartItems == null) {
    cartContent.innerHTML = "Aucun article dans votre panier.";
  } else {
    document.getElementById("delete-cart").style.display = "initial";
    Object.values(cartItems).map((item) => {
      const cartDiv = document.createElement("div");
      cartDiv.classList.add("test");
      const cartImg = document.createElement("img");
      cartImg.setAttribute("src", item.imageUrl);
      const cartName = document.createElement("h2");
      cartName.innerHTML = item.name;
      const cartPrice = document.createElement("p");
      cartPrice.innerHTML = item.price / 100 + " €";
      cartContent.appendChild(cartDiv);
      cartDiv.appendChild(cartImg);
      cartDiv.appendChild(cartName);
      cartDiv.appendChild(cartPrice);
    });
  }
}

document.getElementById("delete-cart").addEventListener("click", () => {
  itemCartDelete();
});

function itemCartDelete() {
  localStorage.removeItem("productsInCart");
  localStorage.removeItem("cartNumbers");
  document.getElementById("delete-cart").style.display = "none";
  location.reload();
}

printCart();
