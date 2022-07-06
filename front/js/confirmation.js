//Get product's id from url
const orderId = new URL(window.location).searchParams.get("orderId");

if (orderId) {
  document.getElementById("orderId").innerHTML = orderId;
} else {
  window.location.href = "./index.html";
}
