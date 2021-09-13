// load data 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    // image error
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product">

      <div>
      <img class="product-image" src="${image}">
      </div>
      <h4 class="my-3">${product.title}</h4>
      <p>Category: ${product.category}</p>
      <h6 class="my-4">Rating: ${product.rating.rate} - (${product.rating.count} reviews)</h6>
      <h4>Price: $${product.price}</h4>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn text-light btn-dark rounded-pill fs-5 mt-3">Add to Cart</button>
      
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  // total update error 
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function

const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  // 2 decimal precision 
  document.getElementById(id).innerText = (total).toFixed(2);
};

// set innerText function

const setInnerText = (id, value) => {
  // 2 decimal precision 
  document.getElementById(id).innerText = (value).toFixed(2);
};

// update delivery charge and total Tax

const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function

const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
};
