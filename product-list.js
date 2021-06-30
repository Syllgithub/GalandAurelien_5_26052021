let contents = document.getElementById("content");
let htmlElementsType = ["div", "a", "img", "h3", "p"];
let htmlElementsName = [
  "cameraContainer",
  "containerLink",
  "cameraImage",
  "cameraName",
  "cameraPrice",
];
let camContent = {};

function priceConverter(price) {
  return price / 100;
}

//=========================================================
//On créé dynamiquement les cards pour les appareils photos
//=========================================================

function createCameraElements(camerasFetch, i) {
  for (let a = 0; a < htmlElementsType.length; a++) {
    camContent[htmlElementsName[a]] = document.createElement(
      htmlElementsType[a]
    );
  }
  contents.appendChild(camContent[htmlElementsName[0]]);
  camContent[htmlElementsName[0]].appendChild(camContent[htmlElementsName[1]]);

  for (let a = 2; a < htmlElementsType.length; a++) {
    camContent[htmlElementsName[1]].appendChild(
      camContent[htmlElementsName[a]]
    );
  }
  camContent[htmlElementsName[1]].setAttribute(
    "href",
    "produits.html?id=" + camerasFetch[i]._id
  );
  camContent[htmlElementsName[2]].setAttribute("src", camerasFetch[i].imageUrl);
  camContent[htmlElementsName[3]].innerHTML = camerasFetch[i].name;
  camContent[htmlElementsName[4]].innerHTML =
    priceConverter(camerasFetch[i].price) + " €";
  camContent["addCameraToCart"] = document.createElement("Button");
  camContent[htmlElementsName[0]].appendChild(camContent.addCameraToCart);
  camContent.addCameraToCart.innerHTML = "Ajouter";
  camContent.addCameraToCart.addEventListener("click", () => {
    cartNumbers(camerasFetch[i], camerasFetch[i].lenses[0]);
    cartTotalCost(camerasFetch[i]);
    document.getElementById("box-content").style.display = "block";
  });
}

let span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  document.getElementById("box-content").style.display = "none";
};
window.onclick = function (event) {
  if (event.target == document.getElementById("box-content")) {
    document.getElementById("box-content").style.display = "none";
  }
};
//========================================================
//On va chercher l'api correspondante aux produits choisis
//========================================================

fetch("https://p5oc.herokuapp.com/api/cameras")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (camerasFetching) {
    for (let i in camerasFetching) {
      createCameraElements(camerasFetching, i);
    }
  })
  .catch(function (err) {
    document.getElementById("content").innerHTML +=
      "Erreur de connexion à la base de données.";
  });
