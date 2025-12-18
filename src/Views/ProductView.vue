<template>
  <div class="product-detail">
    <!-- Include Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">

    <div class="container my-5">
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <a href="#" @click.prevent="goTo('category')">Vegetables & tubers</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Seeds of Change Organic
          </li>
        </ol>
      </nav>

      <div class="row">
        <!-- Product Images -->
        <div class="col-md-5">
          <div class="product-image-section">
            <!-- Main Image -->
            <div class="main-image mb-3">
              <i class="bi bi-search position-absolute top-0 end-0 m-3 fs-5 text-muted"></i>
              <img :src="selectedImage" :alt="product.name" class="img-fluid rounded">
            </div>

            <!-- Thumbnail Images -->
            <div class="d-flex gap-2 thumbnail-list">
              <div
                v-for="(image, index) in product.images"
                :key="index"
                class="thumbnail"
                :class="{ active: selectedImage === image }"
                @click="selectedImage = image"
              >
                <img :src="image" :alt="`Thumbnail ${index + 1}`" class="img-fluid rounded">
              </div>
            </div>
          </div>
        </div>

        <!-- Product Details -->
        <div class="col-md-7">
          <div class="product-info">
            <!-- Category Badge -->
            <span class="badge bg-success-subtle text-success mb-2">{{ product.category }}</span>

            <!-- Product Title -->
            <h2 class="product-title mb-3">{{ product.name }}</h2>
            <p>ID: {{ $route.params.id }}</p>


            <!-- Rating -->
            <div class="rating mb-3">
              <i
                v-for="star in 5"
                :key="star"
                class="bi"
                :class="star <= product.rating ? 'bi-star-fill text-warning' : 'bi-star text-muted'"
              ></i>
              <span class="text-muted ms-2">({{ product.reviewCount }})</span>
            </div>

            <!-- Price -->
            <div class="price mb-3">
              <span class="current-price text-success fs-3 fw-bold">${{ product.price }}</span>
              <span class="old-price text-muted text-decoration-line-through ms-2">${{ product.oldPrice }}</span>
            </div>

            <!-- Description -->
            <p class="text-muted mb-4">{{ product.description }}</p>

            <!-- Quantity & Add to Cart -->
            <div class="d-flex gap-3 mb-4">
              <div class="input-group quantity-selector" style="max-width: 150px;">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  @click="decreaseQuantity"
                  :disabled="quantity <= 1"
                >
                  -
                </button>
                <input
                  v-model.number="quantity"
                  type="number"
                  class="form-control text-center"
                  min="1"
                >
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  @click="increaseQuantity"
                >
                  +
                </button>
              </div>
              <button class="btn btn-success px-4" @click="addToCart">
                <i class="bi bi-bag"></i> Add To Cart
              </button>
            </div>

            <!-- Product Meta -->
            <div class="product-meta">
              <p class="mb-2">
                <span class="text-muted">Vendor:</span>
                <strong class="ms-2">{{ product.vendor }}</strong>
              </p>
              <p class="mb-0">
                <span class="text-muted">SKU:</span>
                <strong class="ms-2">{{ product.sku }}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Tabs -->
      <div class="row mt-5">
        <div class="col-12">
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                :class="{ active: activeTab === 'description' }"
                @click="activeTab = 'description'"
                type="button"
              >
                Description
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                :class="{ active: activeTab === 'additional' }"
                @click="activeTab = 'additional'"
                type="button"
              >
                Additional Info
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                :class="{ active: activeTab === 'reviews' }"
                @click="activeTab = 'reviews'"
                type="button"
              >
                Reviews ({{ product.reviewCount }})
              </button>
            </li>
          </ul>

          <div class="tab-content p-4 border border-top-0">
            <!-- Description Tab -->
            <div v-show="activeTab === 'description'" class="tab-pane">
              <p>{{ product.fullDescription }}</p>
            </div>

            <!-- Additional Info Tab -->
            <div v-show="activeTab === 'additional'" class="tab-pane">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td class="fw-bold">Weight</td>
                    <td>{{ product.weight }}</td>
                  </tr>
                  <tr>
                    <td class="fw-bold">Dimensions</td>
                    <td>{{ product.dimensions }}</td>
                  </tr>
                  <tr>
                    <td class="fw-bold">Origin</td>
                    <td>{{ product.origin }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Reviews Tab -->
            <div v-show="activeTab === 'reviews'" class="tab-pane">
              <h5>Customer Reviews</h5>
              <p class="text-muted">No reviews yet. Be the first to review this product!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const productId = ref(route.params.id);

watch(
  () => route.params.id,
  (newId) => {
    productId.value = newId;
  }
);

const quantity = ref(1);
const activeTab = ref('description');
const selectedImage = ref('https://images.unsplash.com/photo-1553279768-865429fa0078?w=500');

const product = ref({

  name: 'Seeds of Change Organic Quinoa, Brown',
  category: 'VEGETABLES',
  price: 38,
  oldPrice: 42,
  rating: 5,
  reviewCount: 5,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu nulla consequat enim mauris non urna. Duis, quam odio minim ipsum tempus ligula lorem auguen. Officia delectus niame duis sed. Vulputate, consectetur hac!',
  fullDescription: 'Uninhibited carnally hired played in whimpered dear gorilla koala depending and much yikes off far quetzal goodness and from for grimaced goodness unaccountably and meadowlark near unblushingly crucial scallop tightly neurotic hungrily some and dear furiously this apart. Spluttered narrowly yikes left moth in yikes bowed this that grizzly much hello on spoon-fed that alas rethought much decently richly and wow against the frequent fluidly at formidable acceptably flapped besides and much circa far over the bucolically hey precarious goldfinch mastodon goodness gnashed a jellyfish and one however because.',
  vendor: 'farmery',
  sku: 'ZU49VGR',
  weight: '1kg',
  dimensions: '10 x 10 x 15 cm',
  origin: 'USA',
  images: [
    'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500',
    'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=200',
    'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=200',
    'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=200',
    'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200'
  ]
});

function increaseQuantity() {
  quantity.value++;
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

function addToCart() {
  console.log('Adding to cart:', {
    product: product.value.name,
    quantity: quantity.value,
    price: product.value.price
  });
  alert(`Added ${quantity.value} item(s) to cart!`);
}

function goTo(page: string) {
  console.log('Navigate to:', page);
}
</script>

<style scoped>
.product-detail {
  background: #f8f9fa;
  min-height: 100vh;
  padding: 20px 0;
}

.breadcrumb {
  background: transparent;
  padding: 0;
}

.breadcrumb-item a {
  color: #6c757d;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  color: #16a34a;
}

.main-image {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.main-image img {
  max-height: 400px;
  object-fit: contain;
  width: 100%;
}

.thumbnail-list {
  overflow-x: auto;
}

.thumbnail {
  min-width: 80px;
  width: 80px;
  height: 80px;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
}

.thumbnail:hover {
  border-color: #16a34a;
}

.thumbnail.active {
  border-color: #16a34a;
  box-shadow: 0 2px 8px rgba(22, 163, 74, 0.3);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-title {
  font-size: 28px;
  font-weight: 700;
  color: #212529;
}

.current-price {
  font-size: 32px;
}

.old-price {
  font-size: 20px;
}

.quantity-selector input {
  border-left: none;
  border-right: none;
}

.quantity-selector input::-webkit-outer-spin-button,
.quantity-selector input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.quantity-selector input[type=number] {
  -moz-appearance: textfield;
}

.nav-tabs .nav-link {
  color: #6c757d;
  border: none;
  border-bottom: 3px solid transparent;
  padding: 12px 24px;
}

.nav-tabs .nav-link:hover {
  color: #16a34a;
}

.nav-tabs .nav-link.active {
  color: #16a34a;
  border-bottom-color: #16a34a;
  background: transparent;
}

.tab-content {
  background: white;
  border-radius: 0 0 8px 8px;
}
</style>
