import * as index from "./index.js"

//Declare variables
let cartItems = index.getCart();
let html = "";

//Returning message for empty cart
if (cartItems.length === 0) {
  document.getElementById(
    "cart__items"
  ).innerHTML = `Votre panier est vide, veuillez choisir les articles de la page <a href="../html/index.html"> Accueil</a>`;
}
//for each cartItem, get id and the rest

cartItems.forEach((cartItem) => {
  fetch(`http://localhost:3000/api/products/${cartItem._id}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((product) => {
      const items = document.getElementById("cart__items");

      //visual of product in cart
      html += `<article class="cart__item" data-id="${product._id}" data-color="${cartItem.color}">
      <div class="cart__item__img">
        <img src="${product.imageUrl}" alt="${product.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.name}</h2>
          <p>${cartItem.color}</p>
          <p>${product.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté :  </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItem.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
      items.innerHTML = html;

      //appelle update function
      updateQuantity();
      deleteItem();
    })
    .catch((err) => {
      // Une erreur est survenue
      const items = document.getElementById("cart__items");
      items.innerHTML = `Une erreur est survenu (${err})`;
    });
});
//Caculate quantity
const caculateQuantity = () => {
  let totalQuantity = 0;
  cartItems.forEach((cartItem) => {
    document.getElementById("totalQuantity").innerHTML = totalQuantity +=
      cartItem.quantity;
  });
};
caculateQuantity();

//caculate prices
const caculatePrice = () => {
  let totalPrice = 0;
  cartItems.forEach((cartItem) => {
    fetch(`http://localhost:3000/api/products/${cartItem._id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((product) => {
        document.getElementById("totalPrice").innerHTML = totalPrice +=
          product.price * cartItem.quantity;
      })
      .catch((err) => {
        cartItemsElement.innerHTML = `Une erreur est survenue: ${err}`;
      });
  });
};
caculatePrice();

//.............Update & delete product from cart.............

//modify quantity of product

const updateQuantity = () => {
  //Get all ItemQuantity element and set for each of them
  const itemQuantities = document.querySelectorAll(".itemQuantity");
  itemQuantities.forEach((itemQty) => {
    //listen to each of itemquanity
    itemQty.addEventListener("change", (event) => {
      event.preventDefault();
      //find node that match :class cart__item
      let changeQuantity = itemQty.closest(".cart__item");

      //Doublecheck if products found in cart and set id & color of modified product to the same one
      const productFound = cartItems.find(
        (item) =>
          item._id == changeQuantity.dataset.id &&
          item.color == changeQuantity.dataset.color
      );
  
      // if it's found in cart, return new number of quantity to value
      if (productFound) {
        productFound.quantity = parseInt(itemQty.value);
        //Add new info to local storage
        localStorage.setItem("cart", JSON.stringify(cartItems));
        //caculate new totalQuantity and new totalPrice
        caculateQuantity();
        caculatePrice();
      }
    });
  });
};

//delete product from cart
const deleteItem = () => {
  //get deleteItem buttons and set function to each of them
  const deleteButtons = document.querySelectorAll(".deleteItem");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      //get class cart__item
      let removeItem = deleteButton.closest(".cart__item");
      //find item which is correspond with actionned item
      const productFound = cartItems.find(
        (i) =>
          i._id == removeItem.dataset.id && i.color == removeItem.dataset.color
      );
      //if found
      if (productFound) {
        //keep the rest of objet in array and delete the actionned item
        cartItems = cartItems.filter((i) => i !== productFound);
        //det new change to local storage
        localStorage.setItem("cart", JSON.stringify(cartItems));
        //reload auto the page
        location.reload();
        //caculate new totalQuantity and new totalPrice
        caculateQuantity();
        caculatePrice();
        
      }
    });
  });
};
