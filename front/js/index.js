//get cart, check if empty return array, if not read the cart
export const getCart = () => {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
      return [];
    } else {
      return JSON.parse(cart);
    }
  };