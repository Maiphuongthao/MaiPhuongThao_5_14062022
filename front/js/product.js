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
    document.querySelector(
      ".item__img"
    ).innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    //get id titile
    document.getElementById("title").innerText = `${product.name}`;
    //get id price
    document.getElementById("price").innerText = `${product.price}`;
    //get id description
    document.getElementById("description").innerText = `${product.description}`;
    //get color
    product.colors.forEach((color) => {
      document.getElementById(
        "colors"
      ).innerHTML += `<option value="${color}">${color}</option>`;
    });
    addCart(product);
  })
  .catch((err) => {
    // Une erreur est survenue
    const item = document.getElementById("item");
    item.innerText = `Une erreur est survenu (${err})`;
  });

//................Cart bouton......................

const addCart = (products) => {
  //get addToCart then listen function of button
  document.getElementById("addToCart").addEventListener("click", (event) => {
    event.preventDefault();
    //get quantity value
    products.quantity = parseInt(document.getElementById("quantity").value);
    //get color value
    products.colors = document.getElementById("colors").value;
    //array of products
    let productArray = {
      _id: products._id,
      quantity: products.quantity,
      color: products.colors,
    };
    //Check if color or quantity isn't checked
    if (products.quantity <= 0 || products.colors == "") {
      return;
    }
    //Check if there is anything in local storage and add array of products inside
    let productTab = JSON.parse(localStorage.getItem("cart"));
    if (productTab == null) {
      let cart = "";
      localStorage.setItem("cart", JSON.stringify(products));
    };
    // Check the product in cart if there is the same
    
  });};

  
 