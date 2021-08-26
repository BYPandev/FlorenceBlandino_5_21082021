// Récupération des données de l'API
function getProducts() {
  fetch("http://localhost:3000/api/teddies")
    .then(function (response) {
      return response.json();
    })
    // Création du message d'erreur
    .catch((error) => {
      let productsContainer = document.querySelector(".products-container");
      productsContainer.innerHTML =
        "Nous sommes désolés, nous n'avons pas réussi à afficher nos oursons. Réessayez et contactez-nous si le problème persiste";
      productsContainer.style.textAlign = "center";
    })

    // Dispatch des données de chaque produit dans le DOM
    .then(function (resultatAPI) {
      const articles = resultatAPI;
      console.log(articles);
      for (let article in articles) {
        // création d'une div pour chaque produit dans le bloc "products"
        let productCard = document.createElement("div");
        document.querySelector(".products").appendChild(productCard);
        productCard.classList.add("product");

        // création du lien vers produit.html pour chaque bloc
        let productLink = document.createElement("a");
        productCard.appendChild(productLink);
        productLink.href = `product.html?id=${resultatAPI[article]._id}`;
        productLink.classList.add("product-link");

        // création d'un bloc pour l'image du produit
        let productImgDiv = document.createElement("div");
        productLink.appendChild(productImgDiv);
        productImgDiv.classList.add("product__img");

        // affichage de l'image du produit
        let productImg = document.createElement("img");
        productImgDiv.appendChild(productImg);
        productImg.src = resultatAPI[article].imageUrl;

        // création du bloc pour les infos du produit
        let productInfosDiv = document.createElement("div");
        productLink.appendChild(productInfosDiv);
        productInfosDiv.classList.add("product__infos");

        // affichage du titre du produit
        let productInfoTitle = document.createElement("p");
        productInfosDiv.appendChild(productInfoTitle);
        productInfoTitle.classList.add("product__infos__title");
        productInfoTitle.innerHTML = resultatAPI[article].name;

        // affichage du prix du produit
        let productInfoPrice = document.createElement("p");
        productInfosDiv.appendChild(productInfoPrice);
        productInfoPrice.classList.add("product__infos__price");

        // modification du prix pour l'afficher en euros
        resultatAPI[article].price = resultatAPI[article].price / 100;
        productInfoPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
        }).format(resultatAPI[article].price);
      }
    });
}

// Appel de la fonction getProducts
getProducts();