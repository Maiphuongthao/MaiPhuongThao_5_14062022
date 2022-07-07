//Get product's id from url
const orderId = new URL(window.location).searchParams.get("orderId");

//incase there is orderId print it orelse sendback to homepage
if (orderId) {
  document.getElementById("orderId").innerHTML = orderId;
} else {
  window.location.href = "./index.html";
}
