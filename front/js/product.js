
//Get product's id from url 
const urlId = (new URL(window.location)).searchParams.get('id'); 

//gets product data from API to product page
fetch("http://localhost:3000/api/products/"+ urlId)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((product) => {
    //get title of page
    document.getElementsByTagName("title").innerText = `${product.name}`;
    //get class item__img
    document.querySelector(".item__img").innerHTML=`<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    //get id titile
    document.getElementById("title").innerText = `${product.name}`;
    //get id price
    document.getElementById("price").innerText =`${product.price}`;
    //get id description
    document.getElementById("description").innerText = `${product.description}`;
    //get color 
    product.colors.forEach((color) => {
        document.getElementById("colors").innerHTML +=`<option value="${color}">${color}</option>`;
      ;
    });
  })
  .catch((err) => {
    // Une erreur est survenue
    const item = document.getElementsByClassName("item");
    item.innerText = `Une erreur est survenu (${err})`;
  });
