let cartItems = localStorage.getItem("productsInCart");
cartItems = JSON.parse(cartItems);
let orderForm = document.querySelector("#form-checkout");

const validGlobalInformations = function (input) {
  let nameRegex = new RegExp("^[a-zA-Z- ]+$", "g");
  let testName = nameRegex.test(input.value);
  let textSmall = input.nextElementSibling;

  if (testName) {
    input.classList.add("input-success");
    input.classList.remove("input-failed");
    textSmall.innerHTML = "<i class='fas fa-check'> </i>";
    return true;
  } else {
    input.classList.add("input-failed");
    input.classList.remove("input-success");
    textSmall.innerHTML = "";
    return false;
  }
};

const validPhoneNumber = function (input) {
  let nameRegex = new RegExp("^[0-9]{10}$", "g");
  let testName = nameRegex.test(input.value);
  let textSmall = input.nextElementSibling;
  if (testName) {
    input.classList.add("input-success");
    input.classList.remove("input-failed");
    textSmall.innerHTML = "<i class='fas fa-check'> </i>";
    return true;
  } else {
    input.classList.add("input-failed");
    input.classList.remove("input-success");
    textSmall.innerHTML = "";
    return false;
  }
};

const validZipCode = function (input) {
  let nameRegex = new RegExp("^[0-9]{3,5}$", "g");
  let testName = nameRegex.test(input.value);
  let textSmall = input.nextElementSibling;

  if (testName) {
    input.classList.add("input-success");
    input.classList.remove("input-failed");
    textSmall.innerHTML = "<i class='fas fa-check'> </i>";
    return true;
  } else {
    input.classList.add("input-failed");
    input.classList.remove("input-success");
    textSmall.innerHTML = "";
    return false;
  }
};

const validAddress = function (input) {
  let nameRegex = new RegExp("^[0-9a-zA-Z- ]+$", "g");
  let testName = nameRegex.test(input.value);
  let textSmall = input.nextElementSibling;
  if (testName) {
    input.classList.add("input-success");
    input.classList.remove("input-failed");
    textSmall.innerHTML = "<i class='fas fa-check'> </i>";
    return true;
  } else {
    input.classList.add("input-failed");
    input.classList.remove("input-success");
    textSmall.innerHTML = "";
    return false;
  }
};

const validEmail = function (input) {
  let nameRegex = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  let testName = nameRegex.test(input.value);
  let textSmall = input.nextElementSibling;
  if (testName) {
    input.classList.add("input-success");
    input.classList.remove("input-failed");
    textSmall.innerHTML = "<i class='fas fa-check'> </i>";
    return true;
  } else {
    input.classList.add("input-failed");
    input.classList.remove("input-success");
    textSmall.innerHTML = "";
    return false;
  }
};

orderForm.lastname.addEventListener("change", function () {
  validGlobalInformations(this);
});

orderForm.firstname.addEventListener("change", function () {
  validGlobalInformations(this);
});

orderForm.city.addEventListener("change", function () {
  validGlobalInformations(this);
});

orderForm.phonenumber.addEventListener("change", function () {
  validPhoneNumber(this);
});

orderForm.zipcode.addEventListener("change", function () {
  validZipCode(this);
});

orderForm.address.addEventListener("change", function () {
  validAddress(this);
});

orderForm.email.addEventListener("change", function () {
  validEmail(this);
});

let products = [];
Object.values(cartItems).map((item) => {
  products.push(item.id);
});

function sendOrder(e) {
  e.preventDefault();
  if (
    validGlobalInformations(orderForm.lastname) &&
    validGlobalInformations(orderForm.firstname) &&
    validGlobalInformations(orderForm.city) &&
    validPhoneNumber(orderForm.phonenumber) &&
    validZipCode(orderForm.zipcode) &&
    validAddress(orderForm.address) &&
    validEmail(orderForm.email)
  ) {
    let contact = {
      firstName: orderForm.firstname.value,
      lastName: orderForm.lastname.value,
      address: orderForm.address.value,
      city: orderForm.city.value,
      email: orderForm.email.value,
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
}

const ck = document.getElementById("form-checkout");
ck.addEventListener("submit", sendOrder);

function confirmationTab() {
  location.href = "confirmation.html";
}
