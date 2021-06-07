const url = new URL(window.location.href);

fetch("http://localhost:3000/api/cameras/" + url.searchParams.get("id"))
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (productFetch) {
    const productPrice = document.getElementById("product-price");
    const productAdd = document.getElementById("product-add");
    const productContainerToCart = document.getElementById(
      "product-container__to-cart"
    );
    const productSelect = document.createElement("select");
    document
      .getElementById("product-image")
      .setAttribute("src", productFetch.imageUrl);
    document.getElementById("product-name").innerHTML = productFetch.name;
    productPrice.innerHTML = productFetch.price / 100 + " €";
    document.getElementById("product-description").innerHTML =
      productFetch.description;
    productContainerToCart.insertBefore(productSelect, productAdd);

    for (let i in productFetch.lenses) {
      const cameraOption = document.createElement("option");
      cameraOption.innerHTML = productFetch.lenses[i];
      productSelect.appendChild(cameraOption);
    }
    document.getElementById("product-add").addEventListener("click", () => {
      cartNumbers(productFetch);
    });
  })
  .catch(function (err) {
    document.getElementById("product-content").innerHTML +=
      "Erreur de connexion à la base de données.";
  });
