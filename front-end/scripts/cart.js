//---AFFICHAGE DES PRODUITS DU PANIER
const order = document.querySelector(".order-summary");
let arrayProductsInCart = JSON.parse(localStorage.getItem("products"));

function displayCart() {
        // Si panier est vide : affiche un message
    if(arrayProductsInCart === null){
        let ifEmptyCart = order;
        ifEmptyCart.classList.add(".if-empty-cart")
        ifEmptyCart.innerHTML = "Votre panier est vide.";
        ifEmptyCart.style.textAlign = "center";
    } else {
    // Si le panier n'est pas vide, affiche les produits du local storage
        const productsOrderSummary = document.querySelector(".order-summary__products");
        for (let product in arrayProductsInCart) {
            let productsList = document.createElement("div");
            productsOrderSummary.appendChild(productsList);
            productsList.classList.add("products-list");

            let productName = document.createElement("div");
            productsList.appendChild(productName);
            productName.classList.add("product-name");
            productName.innerHTML = arrayProductsInCart[product].name;

            let productQuantity = document.createElement("div");
            productsList.appendChild(productQuantity);
            productQuantity.classList.add("product-quantity");
            productQuantity.innerHTML = arrayProductsInCart[product].quantity;

            let productPrice = document.createElement("div");
            productsList.appendChild(productPrice);
            productPrice.classList.add("product-price");
            // Affichage du prix avec le formatage €
            productPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            }).format(arrayProductsInCart[product].price * arrayProductsInCart[product].quantity);
        }
    } 
}

//---CALCUL DU MONTANT TOTAL DU PANIER

function totalCountCart() {
    // Déclaration de variable pour mettre les prix présents dans le panier
    let arrayPriceCart = [];
    let totalPrice = document.querySelector(".total");

    // Recherche des prix présents dans le panier
    let totalPriceProduct = document.querySelectorAll(".product-price");
    for (let price in totalPriceProduct){
        // Ajout des prix dans le tableau
        arrayPriceCart.push(totalPriceProduct[price].innerHTML);
    }

    // Suppression des "undefined" du tableau
    arrayPriceCart = arrayPriceCart.filter((el) => {
        return el != undefined;
    });

    // Transformer en nombre chaque valeur du tableau
    arrayPriceCart = arrayPriceCart.map((x) => parseFloat(x));

    // Addition des valeurs du tableau pour avoir le prix total
    const reducer = (acc, currentVal) => acc + currentVal;
    arrayPriceCart = arrayPriceCart.reduce(reducer);

    // Affichage du prix total en €
    totalPrice.innerText = `Total : ${(arrayPriceCart = new Intl.NumberFormat(
    "fr-FR",
    {
        style: "currency",
        currency: "EUR",
    }
    ).format(arrayPriceCart))}`;
}

//---SUPPRESSION DE TOUS LES PRODUITS DU PANIER
function deleteCart() {
    // Au clic sur le bouton, tous les produits sont supprimés du panier et du local storage
    const buttonDeleteCart = document.querySelector(".delete-cart");
    buttonDeleteCart.addEventListener("click", () => {
      localStorage.clear();
    });
}

// Appel des fonctions
displayCart();
deleteCart();
totalCountCart();
