/* Via Fetch on effectue une requête auprès de l'API pour importer les données produits */

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    // On récupère les éléments au format JSON
    return res.json();
  })

  .then(function (products) {
    // le console.log permet de contrôler la récupération des données et de visualiser les objets dans la console.
    console.log(products);
    
    // Ensuite on créé une fonction avec qui va nous permettre de parcourir les données récupérées, via la fonction "for". = Pour chaque produit de ce tableau faire la fonction suivante:

    for (let product of products) {
      // la fonction est la suivante, on crée dans le DOM des balises.
      const a = document.createElement("a");
      const article = document.createElement("article");
      const img = document.createElement("img");
      const h3 = document.createElement("h3");
      const p = document.createElement("p");

      //On ajoute les attributs ou le contenu html
      img.setAttribute("src", product.imageUrl);
      img.setAttribute("alt", product.altTxt);
      p.setAttribute("class", "productDescription");
      p.innerHTML = product.description;
      h3.setAttribute("class", "productName");
      h3.innerHTML = product.name;
      a.setAttribute("href", `./product.html?id=${product._id}`);

      // on insère les éléments dans le DOM en définnassant les parents/enfants, donc leur position dans le DOM
      a.appendChild(article);
      article.appendChild(img);
      article.appendChild(h3);
      article.appendChild(p);
      document.getElementById("items").appendChild(a);
    }
  })
  // en cas d'erreur le catch signifie l'erreur et permet d'afficher un texte correspondant, cela signifie que le lien avec l'API n'a pas été effectué.
  .catch(function (err) {
    console.log("err");
  });

