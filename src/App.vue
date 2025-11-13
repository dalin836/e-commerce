<template>
  <div id="app">
    <h2>Categories</h2>
    <div class="category-list">
      <CategoryCom
        v-for="(cat, index) in categories"
        :key="index"
        :image="cat.image"
        :title="cat.name"
        :items="cat.productCount"
      />
    </div>

    <h2>Promotions</h2>
    <div class="Promo-list">
      <PromotionCom
        v-for="(promo, index) in promotions"
        :key="index"
        :title="promo.title"
        :image="promo.image"
        :buttonLabel="promo.buttonLabel"
        :buttonColor="promo.buttonColor"
        :backgroundColor="promo.backgroundColor"
        :titlepro="promo.title"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CategoryCom from './components/categoryComponents.vue'
import PromotionCom from './components/promotionComponent.vue'

interface Category {
  productCount: number
  image: string
  name: string
}

interface Promotion {
  title: string
  image: string
  buttonLabel: string
  buttonColor: string
  backgroundColor: string
}

export default defineComponent({
  name: 'App',
  components: { CategoryCom, PromotionCom },

  data() {
    return {
      categories: [] as Category[],
      promotions: [] as Promotion[],
    }
  },
  methods: {
   async fetchCategories() {
  try {
    const response = await fetch('http://localhost:3000/api/categories')
    const rawData: Category[] = await response.json()

    this.categories = rawData.map(cat => ({
      ...cat,
      image: `http://localhost:3000/${cat.image.replace(/\\/g, '/')}`, // ✅ fix path
    }))
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
  },
    async fetchPromotions() {
      try {
        const response = await fetch('http://localhost:3000/api/promotions')
        const data: Promotion[] = await response.json()
        this.promotions = data.map(promo => ({
          ...promo,
          image: `http://localhost:3000/${promo.image.replace(/\\/g, '/')}`, // ✅ fix path
        }))
      } catch (error) {
        console.error('Error fetching promotions:', error)
      }
    },
  },
  mounted() {
    this.fetchCategories()
    this.fetchPromotions()
  },
})
</script>


<style>
#app {
  padding: 20px;
  font-family: Arial, sans-serif;
  margin-bottom: 10px;
}

h2 {
  margin-bottom: 10px;
  color: #d6dcdd;
}

.category-list {
  display: flex;
  gap: 15px;
  margin-bottom: 40px;
}
.Promo-list {
  display: flex;

  gap: 15px;
  margin-top: 40px;
}
</style>
