// Fonction asynchrone qui contient une boucle d'évènement suivant :
async function main() {
  // Récuperer les données du localStorage
  // Renvoie les données de(s) l'ajout(s) d'un/des produit(s) sur cette page
  let products = JSON.parse(localStorage.getItem("basket"));
  //ici nous récupérons tous les produits
  async function kanapData() {
    let productList = await fetch("http://localhost:3000/api/products");
    return productList.json();
  }

  // L'opérateur logique NON (!...), amène le vrai au faux
  if (!products) {
    // Ajout d'un h1 si le panier est vide ("Votre panier est vide !!!")
    const titleCart = document.querySelector("h1");
    const sectionCart = document.querySelector(".cart");

    titleCart.innerHTML = "Votre panier est vide !!!";
    // On affiche pas la sectionCart si il y a pas de produit dans le panier
    sectionCart.style.display = "none";
  } else {
    // Récupérations des informations sur le/les produit(s)
    let apiProducts = await kanapData();

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
        localStorage.setItem("basket", JSON.stringify(products));

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
        localStorage.setItem("basket", JSON.stringify(products));

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





  let form = document.querySelector(".cart__order__form");

/*-------------------- PRENOM --------------------*/
  //Ecouter la modification du prenom
  form.firstName.addEventListener("change", function () {
    // On va appeler la fonction avec l'opérateur "this" pour quelle s'applique a l'input avec le "name" "Fist Name"
    validFirstName(this);
  });

  //On créé une fonction pour appliquer un regex et envoyer un message si la condition de celle-ci n'est pas respectée 
  const validFirstName = function (inputFirstName){
    let firstNameRegExp = new RegExp("^[a-zA-Z-]+$"
    );

    let testFirstName = firstNameRegExp.test(inputFirstName.value);
    console.log(testFirstName);

    let paragraphe = document.querySelector("#firstNameErrorMsg"); 
    if(testFirstName){
      paragraphe.innerHTML = "";
      return true;
    } else {
      paragraphe.innerHTML = "Prénom non valide";
      return false;
    }
  }

/*-------------------- NOM --------------------*/

//Ecouter la modification du Nom
form.lastName.addEventListener("change", function () {
  validLastName(this);
});

// valider le forma du nom
const validLastName = function(inputLastName) {
  // Creation de la reg exp pour validation du nom
  let lastNameRegExp = new RegExp("^[a-zA-Z-]+$"
  );

  let testLastName = lastNameRegExp.test(inputLastName.value);
  console.log(testLastName);
  let paragraphe = document.querySelector("#lastNameErrorMsg");

  if (testLastName) {
    paragraphe. innerHTML = "";
    return true;
  } else {
    paragraphe.innerHTML = "Nom non valide";
    return false;
  }
};

  /*-------------------- ADRESSE --------------------*/

  //Ecouter la modification de l'adresse
  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  // valider le forma de l'adresse
  const validAddress = function (inputAddress) {
    // Creation de la reg exp pour validation de l'adresse
    let addressRegExp = /^[0-9A-Za-z\s]*$/;
    console.log(inputAddress.value);

    let testAddress = addressRegExp.test(inputAddress.value);
    console.log(testAddress);
    let paragraphe = document.querySelector("#addressErrorMsg");

    if (testAddress) {
      paragraphe.innerHTML = "";
      return true;
    } else {
      paragraphe.innerHTML = "Adresse non valide";
      return false;
    }
  };
  /*-------------------- VILLE --------------------*/

  //Ecouter la modification de l'adresse
  form.city.addEventListener("change", function () {
    validCity(this);
  });

  // valider le forma de l'adresse
  const validCity = function (inputCity) {
    // Creation de la reg exp pour validation email
    let cityRegExp = new RegExp("^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$");
    

    let testCity = cityRegExp.test(inputCity.value);
    console.log(testCity);
    let paragraphe = document.querySelector("#cityErrorMsg");

    if (testCity) {
      paragraphe.innerHTML = "";
      return true;
    } else {
      paragraphe.innerHTML = "Ville non valide";
      return false;
    }
  };
  /*-------------------- EMAIL --------------------*/
  //Ecouter la modification de l'email
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  // valider le forma d'un email
  const validEmail = function (inputEmail) {
    // Creation de la reg exp pour validation email
    let emailRegExp = new RegExp(
      "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
      "g"
    );

    let testEmail = emailRegExp.test(inputEmail.value);
    console.log(testEmail);
    let paragraphe = document.querySelector("#emailErrorMsg");

    if (testEmail) {
      paragraphe.innerHTML = "";
      return true;
    } else {
      paragraphe.innerHTML = "Adresse mail non valide";
      return false;
    }
    
  };


  //ecouter la soumission du formulaire
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validFirstName && validLastName && validEmail && validAddress && validCity) {
     // form.submit();
     // Object contact envoyer les infos du formulaires
     const contact = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value
    }
    // Array: regroupe dans un tableau les deux éléments
    let products = [];
    // Mettre les données dans le localStorage nomé "product"
    let finalProduct = JSON.parse(localStorage.getItem("basket"));
    // Mettre les id dans le finalProduct
    for (let i = 0; i < finalProduct.length; i++) {
        products.push(finalProduct[i]._id);
    }

    // Mettre les valeurs du formulaire et les produits sélectionnés dans un objet
    const sendFormData = {
        contact,
        products,
    }
    const submitOrder = fetch("http://localhost:3000/api/products/order",{
    method: "POST",
    headers: {
      'Accept':'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sendFormData)
  }).then(res => res.json())
    .then(promise => {
        document.location.href = 'confirmation.html?id=' + promise.orderId;
    });

    console.log(submitOrder);
      console.log("prenom valide", sendFormData);
    };
  });
  
};
  main();


  //search params pour afficher le numéro de commande 
  // recupere l'id et l'afficher avec le search params
  // effacer le local storage
  // PLan de test


  

