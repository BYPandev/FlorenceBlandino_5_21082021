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

function addtoCart() {
    const addtoCartBtn = document.querySelector(".add-to-cart");

    // Ecoute de l'événement au clic
    addtoCartBtn.addEventListener("click", () => {
        if (productNumber.value > 0 && productNumber.value < 100) {
            //Création des caractéristiques du produit ajouté au panier
            let productAdded = {
                name: productCardName.innerHTML,
                price: parseFloat(productCardPrice.innerHTML),
                quantity: parseFloat(document.querySelector("#productNumber").value),
                _id: id,
            };
            // Déclaration tableau pour gestion du localStorage
            let arrayProductsInCart = [];

            //Si localStorage existe, on récupère son contenu
            if (localStorage.getItem("products") !==null) {
                arrayProductsInCart = JSON.parse(localStorage.getItem("products"));
            }
            // On crée le localStorage avec le produit ajouté
            arrayProductsInCart.push(productAdded);
            localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
            console.log(localStorage);
            alert('Votre article a bien été ajouté');
        } else {
            alert('La quantité doit être comprise entre 1 et 99')
        }
    });
}

// Appel de la fonction 
main();

function main() {
  getProductById();
  addtoCart();
}