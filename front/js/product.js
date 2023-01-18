const productId = new URL(window.location.href).searchParams.get("id");
//window.location.href permet de récupérer l'URL de la page courante
//searchParams.get() permet de retourner la première valeur associée au paramètre de recherche donné cad "id"

console.log(productId);


// on déclare un tableau vide
let productData = {};


fetch(`http://localhost:3000/api/products/${productId}`)
  // fetch va effectuer une requête auprès de l'api dans le but de selectionner le bon produit
  .then(function (res) {
    return res.json();
  })

  .then(function (detailsProduct) {
    console.log(detailsProduct);
    productData = detailsProduct;
    //on définit une variable "img" afin de créer une balise img dans le html. On lui attribut ensuite le lien et la description "alt" correspondante. Pour ensuite l'implémenter dans le html via le ciblage "queryselector", et l'outil pour l'incorporer "appenChild"
    const img = document.createElement("img");
    img.setAttribute("src", detailsProduct.imageUrl);
    img.setAttribute("alt", detailsProduct.altTxt);
    document.querySelector(".item__img").appendChild(img);

    // ici, pas besoin de créer une balise puisque le h1 est présent. On implémente directement le nonm du produit en le selectionnant puis l'implémentant via "textContent" + nom du tableau et enfin le nom de la clé correspondante.
    document.querySelector("#title").textContent = detailsProduct.name;

    document.querySelector("#price").textContent = detailsProduct.price;

    document.querySelector("#description").textContent =
      detailsProduct.description;

    // On définit une var color pour selectionenr l'id et réutiliser cette selection par la suite
    const color = document.querySelector("#colors");
    //On dit au tableau qu'on va appliquer une fonction pour chaque élément de la clé "colors"
    detailsProduct.colors.forEach((element) => {
      //on définit une variable 'option' pour créer une balise correspondante sur le DOM
      const option = document.createElement("option");
      //On définity aux attribut les valeurs correspondantes issues du tableau. Value pour la valeur correspondante, et texContent pour le nom associé à la valeur
      option.value = element;
      option.textContent = element;
      // On incrémente ensuite la balise "option" dans le DOM
      color.appendChild(option);
    });

    // Ajouter des produits dans le panier
    // Panier = array [id, quantité, la couleur]
    // Utiliser le local storage: permet de sauvegarder des données sous forrme de chaîne de caractère(paires clé/valeur)
    //
  })

  .catch(function (err) {
    console.log("err");
  });

//On créé une fonction qui va permettre d'enrgistrer des éléments dans le local storage via une clé et une valeur
// on transforme les données complexes en chaine dee caractères avec "JSON.stringify()"
// C'est objet "basket" ce qui est stocké dans le panier
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
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


// Fonction qui va permettre d'ajouter un élément au panier
// On ajoute une var product puisqu'on met un produit au panier. Permet de dire que c'est ce produit la qu'on veut ajouter au panier
function addBasket(product) {
  //On créé une var pour récuperer le panier situé dans le local storage en utilisant la fonction au dessus
  let basket = getBasket();
  //On cherche dans le panier si il y a un produit dont l'id = à l'id du produit que je veux ajouter.
  let foundProduct = basket.find((p) => p._id == product._id);
  // undefiened est la valeur null que renvoi find s'il ne trouve rien. Si il est different c'est qu'il existe déjà sinon
  if (foundProduct != undefined) {
    // Si il y a deja le même produit dans le panier on ajoute suelement une quantité
    foundProduct.quantity += product.quantity;
  } else {
    // sinon on ajoute le produit
    product.quantity = product.quantity;
    // Permet d'ajouter des produits. On peut matérialiser la var product comme un tableau, auquel on ajoute (push) un produit
    basket.push(product);
  }

  //Une fois qu'on a ajouté le produit on va enregistrer le panier
  saveBasket(basket);
}

//add event listener sur le bouton
//et quand on clique sur le bouton on appelle le add basket
const addToCart = document.getElementById("addToCart");

addToCart.addEventListener('click', function(){
  // on récupere la quantité et la couleur sélectionnée dans le html(pas dans le javascript)
  let selectColor = document.getElementById("colors");
  let selectQuantity = document.getElementById("quantity");
  
  // On créer une var pour transmettre les bonnes donnes tels que l'id, la couleur, et la quantité
  const product = {
    _id: productData._id,
    color: selectColor.value,
    quantity: Number(selectQuantity.value),
  };
  // Saisies des champs / quantité & la couleur
  if (selectQuantity.value == 0) {
    alert("Veuillez selectionner la quantité souhaitée.");
    return;
  }
  if (selectColor.value == 0) {
      alert("Veuillez renseigner la couleur de l'article.");
      return;
  }

  addBasket(product);
})



// comment relier les quantité au add event listener

