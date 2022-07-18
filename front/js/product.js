import * as index from "./index.js";
//Get product's id from url
const urlId = new URL(window.location).searchParams.get("id");

//gets product data from API to product page
fetch("http://localhost:3000/api/products/" + urlId)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((product) => {
    //get title of page
    document.getElementsByTagName("title").innerText = `${product.name}`;
    //get class item__img
    const img = document.createElement('img');
    img.src = `${product.imageUrl}`;
    img.alt = `${product.altTxt}`;
    document.querySelector(
      ".item__img").appendChild(img);
    
    //get id titile
    document.getElementById("title").innerText = `${product.name}`;
    //get id price
    document.getElementById("price").innerText = `${product.price}`;
    //get id description
    document.getElementById("description").innerText = `${product.description}`;
    //get color
    product.colors.forEach((color) => {
      const colorChoices = document.createElement("option");
      colorChoices.setAttribute("value", `${color}`);
      colorChoices.innerText = `${color}`;
      document.getElementById("colors").appendChild(colorChoices);
    });
    addCart(product);
  })
  .catch((err) => {
    // Une erreur est survenue
    const item = document.getElementsByClassName("item")[0];
    item.innerText = `Une erreur est survenu (${err})`;
  });

//................Cart button......................

const addCart = (product) => {
  //get addToCart then listen to click
  document.getElementById("addToCart").addEventListener("click", (event) => {
    event.preventDefault();
    //get quantity value
    product.quantity = parseInt(document.getElementById("quantity").value);
    //get color value
    product.color = document.getElementById("colors").value;
    //get array of new product
    let productArray = {
      _id: product._id,
      quantity: product.quantity,
      color: product.color,
    };

    //check color is chosen
    if (product.color == "") {
      document.getElementById("colors").style.borderColor = "red";
      alert("Veuillez choisir une couleur");
      return;
    }
    //Check quantity is less than 100 and higher than 0
    if (product.quantity <= 0 || product.quantity > 100) {
      document.getElementById("quantity").style.borderColor = "red";
      alert("La quantité doit être supérieure à 0 et inférieure à 100");
      return;
    }

    //Get cart to localstorage and return addable if there isn't anything
    let cart = index.getCart();
    //Function find item id/color & new product array id/ color are the same
    const productFound = cart.find(
      (item) => item._id == productArray._id && item.color == productArray.color
    );

    //If found, change the quantity by adding new chosen quantity
    if (productFound) {
      productFound.quantity += productArray.quantity;
    } //if not add the newproduct to cart
    else {
      cart.push(productArray);
    }
    //add cart to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produit ajouté au panier");
  });
};
