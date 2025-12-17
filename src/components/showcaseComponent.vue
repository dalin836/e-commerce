<template>
  <div class="newsletter-box bg-light p-4 rounded shadow-sm d-flex flex-column  ">
    <div class="text-section mb-3 mb-md-0 ">
      <h4 class="fw-bold">Don’t miss amazing <br> grocery deals</h4>
      <p class="text-muted mb-0">Sign up for the daily newsletter</p>
    </div>

    <div class="w-200px">
      <form @submit.prevent="subscribe" class="d-flex flex-column flex-sm-row align-items-center gap-2 ">
        <input
          v-model="email"
          type="email"
          class="form-control"
          placeholder="Your email address"
          required
        />
        <button type="submit" class="btn btn-success">
          Subscribe
        </button>
      </form>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');

function subscribe() {
  if (!email.value) return;
  alert(`Subscribed with: ${email.value}`);
  email.value = '';
}
</script>

<style scoped>
.newsletter-box {
  background-image: url('D:\VueJs\e-commerce\src\assets\image\fresh-apples-shopping-mesh-bag-with-branch-apples-removebg 1.png'); /* Optional background */
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 500px;
  background-color: palevioletred;


}
.form-control{
  width: 250px;
  margin-left: 40px;
}

.text-section{
  margin-top: 70px;
  margin-left: 40px;

}
h4{
  font-size: 50px;
}
</style>
