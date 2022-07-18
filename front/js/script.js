fetch("http://localhost:3000/api/products")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((products) => {
    products.forEach((product) => {
      const a = document.createElement("a");
      a.href = `./product.html?id=${product._id}`;
      document.getElementById("items").appendChild(a);

      const article = document.createElement("article");
      a.appendChild(article);

      const img = document.createElement("img");
      img.src = `${product.imageUrl}`;
      img.alt = `${product.altTxt}`;
      article.appendChild(img);

      const h3 = document.createElement("h3");
      h3.classList.add("productName");
      h3.innerText = `${product.name}`;
      article.appendChild(h3);

      const p = document.createElement("p");
      p.classList.add("productDescription");
      p.innerText = `${product.description}`;
      article.appendChild(p);
    });
  })
  .catch((err) => {
    // Une erreur est survenue
    const items = document.getElementById("items");
    items.innerHTML = `Une erreur est survenu (${err})`;
  });
