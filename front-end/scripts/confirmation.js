//---CONFIRMATION DE COMMANDE

function orderConfirmation() {
    const orderId = document.querySelector("#orderId");
    const priceOrder = document.querySelector("#priceOrder");

    orderId.innerText = localStorage.getItem("orderId");
    priceOrder.innerText = JSON.parse(localStorage.getItem("priceOrder"));

    // On vide le localStorage 
    localStorage.clear;
}

orderConfirmation();