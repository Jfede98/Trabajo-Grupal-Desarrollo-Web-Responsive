/*Validacion del login, guardar mail en session storage*/
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Evita el envío normal del formulario

            const emailInput = document.getElementById("mail").value;

            if (emailInput) {
                sessionStorage.setItem("userEmail", emailInput); // Guarda el correo en sessionStorage
                window.location.href = "home.html"; // Redirige a la pantalla principal
            }
        });
    }
});

/*Mostrar el mail que se puso en el login en todo form que tenga id email*/
document.addEventListener("DOMContentLoaded", function () {
    const emailField = document.getElementById("email");
    const savedEmail = sessionStorage.getItem("userEmail");

    if (emailField && savedEmail) {
        emailField.value = savedEmail;
    }
});

/*Logout del usuario*/
document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logout");

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            sessionStorage.clear(); // Elimina todo el session y local Storage
            localStorage.clear();
            window.location.href = "login.html"; // Redirige al login
        });
    }
});
/* Llamada usando fetch de una API de maquillaje para buscar productos tipo bloqueador solar */
document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("productList");
  
    // Verificar si el contenedor de productos existe (página de catálogo)
    if (productList) {
      const apiUrl = "https://dummyjson.com/products";
      const pagination = document.getElementById("pagination");
      const page1Link = document.getElementById("page1");
      const page2Link = document.getElementById("page2");
      const prevPageLink = document.getElementById("prevPage");
      const nextPageLink = document.getElementById("nextPage");
  
      let currentPage = 1;
      let products = [];
  
      // Mostrar mensaje de carga
      productList.innerHTML = "<p>Cargando productos...</p>";
  
      // Obtener datos de la API
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data && data.products && data.products.length > 0) {
            products = data.products.filter(product => ["beauty", "fragrances"].includes(product.category));
            displayProducts(currentPage); // Mostrar la primera página
            setupPagination(); // Configurar la paginación
          } else {
            productList.innerHTML = "<p>No se encontraron productos.</p>";
          }
        })
        .catch(error => {
          console.error("Error al obtener los datos de la API:", error);
          productList.innerHTML = "<p>Error al cargar los productos. Inténtalo de nuevo más tarde.</p>";
        });
  
      // Función para mostrar los productos
      function displayProducts(page) {
        productList.innerHTML = ""; // Limpiar el contenedor
  
        const productsPerPage = 6;
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
  
        const productsToShow = products.slice(startIndex, endIndex);
  
        productsToShow.forEach(product => {  
          const productCard = `
            <div class="card m-3" style="width: 18rem;">
              <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" onerror="this.src='ruta/imagen-placeholder.jpg';">
              <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <h6 class="card-title">$${product.price}</h6>
                <p class="card-text">${product.description}</p>
                <button class="btn btn-primary add-to-cart" data-product='${JSON.stringify(product).replace(/'/g, "")}'>
                  Agregar al carrito
                </button>
              </div>
            </div>
          `;
          productList.innerHTML += productCard;
        });
  
        // Configurar los botones "Agregar al carrito" después de mostrar los productos
        setupAddToCartButtons();
      }
  
      // Función para configurar la paginación
      function setupPagination() {
        if (page1Link && page2Link && prevPageLink && nextPageLink) {
          page1Link.addEventListener("click", function (e) {
            e.preventDefault();
            currentPage = 1;
            displayProducts(currentPage);
            updatePaginationStyles();
          });
  
          page2Link.addEventListener("click", function (e) {
            e.preventDefault();
            currentPage = 2;
            displayProducts(currentPage);
            updatePaginationStyles();
          });
  
          prevPageLink.addEventListener("click", function (e) {
            e.preventDefault();
            if (currentPage > 1) {
              currentPage--;
              displayProducts(currentPage);
              updatePaginationStyles();
            }
          });
  
          nextPageLink.addEventListener("click", function (e) {
            e.preventDefault();
            if (currentPage < 2) {
              currentPage++;
              displayProducts(currentPage);
              updatePaginationStyles();
            }
          });
  
          // Actualizar estilos de la paginación
          updatePaginationStyles();
        }
      }
  
      // Función para actualizar los estilos de la paginación
      function updatePaginationStyles() {
        if (page1Link && page2Link) {
          page1Link.classList.remove("link-secondary");
          page2Link.classList.remove("link-secondary");
  
          if (currentPage === 1) {
            page1Link.classList.add("link-secondary");
          } else if (currentPage === 2) {
            page2Link.classList.add("link-secondary");
          }
        }
      }
  
      // Función para configurar los botones "Agregar al carrito"
      function setupAddToCartButtons() {
        const addToCartButtons = document.querySelectorAll(".add-to-cart");
  
        addToCartButtons.forEach(button => {
          button.addEventListener("click", function () {
            const product = JSON.parse(button.getAttribute("data-product"));
            addToCart(product);
          });
        });
      }
  
      // Función para agregar un producto al carrito
      function addToCart(product) {
        // Obtener los productos actuales del carrito
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
        // Agregar el nuevo producto al carrito
        cartItems.push(product);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
        // Mostrar toast de éxito
        const toast = new bootstrap.Toast(document.getElementById("successToast"));
        toast.show();
      }
    }
  });
  
/* Simulación de un carrito de compras */
document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cartItems");
    const emptyCartMessage = document.getElementById("emptyCartMessage");
    const totalItemsElement = document.getElementById("totalItems");
    const totalPriceElement = document.getElementById("totalPrice");
    const checkoutButton = document.getElementById("checkoutButton");
  
    // Verificar si los elementos del carrito existen (página de carrito)
    if (cartItemsContainer && emptyCartMessage && totalItemsElement && totalPriceElement && checkoutButton) {
      // Obtener los productos del carrito desde localStorage
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
      // Mostrar los productos en el carrito
      function displayCartItems() {
        if (cartItems.length === 0) {
          emptyCartMessage.classList.remove("d-none"); // Mostrar mensaje de carrito vacío
          cartItemsContainer.classList.add("d-none"); // Ocultar la lista de productos
          checkoutButton.disabled = true; // Deshabilitar el botón de finalizar compra
        } else {
          emptyCartMessage.classList.add("d-none"); // Ocultar mensaje de carrito vacío
          cartItemsContainer.classList.remove("d-none"); // Mostrar la lista de productos
          checkoutButton.disabled = false; // Habilitar el botón de finalizar compra
  
          // Limpiar el contenedor de productos
          cartItemsContainer.innerHTML = "";
  
          // Mostrar cada producto en el carrito
          cartItems.forEach((item, index) => {
            const productCard = `
              <div class="row mb-4 d-flex justify-content-between align-items-center">
                <div class="col-md-2 col-lg-2 col-xl-2">
                  <img src="${item.thumbnail}" class="img-fluid rounded-3" alt="${item.title}">
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                  <h6 class="text-muted">${item.category}</h6>
                  <h6 class="mb-0">${item.title}</h6>
                </div>
                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                  <h6 class="mb-0">$ ${item.price}</h6>
                </div>
              </div>
              <hr class="my-4">
            `;
            cartItemsContainer.innerHTML += productCard;
          });
  
          // Actualizar el total de productos y el precio total
          updateCartSummary();
        }
      }
  
      // Actualizar el resumen del carrito
      function updateCartSummary() {
        const totalItems = cartItems.length;
        const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  
        totalItemsElement.textContent = totalItems;
        totalPriceElement.textContent = `$ ${totalPrice.toFixed(2)}`;
      }
  
      // Mostrar los productos al cargar la página
      displayCartItems();
    }
  });
  