<template>
  <div class="search-box-component">
    <!-- Include Bootstrap CSS in your layout -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">

    <!-- Header -->
    <div class="header-top bg-white py-3 shadow-sm">
      <div class="container">
        <div class="row align-items-center">
          <!-- Logo -->
          <div class="col-md-2">
            <div class="logo">
              <div class="logo-icon">🍈</div>
              <div class="logo-text">
                <h1>Melon</h1>
                <p>MART & GROCERY</p>
              </div>
            </div>
          </div>

          <!-- Search Box -->
          <div class="col-md-6">
            <div class="input-group search-box">
              <select v-model="category" class="form-select" style="max-width: 200px;">
                <option value="all">All Categories</option>
                <option value="fruit">Fresh Fruit</option>
                <option value="vegetables">Vegetables</option>
                <option value="meat">Meat & Seafood</option>
                <option value="bakery">Bakery</option>
                <option value="beverages">Beverages</option>
              </select>
              <input
                v-model="keyword"
                type="text"
                class="form-control"
                placeholder="Search for items..."
                @keyup.enter="doSearch"
              >
              <button class="btn btn-danger" type="button" @click="doSearch">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>

          <!-- Top Icons -->
          <div class="col-md-4">
            <div class="d-flex justify-content-end align-items-center gap-3">
              <button class="btn btn-outline-danger">
                <i class="bi bi-person"></i> Account
              </button>
              <button class="btn btn-link text-dark">
                <i class="bi bi-bar-chart"></i> Compare
              </button>
              <button class="btn btn-link text-dark">
                <i class="bi bi-heart"></i> Wishlist
              </button>
              <button class="btn btn-link text-dark position-relative">
                <i class="bi bi-cart"></i> Cart
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {{ cartCount }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Menu -->

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto">
            <li
              v-for="item in menuItems"
              :key="item.name"
              class="nav-item"
              :class="{ active: activeMenu === item.name }"
            >
              <a
                class="nav-link"
                href="#"
                @click.prevent="setActiveMenu(item.name)"
              >
                {{ item.label }}
                <i v-if="item.hasDropdown" class="bi bi-chevron-down"></i>
              </a>
            </li>
          </ul>
          <div class="phone-info text-success fw-bold">
            <i class="bi bi-telephone"></i> 1900 - 8888
            <small class="d-block text-muted fw-normal" style="font-size: 10px;">24/7 Support Center</small>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const category = ref('all');
const keyword = ref('');
const activeMenu = ref('Vegetables');
const cartCount = ref(3);

const menuItems = ref([
  { name: 'Browse', label: 'Browse All Categories', hasDropdown: true },
  { name: 'HotDeals', label: 'Hot Deals', hasDropdown: false },
  { name: 'Home', label: 'Home', hasDropdown: false },
  { name: 'Food', label: 'Food', hasDropdown: true },
  { name: 'Vegetables', label: 'Vegetables', hasDropdown: true },
  { name: 'Drink', label: 'Drink', hasDropdown: false },
  { name: 'Cookies', label: 'Cookies', hasDropdown: false },
  { name: 'Meat', label: 'Meat & Seafood', hasDropdown: true },
  { name: 'Bakery', label: 'Bakery', hasDropdown: false }
]);

function doSearch() {
  console.log('Searching:', { category: category.value, keyword: keyword.value });
  // You can use router here if needed:
  // router.push({
  //   name: 'Search',
  //   query: { category: category.value, keyword: keyword.value }
  // });
  alert(`Searching for: ${keyword.value} in ${category.value}`);
}

function setActiveMenu(menuName: string) {
  activeMenu.value = menuName;
}
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}

.logo-text h1 {
  color: #16a34a;
  font-size: 24px;
  margin: 0;
}

.logo-text p {
  color: #666;
  font-size: 10px;
  margin: 0;
  letter-spacing: 1px;
}

.search-box {
  border: 3px solid #dc2626;
  border-radius: 8px;
  overflow: hidden;
}

.search-box .form-select,
.search-box .form-control {
  border: none;
  box-shadow: none;
}

.search-box .form-select {
  border-right: 2px solid #e5e5e5;
}

.search-box .btn {
  border: none;
  border-radius: 0;
}

.nav-item.active .nav-link {
  color: #16a34a;
  border-bottom: 3px solid #16a34a;
}

.nav-link:hover {
  color: #16a34a;
}

.phone-info {
  font-size: 18px;
}
</style>
