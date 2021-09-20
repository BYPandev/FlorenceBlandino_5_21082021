//---AFFICHAGE D'UN PRODUIT SÉLECTIONNÉ---//

// Déclaration des variables pour accéder au paramètre "id" de l'API
let params = new URL(document.location).searchParams;
let id = params.get("id");

// Déclaration des constantes pour intégrer les données dans le DOM
const productCardImg = document.querySelector(".img");
const productCardName = document.querySelector(".product-card__infos__title");
const productCardDescription = document.querySelector(".product-card__infos__description");
const productCardPrice = document.querySelector(".product-card__infos__price");
const productNumber = document.querySelector("#productNumber");
const colorSelect = document.querySelector("#color-select");

// Récupération du produit sélectionné grâce à son "id"
function getProductById() {
  fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (resultatAPI) {
      // Placement des données reçues via l'API aux bons endroits sur la page
      article = resultatAPI;
      productCardName.innerHTML = article.name;
      productCardImg.src = article.imageUrl;
      productCardDescription.innerText = article.description;

      // Formatage du prix pour l'afficher en euros
      article.price = article.price / 100;
      productCardPrice.innerText = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(article.price);

      // Création des options de personnalisation de couleurs des oursons
      let colorSelect = document.getElementById("color-select");
      for (let i = 0; i < article.colors.length; i++) {
        let option = document.createElement("option");
        option.innerText = article.colors[i];
        colorSelect.appendChild(option);
      }
    })
    // Création du message en cas d'erreur
    .catch((error) => {
        let container = document.querySelector(".container");
        container.innerHTML =
          "Nous sommes désolés, nous n'avons pas réussi à afficher notre ourson. Réessayez et contactez-nous si le problème persiste";
    });
}

// Ajoute le produit sélectionné dans le panier 
function addtoCart() {
  const addtoCartBtn = document.querySelector(".add-to-cart");

  // Ecoute de l'événement au clic
  addtoCartBtn.addEventListener("click", () => {
      //Création des caractéristiques du produit ajouté au panier
    let productAdded = {
        name: productCardName.innerHTML,
        price: parseFloat(productCardPrice.innerHTML),
        quantity: parseFloat(document.querySelector("#productNumber").value),
        _id: id,
      }
          
    let quantity = parseFloat(document.querySelector("#productNumber").value);
          
    // Ajout dans le LS
    let arrayProductsInCart = JSON.parse(localStorage.getItem("products"));

    //S'il n'y a pas de panier, création d'un tableau 
    if(!arrayProductsInCart) {
      let arrayProductsInCart = [];
      arrayProductsInCart.push(productAdded);
      localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
      popUpConfirmation()

    // Sinon, s'il y a un panier
    // vérifie qu'il n'y pas le même objet dans le panier avant de l'ajouter au LS
    } else if(!arrayProductsInCart.some(p => p._id === productAdded._id)) {
      arrayProductsInCart.push(productAdded);
      localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
      popUpConfirmation()

    // Sinon
    // s'il y a un objet dans le panier, le produit est filtré par son _id et la quantité mise à jour avant l'ajout au LS
    } else {
        arrayProductsInCart
          .filter(p => p._id === productAdded._id)
          .map(productAdded => productAdded.quantity = quantity + productAdded.quantity)
          .push(productAdded);
        localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
        popUpConfirmation()
      };
  });
}

// Affichage d'une fenêtre de confirmation de l'ajout au panier
function popUpConfirmation(){
  if(window.confirm(`Votre produit a bien été ajouté au panier ! 
  Cliquez sur OK pour voir votre panier ou Annuler pour continuer votre shopping`)){
    window.location.href = "./cart.html";
  } else {
    window.location.href = "./index.html";
  }
}

// Appel des fonctions 
getProductById();
addtoCart();
