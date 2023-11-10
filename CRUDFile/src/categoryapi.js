document.getElementById("searchBtn").addEventListener("click", buttonClicked);
var dataGlobal = []; // To store the data globally
// Fetch the list of all product types from the API
fetch('http://makeup-api.herokuapp.com/api/v1/products.json')
    .then((response) => response.json())
    .then((data) => {
        var productTypeList = document.getElementById('productTypeList');
        var allProductTypes = data.map(item => item.product_type);
        var uniqueProductTypes = allProductTypes.filter((value, index, self) => self.indexOf(value) === index);
        uniqueProductTypes.forEach(productType => {
            var option = document.createElement('option');
            option.text = productType;
            productTypeList.add(option);
        });
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
// The buttonClicked function with the product type functionality
function buttonClicked() {
    var productType = document.getElementById("productTypeList").value; // Fetch the product type
    var apiUrl = `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${productType}`;
    if (!productType) {
        console.error('Please provide a product type for the search.');
        return;
    }
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            dataGlobal = data;
            const productsPerPage = 12;
            const totalPages = Math.ceil(data.length / productsPerPage);
            const paginationContainer = document.getElementById("pagination");
            paginationContainer.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.innerText = i;
                button.addEventListener('click', function () {
                    displayPage(i, data);
                });
                paginationContainer.appendChild(button);
            }
            displayPage(1, data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}
function displayPage(pageNumber, data) {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = '';
    const productsPerPage = 12;
    const startIndex = (pageNumber - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, data.length);

    for (let i = startIndex; i < endIndex; i++) {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        const img = document.createElement('img');
        img.src = data[i].image_link;
        img.alt = data[i].name;
        img.classList.add('product-image');
        img.addEventListener('click', function () {
            showProductDetails(data[i]);
        });

        productItem.appendChild(img);
        productsContainer.appendChild(productItem);
    }
    // Show the pagination only on the display all products page
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.style.display = "flex";
}

function showProductDetails(product) {
    var productsContainer = document.getElementById("products");
    var searchContainer = document.getElementById("searchContainer");
    var productDetailsContainer = document.getElementById("productDetails");
    productsContainer.style.display = "none";
    searchContainer.style.display = "none";
    productDetailsContainer.style.display = "block";

    var productName = document.getElementById("productName");
    productName.textContent = product.name;

    var productDescription = document.getElementById("productDescription");
    productDescription.textContent = "Product Description: " + product.description;

    var productWebsite = document.getElementById("productWebsite");
    productWebsite.innerHTML = "Product Website: <a href='" + product.product_link + "' target='_blank'>" + product.product_link + "</a>";

    var relatedLink = document.getElementById("relatedLink");
    relatedLink.innerHTML = "Learn More: <a href='" + product.website_link + "' target='_blank'> " + product.website_link + "</a>";

    var productImage = document.getElementById("productImage");
    productImage.innerHTML = "<img src='" + product.image_link + "' alt='" + product.name + "' style='width: 200px; height: 200px;' />";

    // Hide the pagination on the display description page
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.style.display = "none";
}

function goBack() {
    var productsContainer = document.getElementById("products");
    var searchContainer = document.getElementById("searchContainer");
    var productDetailsContainer = document.getElementById("productDetails");
    productsContainer.style.display = "flex"; // Set display property back to flex
    searchContainer.style.display = "block";
    productDetailsContainer.style.display = "none";

    // Show the pagination again when going back to the display all products page
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.style.display = "flex";
}
