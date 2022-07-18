import * as index from "./index.js";

//Declare variables
let cartItems = index.getCart();

//Returning message for empty cart
function isEmptyCart() {
  if (cartItems.length === 0) {
    document.getElementsByClassName(
      "cart"
    )[0].innerHTML = `Votre panier est vide, veuillez choisir les articles de la page <a href="../html/index.html"> Accueil</a>`;
  }
}
isEmptyCart();
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
//create article
      const article = document.createElement('article');
    article.classList.add("cart__item");
    article.setAttribute('data-id', `${product._id}`);
    article.setAttribute('data-color', `${cartItem.color}`);
   items.appendChild(article);

//img div
   const imgDiv = document.createElement('div');
    imgDiv.classList.add("cart__item__img");
   article.appendChild(imgDiv);

   const img = document.createElement("img");
      img.src = `${product.imageUrl}`;
      img.alt = `${product.altTxt}`;
      imgDiv.appendChild(img);

      //cart div
      const cartDiv = document.createElement('div');
      cartDiv.classList.add("cart__item__content");
     article.appendChild(cartDiv); 


     //description cart div
     const descriptiontDiv = document.createElement('div');
      descriptiontDiv.classList.add("cart__item__content__description");
     cartDiv.appendChild(descriptiontDiv); 

     const h2 = document.createElement("h2");
      h2.innerText = `${product.name}`;
      descriptiontDiv.appendChild(h2);

      const p1 = document.createElement("p");
      p1.innerText = `${cartItem.color}`;
      descriptiontDiv.appendChild(p1);

      const p2 = document.createElement("p");
      p2.innerText = `${product.price} €`;
      descriptiontDiv.appendChild(p2);


      //setting cart div
      const settingDiv = document.createElement('div');
      settingDiv.classList.add("cart__item__content__settings");
     cartDiv.appendChild(settingDiv); 

     //quantity inside setting div
     const quantityDiv = document.createElement('div');
      quantityDiv.classList.add("cart__item__content__settings__quantity");
     settingDiv.appendChild(quantityDiv); 


     const p3 = document.createElement("p");
     p3.innerText = "Qté :  ";
     quantityDiv.appendChild(p3);

     const input = document.createElement("input");
     input.type = "number";
     input.classList.add("itemQuantity");
     input.name = "itemQuantity";
     input.min = "1";
     input.max ="100";
     input.value = `${cartItem.quantity}`;
     quantityDiv.appendChild(input);
     
     //delete div
     const deleteDiv = document.createElement('div');
     deleteDiv.classList.add("cart__item__content__settings__delete");
    settingDiv.appendChild(deleteDiv);

    const p4 = document.createElement("p");
     p4.classList.add("deleteItem");
     p4.innerText = "Supprimer";
     deleteDiv.appendChild(p4);

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
        console.log(err);
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
        removeItem.remove();
        isEmptyCart();
        //caculate new totalQuantity and new totalPrice
        caculateQuantity();
        caculatePrice();
      }
    });
  });
};

//.........................Submit form & send order..................

//Declare regex
const nameRegex = /^[a-zA-ZÀ-ÿ'-\s\]{2,}\s[a-zA-Z'-]{2,}$/; //start from the beginning of string untill the end, accept any name with a length of 2 characters or more, it include multiple name -name with ' - or - -and a space then the 2nd par of the name/ no numbers declared
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; //start from the beginning till end,all letters, number, characters like dots & - can be accepted in each part of email address, no space & special characters declared
const addressRegex = /^[A-Za-zÀ-ÿ0-9'-\s]{2,50}$/; //all letters & number, characters ' - and space from 0-50 characters
const cityRegex = /^[A-Za-z'0-9'-\s]{2,30}$/;

//declare errors = false
let errors = false;

//  function to check the regex and return msg
function checkRegex(input, regex, message) {
  let testRegex = regex.test(input.value);
  if (!testRegex) {
    document.getElementById(`${input.id}ErrorMsg`).innerHTML = message;
    errors = true;
  } else {
    document.getElementById(`${input.id}ErrorMsg`).innerHTML = "";
  }
}
//get parent and messages error
const form = document.querySelector(".cart__order__form");
const firstAndLastNameMessage =
  "Votre saisie n'est pas valide, veuillez saisir au moin 2 caractères. Les numéros ne sont pas acceptés.";
const cityMessage = "Veuillez saisir votre ville";
const addressMessage = "Veuillez saisir votre address";
const emailMessage =
  "Veuillez saisir votre email correctement. exp: abc@domain.com";

//submit form
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //declare infos of client get from forms
  let contact = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    address: form.address.value,
    city: form.city.value,
    email: form.email.value,
  };

  //get array of ids in cart
  let products = [];
  cartItems.forEach((item) => {
    products.push(item._id);
  });

  //reset errors = false
  errors = false;

  //call function to show message errs if forms aren't correctly filled
  checkRegex(form.firstName, nameRegex, firstAndLastNameMessage);
  checkRegex(form.lastName, nameRegex, firstAndLastNameMessage);
  checkRegex(form.address, addressRegex, addressMessage);
  checkRegex(form.city, cityRegex, cityMessage);
  checkRegex(form.email, emailRegex, emailMessage);

  //condition is check all forms are correctly fullfilled
  if (!errors) {
    //send client info & ids to serveur by POST
    fetch(`http://localhost:3000/api/products/order`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contact, products }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      //direct to confirmation page by using orderId, the goal is to show number of order
      .then((data) => {
        localStorage.clear();
        window.location.href = `./confirmation.html?orderId=${data.orderId}`;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
