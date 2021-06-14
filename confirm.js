document.getElementById("checkout-ok").innerHTML =
  "Félicitations ! Votre commande a bien été enregistrée !";
document.getElementById("order-id").innerHTML =
  "Identifiant de la commande : " + localStorage.getItem("orderID");
