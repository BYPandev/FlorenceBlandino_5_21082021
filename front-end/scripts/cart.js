//---AFFICHAGE DES PRODUITS DU PANIER---//
const orderSummary = document.querySelector(".order-summary");
let arrayProductsInCart = JSON.parse(localStorage.getItem("products"));

function displayCart() {
        // Si panier est vide : affiche un message
    if(arrayProductsInCart === null){
        let ifEmptyCart = orderSummary;
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

//---CALCUL DU MONTANT TOTAL DU PANIER---//

function totalCountCart() {
    // Déclaration de variables pour mettre les prix présents dans le panier
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

    localStorage.setItem("priceOrder", JSON.stringify(arrayPriceCart));
}

//---SUPPRESSION DE TOUS LES PRODUITS DU PANIER---//
function deleteCart() {
    // Au clic sur le bouton, tous les produits sont supprimés du panier et du local storage
    const buttonDeleteCart = document.querySelector(".delete-cart");
    buttonDeleteCart.addEventListener("click", () => {
      localStorage.clear();
    });
}

//---FORMULAIRE---//
function checkForm () {
// Déclaration des variables pour récupérer les éléments inputs depuis le DOM
    let lastName = document.querySelector("#lastname");
    let firstName = document.querySelector("#firstname");
    let address = document.querySelector("#address");
    let city = document.querySelector("#city");
    let email = document.querySelector("#mail");
    const submit = document.querySelector("#submit");

    // Déclaration des constantes de conformité des champs du formulaire
    const textRegEx = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const addressRegEX = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;
    const cityRegEx= /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;

    // Écoute du "click" sur le bouton pour valider la commande
    submit.addEventListener("click", (e) => {

        // Création de condition pour valider le formulaire s'il est correctement rempli par le client
        if (!textRegEx.test(lastName.value) ||
            !textRegEx.test(firstName.value) ||
            !emailRegEx.test(email.value) ||
            !addressRegEX.test(address.value) ||
            !cityRegEx.test(city.value)) {
            alert("Merci de vérifier que les champs complétés sont corrects.");
        } else {
            e.preventDefault();
            // Si le formulaire est valide, création d'un tableau des produits achetés avec leurs _id
            let products = [];
            let productsOrdered = JSON.parse(localStorage.getItem("products"));
            productsOrdered.forEach(p => {
                products.push(p._id);
            })
            console.log(productsOrdered);

            // Création d'une constante qui rassemble le formulaire et le tableau de produits 
            const order = {
                // création de l'objet contact pour la fiche client
                contact: {
                    lastName: lastName.value,
                    firstName: firstName.value,
                    address: address.value,
                    city: city.value,
                    email: email.value,
                },
                products: products,
            };
            console.log(order);

            // Envoi de la requete POST au back-end
            fetch("http://localhost:3000/api/teddies/order", {
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-Type": "application/json" },
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    localStorage.setItem("orderId", data.orderId);
                    // Envoi vers la page de confirmation
                    document.location.href = "confirmation.html";
                })
                .catch((erreur) => console.log("erreur : " + erreur));
        }

    });

}

// Appel des fonctions
displayCart();
deleteCart();
totalCountCart();
checkForm();