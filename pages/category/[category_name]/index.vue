<template>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PocketBase from 'pocketbase';
import { useRoute } from 'vue-router';

const pb = new PocketBase('http://127.0.0.1:8090');
const route = useRoute();
const categoryName = route.params.category_name; // Get the category name from the route
const items = ref([]); // To store items related to the category

const fetchItemsByCategory = async () => {
  try {
    const records = await pb.collection('categories').getFullList({
      filter: `category_name="${categoryName}"`, // Adjust based on your actual field name
    });
    items.value = records.items; // Store fetched items
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

onMounted(() => {
  fetchItemsByCategory();
});
</script>
