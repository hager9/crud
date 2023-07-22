var productsContainer = [];
checkLocalStorage();

var mainIndex = 0;

function addProduct() {
  var product = {
    name: document.getElementById("productName").value,
    price: document.getElementById("productPrice").value,
    category: document.getElementById("productCategory").value,
    desc: document.getElementById("productDesc").value,
  };

  if (
    validateProductName(product.name, /^[A-Z][a-zA-z0-9_]{2,}$/) &&
    validateProductPrice(product.price, /^[1-9][0-9]{2,}$/)
  ) {
    if (document.getElementById("addProduct").innerHTML == "Add Product") {
      productsContainer.push(product);
    } else {
      productsContainer.splice(mainIndex, 1, product);
      document.getElementById("addProduct").innerHTML = "Add Product";
    }

    localStorage.setItem("products", JSON.stringify(productsContainer));
    displayProducts();
    resetInput();
  } else {
    alert(
      `product name should start with uppercase letter and made up of at least 3 letters
        product price shoud start with number from 1 to 9 and made up of at least 3 numbers
        `
    );
  }
}

function displayProducts() {
  var box = "";
  for (var i = 0; i < productsContainer.length; i++) {
    box += `<tr>
      <td>${i}</td>
      <td>${productsContainer[i].name}</td>
      <td>${productsContainer[i].price}</td>
      <td>${productsContainer[i].category}</td>
      <td>${productsContainer[i].desc}</td>
      <td>
        <button class="btn btn-outline-warning text-warning" onclick="patchValues(${i})">Update</button>
      </td>
      <td>
        <button class="btn btn-outline-danger text-danger" onclick="deleteProduct(${i})">Delete</button>
      </td>
    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = box;
}

function resetInput() {
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productCategory").value = "";
  document.getElementById("productDesc").value = "";
}

function checkLocalStorage() {
  if (localStorage.getItem("products") != null) {
    productsContainer = JSON.parse(localStorage.getItem("products"));
    displayProducts();
  }
}

function deleteProduct(productIndex) {
  productsContainer.splice(productIndex, 1);
  displayProducts(productsContainer);
  localStorage.setItem("products", JSON.stringify(productsContainer));
}

function patchValues(productIndex) {
  mainIndex = productIndex;
  document.getElementById("productName").value =
    productsContainer[productIndex].name;
  document.getElementById("productPrice").value =
    productsContainer[productIndex].price;
  document.getElementById("productCategory").value =
    productsContainer[productIndex].category;
  document.getElementById("productDesc").value =
    productsContainer[productIndex].desc;
  document.getElementById("addProduct").innerHTML = "Update Product";
}

function searchProduct() {
  var search = document.getElementById("searchInput").value;
  var box = "";

  for (var i = 0; i < productsContainer.length; i++) {
    if (
      (
        productsContainer[i].name +
        productsContainer[i].price +
        productsContainer[i].category +
        productsContainer[i].desc
      )
        .toLowerCase()
        .includes(search.toLowerCase())
    ) {
      box += `<tr>
      <td>${i}</td>
      <td>${productsContainer[i].name}</td>
      <td>${productsContainer[i].price}</td>
      <td>${productsContainer[i].category}</td>
      <td>${productsContainer[i].desc}</td>
      <td>
        <button class="btn btn-outline-warning text-warning" onclick="patchValues(${i})">Update</button>
      </td>
      <td>
        <button class="btn btn-outline-danger text-danger" onclick="deleteProduct(${i})">Delete</button>
      </td>
    </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = box;
}

function validateProductName(name, pattern) {
  return pattern.test(name);
}
function validateProductPrice(price, pattern) {
  return pattern.test(price);
}
