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

// Appel de la fonction 
main();

function main() {
  getProductById();
}