interface Category {
    id: number;
    ten: string;
    an_hien: boolean;
    anh: string
}

interface Product {
    id: number;
    ten: string;
    gia: number;
    so_luong: number;
    luot_mua: number;
    danh_muc_id: number;
    anh: string
}

interface Post {
    id: number;
    ten: string;
    luot_xem: number;
    an_hien: boolean;
    noi_dung: string;
    anh: string;
}
const categoriesContainer = document.getElementById("categories");
const productsContainer = document.querySelector(".product-grid"); 
const postsContainer = document.getElementById("posts");


const API_URL = "http://localhost:3000";

// Hàm hiển thị categories
function displayCategories(categories: Category[]) {
    if (categoriesContainer) {
        categoriesContainer.innerHTML = categories
            .filter(category => category.an_hien)
            .map(category => `
            
            <a href="" class="nav-link category-item swiper-slide">
            <img src="/images/${category.anh}" alt="Category Thumbnail">
            <h3 class="category-title">${category.ten}</h3>
          </a>
            
            
            `)
            .join("");
    }
}

// Hàm hiển thị products


function displayProducts(products: Product[]) {
  if (productsContainer) {
    productsContainer.innerHTML = products
      .map(
        product => `
          <div class="col">
            <div class="product-item">
              
             
              <figure>
                <a href="#" title="${product.ten}">
                  <img src="images/${product.anh}" alt="${product.ten}" class="tab-image">
                </a>
              </figure>
              <h3>${product.ten}</h3>
           
              <span class="price">${(product.gia).toLocaleString('vi')} VND</span>
              <div class="d-flex align-items-center justify-content-between">
                <div class="input-group product-qty">
                  <span class="input-group-btn">
                    <button type="button" class="quantity-left-minus btn btn-danger btn-number" data-type="minus">
                      <svg width="16" height="16">
                        <use xlink:href="#minus"></use>
                      </svg>
                    </button>
                  </span>
                  <input type="text" id="quantity-${product.id}" name="quantity" class="form-control input-number" value="1">
                  <span class="input-group-btn">
                    <button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus">
                      <svg width="16" height="16">
                        <use xlink:href="#plus"></use>
                      </svg>
                    </button>
                  </span>
                </div>
                <a href="#" class="nav-link">Add to Cart <iconify-icon icon="uil:shopping-cart"></iconify-icon></a>
              </div>
            </div>
          </div>
        `
      )
      .join("");
  }
}
// Hàm hiển thị posts
function displayPosts(posts: Post[]) {
    if (postsContainer) {
        postsContainer.innerHTML = `
            <div class="row">
              ${posts
                .filter(post => post.an_hien)
                .map(post => `
                  <div class="col-md-4">
                    <article class="post-item card border-0 shadow-sm p-3 mb-4">
                      <div class="image-holder zoom-effect">
                        <a href="#">
                          <img src="images/${post.anh}" alt="${post.ten}" class="card-img-top">
                        </a>
                      </div>
                      <div class="card-body">
                        <div class="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                          <div class="meta-date">
                            <svg width="16" height="16">
                              <use xlink:href="#calendar"></use>
                            </svg>22 Aug 2021
                          </div>
                          <div class="meta-categories">
                            <svg width="16" height="16">
                              <use xlink:href="#category"></use>
                            </svg>tips & tricks
                          </div>
                        </div>
                        <div class="post-header">
                          <h3 class="post-title">
                            <a href="#" class="text-decoration-none">${post.ten}</a>
                          </h3>
                          <p>${post.noi_dung}</p>
                        </div>
                      </div>
                    </article>
                  </div>
                `)
                .join("")}
            </div>
        `;
    }
}
// Hàm hiển thị sản phẩm bán chạy
function displayBestProducts(products: Product[]) {
    const bestProductsContainer = document.getElementById("bestProductsContainer");
    
    if (bestProductsContainer) {
        // Sắp xếp sản phẩm theo lượt mua giảm dần và lấy 5 sản phẩm bán chạy nhất
        const bestSellingProducts = products
            .sort((a, b) => b.luot_mua - a.luot_mua)
            .slice(0, 10);
        
        bestProductsContainer.innerHTML = bestSellingProducts
            .map(product => `
                <div class="product-item swiper-slide">
                    <span class="badge bg-success position-absolute m-3">-15%</span>
                    <a href="#" class="btn-wishlist"><svg width="24" height="24">
                        <use xlink:href="#heart"></use>
                    </svg></a>
                    <figure>
                        <a href="#" title="${product.ten}">
                            <img src="images/${product.anh}" class="tab-image">
                        </a>
                    </figure>
                    <h3>${product.ten}</h3>
                    <span class="qty">Lượt mua: ${product.luot_mua} </span>
                    
                    <span class="price">${(product.gia).toLocaleString('vi')} VND</span>
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="input-group product-qty">
                            <span class="input-group-btn">
                                <button type="button" class="quantity-left-minus btn btn-danger btn-number" data-type="minus">
                                    <svg width="16" height="16">
                                        <use xlink:href="#minus"></use>
                                    </svg>
                                </button>
                            </span>
                            <input type="text" id="quantity-${product.id}" name="quantity" class="form-control input-number" value="1">
                            <span class="input-group-btn">
                                <button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus">
                                    <svg width="16" height="16">
                                        <use xlink:href="#plus"></use>
                                    </svg>
                                </button>
                            </span>
                        </div>
                        <a href="#" class="nav-link">Add to Cart <iconify-icon icon="uil:shopping-cart"></iconify-icon></a>
                    </div>
                </div>
            `)
            .join("");
    }
}


// Hàm lấy dữ liệu từ JSON Server
async function fetchData<T>(endpoint: string): Promise<T[]> {
    const response = await fetch(`${API_URL}/${endpoint}`);
    const data = await response.json();
    return data;
}


  
  
// Hàm khởi động ứng dụng
async function init() {
    const categories = await fetchData<Category>("categories");
    const products = await fetchData<Product>("products");
    const posts = await fetchData<Post>("posts");

    displayCategories(categories);
    displayProducts(products);
    displayPosts(posts);
    displayBestProducts(products);
}

init();