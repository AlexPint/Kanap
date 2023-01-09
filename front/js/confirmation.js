/*
const orderNumber = new URL(window.location.href).searchParams.get("id");

const orderId = document.getElementById("orderID");

orderId.innerHTML = orderNumber;
*/

const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const orderId = document.getElementById("orderId");
orderId.innerHTML = id;

localStorage.clear();
