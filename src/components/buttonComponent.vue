  <template>
  <button @click="shopNow(Titlepromotion)" class="shop-button" :style="{ backgroundColor: color }">
    {{ label }}
  </button>
</template>

<script lang="ts">
import type { PropType } from 'vue';

export default {
  name: 'ButtonCom',
  props: {
    label: {
      type: String,
      default: 'Shop Now',
    },
    color: {
      type: String,
      default: '#4CAF50',
    },
    Titlepromotion: {
      type: Object as PropType<{ titlepro: string }>,
      default: () => ({ title: 'Default Promotion' }),
    },
  },
  methods: {
    shopNow(Titlepromotion: { titlepro: string }) {
      alert("Let's shop: " + Titlepromotion.titlepro);
    },
  },
}
</script>

<style>
.shop-button {
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
