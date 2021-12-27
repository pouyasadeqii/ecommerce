// cart--------------------------
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// open cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};
// close cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// cart working js
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// making function 
function ready() {
  // remove item from cart
  let removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  // quantity changes
  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // add  cart
  let addCart = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  // buy button work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}
// Buy Button
function buyButtonClicked() {
  alert("Your Order Is Placed");
  let cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  let count = document.querySelector(".count");
  count.innerText = 0 ;
  count.style.display = "none";
  updateTotal();
}

// remove item from cart
function removeCartItem(event) {
  let buttonClicked = event.target;
  // console.log(event.target)
  buttonClicked.parentElement.remove();
  let count = document.querySelector(".count").innerText;
  let oldCount = parseInt(count);
  let newCount = oldCount - 1;
  document.querySelector(".count").innerText = newCount;
  if (newCount == 0 ) {
    document.querySelector(".count").style.display = "none"
  }
  updateTotal();
}

// quantityChanged
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}
// add to cart
function addCartClicked(event) {
  let button = event.target;
  let shopProducts = button.parentElement;
  let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  let price = shopProducts.getElementsByClassName("price")[0].innerText;
  let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  let count = document.querySelector(".count");
  count.style.display = "inline-block";
  let countVal = count.innerText;
  let oldCount = parseInt(countVal);
  let newCount = oldCount + 1;
  document.querySelector(".count").innerText = newCount;
  
  
  // console.log(title , price , productImg);
  addProductToCart(title, price, productImg);
  updateTotal();
}
function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  let cartItem = document.getElementsByClassName("cart-content")[0];
  let cartItemsNames = cartItem.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You Have Already Add This Item To Cart");
      let count = document.querySelector(".count").innerText;
      let oldCount = parseInt(count);
      let newCount = oldCount - 1;
      document.querySelector(".count").innerText = newCount;
      return;
    }
  }
  let cartBoxContent = `
<img src="${productImg}" alt="" class="cart-img">
<div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
</div>
<!-- remove cart -->
<i class="bx bxs-trash-alt cart-remove"></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItem.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

// Update total
function updateTotal() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  // ifprice contain some cent value
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
