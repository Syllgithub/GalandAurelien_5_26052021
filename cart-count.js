function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.getElementById("cart-counter").style.display = "flex";
    document.getElementById("cart-counter").textContent = productNumbers;
  }
}

function cartNumbers(productFetched, selectedLense) {
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
  setProduct(productFetched, selectedLense);
}

function setProduct(product, selectedLense) {
  let localItems = localStorage.getItem("productsInCart");
  localItems = JSON.parse(localItems);
  let itemNumbers;
  console.log(product);

  let arrayProd = {
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    quantity: 0,
    selectedLense: selectedLense,
    id: product._id,
  };

  console.log(arrayProd);

  if (localItems != null) {
    if (localItems[product.name] == undefined) {
      localItems = {
        ...localItems,
        [product.name]: arrayProd,
      };
    }
    let itemQuantity = localItems[product.name].quantity;
    arrayProd.quantity = itemQuantity + 1;
    localItems[product.name].quantity = arrayProd.quantity;
  } else {
    arrayProd.quantity = 1;
    localItems = {
      [product.name]: arrayProd,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(localItems));
}

function cartTotalCost(totalProducts) {
  let cartTotal = localStorage.getItem("productTotalCost");

  if (cartTotal != null) {
    cartTotal = parseInt(cartTotal);
    localStorage.setItem(
      "productTotalCost",
      cartTotal + totalProducts.price / 100
    );
  } else {
    localStorage.setItem("productTotalCost", totalProducts.price / 100);
  }
}

onLoadCartNumbers();
