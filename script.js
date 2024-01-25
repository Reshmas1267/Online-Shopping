
async function fetchData() {
    try {
      const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
      const data = await response.json();
      return data.categories;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  
  function displayProducts(categoryName) {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = ''; 
  
    fetchData().then(categories => {
      const selectedCategory = categories.find(category => category.category_name === categoryName);
      if (selectedCategory) {
        selectedCategory.category_products.forEach(product => {
          const productCard = createProductCard(product);
          productContainer.appendChild(productCard);
        });
      }
    });
  }
  
  
  function createProductCard(product) {
    const discount = calculateDiscount(product.price, product.compare_at_price);
  
    const card = document.createElement('div');
    card.classList.add('product-card');
  
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;
    card.appendChild(img);
  
    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = product.title;
    card.appendChild(title);
  
    const vendor = document.createElement('div');
    vendor.classList.add('vendor');
    vendor.textContent = `Vendor: ${product.vendor}`;
    card.appendChild(vendor);
  
    const price = document.createElement('div');
    price.classList.add('price');
    price.textContent = `Price: $${product.price}`;
    card.appendChild(price);
  
    const comparePrice = document.createElement('div');
    comparePrice.classList.add('compare-price');
    comparePrice.textContent = `Compare at Price: $${product.compare_at_price}`;
    card.appendChild(comparePrice);
  
    if (product.badge_text) {
      const badge = document.createElement('div');
      badge.classList.add('badge');
      badge.textContent = product.badge_text;
      card.appendChild(badge);
    }
  
    const percentOff = document.createElement('div');
    percentOff.classList.add('percent-off');
    percentOff.textContent = `Save ${discount}%`;
    card.appendChild(percentOff);
  
   
    const addToCartBtn = document.createElement('button');
    addToCartBtn.classList.add('add-to-cart-btn');
    addToCartBtn.textContent = 'Add to Cart';
    card.appendChild(addToCartBtn);
  
    return card;
  }
  
  
  function calculateDiscount(price, compareAtPrice) {
    const priceFloat = parseFloat(price);
    const compareAtPriceFloat = parseFloat(compareAtPrice);
  
    if (compareAtPriceFloat && compareAtPriceFloat > priceFloat) {
      const discount = ((compareAtPriceFloat - priceFloat) / compareAtPriceFloat) * 100;
      return Math.round(discount);
    }
  
    return 0;
  }
  
  
  document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const categoryName = tab.textContent.trim();
        displayProducts(categoryName);
      });
    });
  });
  