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

//................Cart button......................



const addCart = (product) => {
  //get addToCart then listen function of button
  document.getElementById("addToCart").addEventListener("click", (event) => {
    event.preventDefault();
    //get quantity value
    product.quantity = parseInt(document.getElementById("quantity").value);
    //get color value
    product.colors = document.getElementById("colors").value;
    //array of products
    let productArray = {
      _id: product._id,
      quantity: product.quantity,
      color: product.colors,
    };
    //Check if color or quantity isn't checked
    if (product.quantity <= 0 || product.colors == "") {
      return;
    }
    //Check if there is anything in local storage and add array of products inside
    let productTab = JSON.parse(localStorage.getItem("cart"));
    let cart = [];
    if (productTab == null) {
      localStorage.setItem("cart", JSON.stringify(product));
    } else {
      return cart;
    };
    // Check the product in cart if there is the same
    for ( let i=0; i < cart.length; i++){
      if(cart[i]._id === product._id && cart[i].color === product.colo){
        cart[i].quantity += product.quantity;
        return;
      };
    }
    
  });};

  

  
 