document.getElementById("checkout-ok").innerHTML =
  "Félicitations ! Votre commande a bien été enregistrée !";
document.querySelector("#total h2").innerHTML = "RECAPITULATIF DE LA COMMANDE";
document.querySelector("#total p").innerHTML =
  "Total de la commande : " + localStorage.getItem("productTotalCost") + " €";

document.getElementById("order-id").innerHTML =
  "Identifiant de la commande : " + localStorage.getItem("orderID");
localStorage.removeItem("productsInCart");
localStorage.removeItem("cartNumbers");
localStorage.removeItem("productTotalCost");
