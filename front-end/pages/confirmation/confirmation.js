//---AFFICHAGE DE LA PAGE CONFIRMATION DE COMMANDE---//

function orderConfirmation() {
    const orderId = document.querySelector("#orderId");
    const priceOrder = document.querySelector("#priceOrder");

    orderId.innerText = localStorage.getItem("orderId");
    priceOrder.innerText = JSON.parse(localStorage.getItem("priceOrder"));
}

// Appel de la fonction
orderConfirmation();