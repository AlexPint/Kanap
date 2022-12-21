// Etape 1 afficher un tableau recap des achats dans la page panier 
// on récupère le panier dans le local storage
let basket = getBasket();
// On parcourt le tableau
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
  div21.appendChild(h2, p1, P2);
  div22.appendChild(div221, div222);
  div221.appendChild(p3, input);
  div222.appendChild(p4);
}


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
  }
  