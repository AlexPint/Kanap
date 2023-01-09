async function main() {
  let products = JSON.parse(localStorage.getItem("product"));
  async function kanapData() {
    let productList = await fetch("http://localhost:3000/api/products");
    return productList.json();
  }
}

if (!products) {
  const titleCart = document.querySelector("h1");
  const sectionCart = document.querySelector(".cart");

  titleCart.innerHTML = "Votre panier est vide !!!";
  sectionCart.style.display = "none";
} else {
  // Récupérations des informations sur le/les produit(s)
  let apiProducts = kanapData();

  for (let apiProduct of apiProducts) {
    // Boucler sur les produits de products
    for (let productInStorage of products) {
      // Si ils ont le même id alors
      if (apiProduct._id == productInStorage._id) {
        // Les informations à récuperer qui vont nous servire à afficher le/les produit.s correctement
        productInStorage.price = apiProduct.price;
        productInStorage.name = apiProduct.name;
        productInStorage.imageUrl = apiProduct.imageUrl;
      }
    }
  }

  // Boucle for, si ils sont dans le products.length alors on vient afficher les produits dynamiquement et on vient créer un element 'article' et son parent est = au inner.HTML ci-dessous
  for (let i = 0; i < products.length; i++) {
    const parent = document.createElement("article");

    parent.innerHTML = `
 <article class="cart__item" data-id="${products[i]._id}" data-color="${
      products[i].color
    }">
         <div class="cart__item__img">
           <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
         </div>
         <div class="cart__item__content">
           <div class="cart__item__content__description">
             <h2>${products[i].name}</h2>
             <p>${products[i].color}</p>
             <p>${products[i].price * products[i].quantity + " €"}</p>
           </div>
           <div class="cart__item__content__settings">
             <div class="cart__item__content__settings__quantity">
               <p>Qté : </p>
               <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
                 products[i].quantity
               }">
             </div>
             <div class="cart__item__content__settings__delete">
               <p class="deleteItem">Supprimer</p>
             </div>
           </div>
         </div>
       </article>
 `;

    document.getElementById("cart__items").appendChild(parent);

    //Supprimer un article
    let productSupprimer = parent.querySelector(".deleteItem");

    // Suite à un évènement au 'click' pour la suppression d'un article
    productSupprimer.addEventListener("click", (e) => {
      e.preventDefault();

      // Enregistrer l'id et la couleur séléctionnés par le bouton supprimer
      let deleteId = products[i]._id;
      let deleteColor = products[i].color;

      // Filtrer l'élément cliqué par le bouton supprimer
      products = products.filter(
        (elt) => elt._id !== deleteId || elt.color !== deleteColor
      );

      // Envoyer les nouvelles données dans le localStorage
      localStorage.setItem("product", JSON.stringify(products));

      // Avertir de la suppression et recharger la page
      alert(
        "Le produit à bien été supprimé, veuillez appuyer sur ok pour continuer."
      );

      // Si pas de produits dans le localStorage, on affiche que le panier est vide
      if (products.length === 0) {
        localStorage.clear();
      }
      // Actualisation rapide de la page
      location.reload();
    });

    // ----------------------------------------------------------------------- Modification de la quantité d'un produit

    let productModif = document.querySelectorAll(".itemQuantity");

    // Suite à un évènement au 'change' pour la modification de la quantité d'un article
    productModif[i].addEventListener("change", (m) => {
      m.preventDefault();

      // Enregistrer l'id et la couleur séléctionnés pour les modifs
      let modifQuantity = products[i].quantity;
      let modifValue = productModif[i].valueAsNumber;

      // Filtrer l'élément modifié Qty
      const resultFind = products.find(
        (mlt) => mlt.modifValue !== modifQuantity
      );

      // MAJ des données
      resultFind.quantity = modifValue;
      products[i].quantity = resultFind.quantity;

      // Envoyer les nouvelles données dans le localStorage
      localStorage.setItem("product", JSON.stringify(products));

      // Avertir de la modification et recharger la page
      alert(
        "La quantité à bien été modifiée, veuillez appuyer sur ok pour continuer."
      );

      //Actualisation de la page
      location.reload();
    });

    // ---------------------------------------------------------------------- Insertion quantitée finaux
    // ---------------------------------------------------------------------- Insertion prix finaux

    // Array
    let quantityTotalCalcul = [];
    let priceTotalCalcul = [];

    // Aller chercher les quantitées et les prix dans le panier
    for (let q = 0; q < products.length; q++) {
      // Les quantitées
      let quantityTotalCart = products[q].quantity;
      quantityTotalCalcul.push(quantityTotalCart);

      // Les prix finaux, le prix multiplié par la quantitée
      let priceTotalCart = products[q].price * products[q].quantity;
      priceTotalCalcul.push(priceTotalCart);
    }

    // Calculer les prix dans le panier
    const reducerQuantity = (accumulator, currentValue) =>
      accumulator + currentValue;
    const quantityTotal = quantityTotalCalcul.reduce(reducerQuantity);
    let finalQuantityChoice = document.querySelector("#totalQuantity");
    finalQuantityChoice.innerHTML = quantityTotal;

    // Calculer les quantitées dans le panier
    const reducerPrice = (accumulator, currentValue) =>
      accumulator + currentValue;
    const priceTotal = priceTotalCalcul.reduce(reducerPrice);
    let finalPriceChoice = document.querySelector("#totalPrice");
    finalPriceChoice.innerHTML = priceTotal;
  }
}
// getForm(); on y travaillera la ^prochaine fois

main();

// Etape 1 afficher un tableau recap des achats dans la page panier

/*
Tu vas utiliser le panier pour afficher les éléments
Tu as la fonction getBasket qui peut t'aider. En fait, tu récupères un tableau que tu parcours et que tu affiches.
Par contre pour le prix on aura besoin de faire un fetch.
Tu vas essayer avec le DOM d'afficher avec la partie commenter le texte HTML.
Pas besoin de lien pour atteindre le panier, il faut juste cliquer sur le bouton panier.
Cordialement.*/

/*
// on récupère le panier dans le local storage
function getBasket() {
  //On enregistre dans une var ce que l'on récupère afin de pouvoir le réutiliser
  let basket = localStorage.getItem("basket");
  //Par defaut, quand l'utilisateur est sur le site, le panier est vide, la valeur doit donc etre nul et renvoie vers un tableau vide
  if (basket == null) {
    return [];
    // sinon le panier existe et dans ce cas on récupère les données
  } else {
    return JSON.parse(basket);
  }
}
let basket = getBasket();

console.log(basket);

async function canapData(){
  fetch("http://localhost:3000/api/products")
    // fetch va effectuer une requête auprès de l'api dans le but de selectionner le bon produit
    .then(function (res) {
      return res.json();
    })
    .then(function (products) {
      console.log(products);
    })
    .catch(function (err) {
      console.log("err");
    });
}

// On parcourt le tableau et on va metre en place l'affiche

for (let product of basket){
  
  const article = document.createElement("article");

  article.setAttribute("class", "cart_item");
  article.setAttribute("data-id", "{product-ID}");
  article.setAttribute("data-color", "{product-color}");

  const div1 = document.createElement("div");
  const img = document.createElement("img");
  div1.setAttribute("class", "cart__item__img");
  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);

  const div2 = document.createElement("div");
  const div21 = document.createElement("div");
  const h2 = document.createElement("h2");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  div2.setAttribute("class", "cart__item__content");
  div21.setAttribute("class", "cart__item__content__description");
  h2.innerHTML = product.name;
  p1.innerHTML = product.color;
  p2.innerHTML = product.price;
   


  const div22 = document.createElement("div");
  div22.setAttribute("class", "cart__item__content__settings");

  const div221 = document.createElement("div");
  const p3 = document.createElement("p");
  const input = document.createElement("input");

  div221.setAttribute("class", "cart__item__content__settings__quantity");
  p3.innerHTML = product.quantity;
  input.setAttribute("type", "number");
  input.setAttribute("class", "itemQuantity");
  input.setAttribute("name", "itemQuantity");
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");
  input.setAttribute("value", "42");
  


  const div222 = document.createElement("div");
  const p4 = document.createElement("p");
  div222.setAttribute("class", "cart__item__content__settings__delete");
  p4.setAttribute("class", "deleteItem")
  p4.innerText = "Supprimer";

  document.getElementById("cart__items").appendChild(article);
  article.appendChild(div1, div2);
  div1.appendChild(img);
  div2.appendChild(div21, div22);
  div21.appendChild(h2, p1, p2);
  div22.appendChild(div221, div222);
  div221.appendChild(p3, input);
  div222.appendChild(p4);
}

/*
// On crée une fonction qui permet de récupérer les informations stockées via le getItem
// on transforme les données complexes en chaine dee caractères avec "JSON.parse()" pour la fonction get
function getBasket() {
  //On enregistre dans une var ce que l'on récupère afin de pouvoir le réutiliser
  let basket = localStorage.getItem("basket");
  //Par defaut, quand l'utilisateur est sur le site, le panier est vide, la valeur doit donc etre nul et renvoie vers un tableau vide
  if (basket == null) {
    return [];
    // sinon le panier existe et dans ce cas on récupère les données
  } else {
    return JSON.parse(basket);
  }
}


let basket = getBasket();

console.log(basket);


function removeFromBasket(product) {
  // On récupère le pannier
  let basket = getBasket();
  // on va faire un filter pour retirer un élément du panier. Comme le find, c'est une foncton qui va travailler sur un tableau. Elle va filtrer un tableau par rapport à une condition.
  //On filtre dans le panier s'il y a un produit dont l'id est différent de l'id du produit que je veux supprimer.
  basket = basket.filter((p) => p._id != product._id);
  //on selectione le produit dans le tableau via un evenement onclick
  //on le supprime
  saveBasket(basket);
}

// on utilise une boucle 'for' pour repeter la fonction à l'ensemble des élément du panier




/*function removeFromBasket(product) {
    // On récupère le pannier
    let basket = getBasket();
    // on va faire un filter pour retirer un élément du panier. Comme le find, c'est une foncton qui va travailler sur un tableau. Elle va filtrer un tableau par rapport à une condition.
    basket = basket.filter((p) => p._id != product._id);
    saveBasket(basket);
  }*/

/*
function changeQuantity(product, quantity) {
    let basket = getBasket();
    let foundProduct = basket.find((p) => p._id == product._id);
    if (foundProduct != undefined) {
      foundProduct.quantity += quantity;
      // pour ne pas avoir des quantités inférieures à 0, on utilise un if qui permet de vider le panier
      if (foundProduct.quantity <= 0) {
        removeFromBasket(foundProduct);
      } else {
        saveBasket(basket);
      }
    }
  }


// calculer la quantité total de produit
function getNumberProduct() {
    // On recupere le panier
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
      number += product.quantity;
    }
    // on retourne
    return number;
  }
  
  function getTotalPrice() {
    let basket = getBasket();
    let total = 0;
    for (let product of basket) {
      total += product.quantity * product.price;
    }
    // on retourne
    return total;
  }*/
