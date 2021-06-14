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
    document.getElementById("checkout").style.display = "initial";
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("cart-content-info");
    cartContent.appendChild(itemContainer);
    const itemName = document.createElement("p");
    itemName.innerHTML = "Produit";
    itemName.classList.add("item-name");
    const itemLense = document.createElement("p");
    itemLense.innerHTML = "Lentille";
    itemLense.classList.add("item-lense");
    const itemQuantity = document.createElement("p");
    itemQuantity.innerHTML = "Quantité";
    itemQuantity.classList.add("item-quantity");
    const itemCost = document.createElement("p");
    itemCost.innerHTML = "Prix/U";
    itemCost.classList.add("item-cost");
    itemContainer.appendChild(itemName);
    itemContainer.appendChild(itemLense);
    itemContainer.appendChild(itemQuantity);
    itemContainer.appendChild(itemCost);

    Object.values(cartItems).map((item) => {
      const cartDiv = document.createElement("div");
      cartDiv.classList.add("test");
      const cartImg = document.createElement("img");
      cartImg.setAttribute("src", item.imageUrl);
      const cartName = document.createElement("h2");
      cartName.innerHTML = item.name;
      const cartPrice = document.createElement("p");
      cartPrice.innerHTML = item.price / 100 + " €";
      const cartLense = document.createElement("p");
      cartLense.innerHTML = item.selectedLense;
      const cartQuantity = document.createElement("p");
      cartQuantity.innerHTML = item.quantity;
      cartQuantity.classList.add("cart-quantity");

      cartContent.appendChild(cartDiv);
      cartDiv.appendChild(cartImg);
      cartDiv.appendChild(cartName);
      cartDiv.appendChild(cartLense);
      cartDiv.appendChild(cartQuantity);
      cartDiv.appendChild(cartPrice);
    });
    const cartTotalCost = document.createElement("p");
    cartTotalCost.classList.add("total-cost");
    cartTotalCost.innerHTML =
      "TOTAL : " + localStorage.getItem("productTotalCost") + " €";
    cartContent.appendChild(cartTotalCost);
  }
}

document.getElementById("delete-cart").addEventListener("click", () => {
  itemCartDelete();
});
document.getElementById("checkout").addEventListener("click", () => {
  location.href = "commander.html";
});

function itemCartDelete() {
  localStorage.removeItem("productsInCart");
  localStorage.removeItem("cartNumbers");
  localStorage.removeItem("productTotalCost");
  document.getElementById("delete-cart").style.display = "none";
  document.getElementById("checkout").style.display = "none";
  location.reload();
}

printCart();
