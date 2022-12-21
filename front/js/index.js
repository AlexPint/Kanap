/* La page d’accueil
Cette page présente l’ensemble des produits retournés par l’API.
Pour chaque produit, il faudra afficher l’image de celui-ci, ainsi que son nom et le début de
sa description.
En cliquant sur le produit, l’utilisateur sera redirigé sur la page du produit pour consulter
celui-ci plus en détail. */

/* Requête de l'API + récupération de la réponse */

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    return res.json();
  })
  .then(function (products) {
    console.log(products);

    for (let product of products) {
      const a = document.createElement("a");
      const article = document.createElement("article");
      const img = document.createElement("img");
      const h3 = document.createElement("h3");
      const p = document.createElement("p");

      img.setAttribute("src", product.imageUrl);
      img.setAttribute("alt", product.altTxt);
      
      p.setAttribute("class", "productDescription");
      p.innerHTML = product.description;
      h3.setAttribute("class", "productName");
      h3.innerHTML = product.name;
      a.setAttribute("href", `./product.html?id=${product._id}`);
      a.appendChild(article);
      article.appendChild(img);
      article.appendChild(h3);
      article.appendChild(p);
      document.getElementById("items").appendChild(a);
      }
    })
  // Boucle for of: Permet de parcourir le tableau et de créer une var pour chaque case du tableau afin de la manipuler directement
  // let product = new Products(jsonProduct);
  // document.querySelector("#items");

  .catch(function (err) {
    console.log("err");
  });

/* Parcourir la réponse dans le but d'insérer les éléments */

/* Insérer les éléments, chaques produits dans la page d'acceuil

- Utilisation de la boucle 'for'pour répéter las tâches et insérer l'ensemble des produits

*/

// parcourir le tablaue
