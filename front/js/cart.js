//get cart, check if empty return array, if not read the cart
const getCart = () => {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
};

//Declare variables to avoid loop
let cartItems = getCart();
let html = "";
let totalPrice = 0;
let totalQuantity = 0;
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
      //caculate totalQuantity and totalPrice
      document.getElementById("totalQuantity").innerHTML = totalQuantity +=
        cartItem.quantity;

      document.getElementById("totalPrice").innerHTML = totalPrice +=
        product.price * cartItem.quantity;
    })
    .catch((err) => {
      // Une erreur est survenue
      const items = document.getElementById("cart__items");
      items.innerHTML = `Une erreur est survenu (${err})`;
    });
});
