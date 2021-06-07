function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.getElementById("cart-counter").style.display = "flex";
    document.getElementById("cart-counter").textContent = productNumbers;
  }
}

function cartNumbers(productFetched) {
  console.log(productFetched);
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.getElementById("cart-counter").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.getElementById("cart-counter").style.display = "flex";
    document.getElementById("cart-counter").textContent = 1;
  }
  setProduct(productFetched);
}

function setProduct(product) {
  let localItems = localStorage.getItem("productsInCart");
  localItems = JSON.parse(localItems);
  let itemNumbers;

  if (localItems == null) {
    itemNumbers = 0;
  } else {
    itemNumbers = Object.keys(localItems).length;
  }

  if (localItems != null) {
    localItems = {
      ...localItems,
      ["produit" + itemNumbers]: product,
    };
    itemNumbers++;
  } else {
    localItems = {
      ["produit" + itemNumbers]: product,
    };
    itemNumbers++;
  }

  localStorage.setItem("productsInCart", JSON.stringify(localItems));
}
onLoadCartNumbers();
