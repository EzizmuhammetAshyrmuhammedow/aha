<template>
  <div>
    <h1>{{ thread.title }}</h1>
    <p v-html="thread.body"></p> <!-- Assuming there is a content field -->
    <p>Author: {{ thread.expand?.author_id?.username || 'Unknown' }}</p>
    <p>Created at: {{ new Date(thread.created).toLocaleString() }}</p>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');
const route = useRoute();
const thread = ref({});

const fetchThread = async () => {
  try {
    const response = await pb.collection('threads').getOne(route.params.id, {
      expand: 'author_id', // Adjust based on your relationship field
    });
    thread.value = response;
  } catch (error) {
    console.error('Error fetching thread:', error);
  }
};

onMounted(() => {
  fetchThread();
});
</script>

<style scoped>
/* Add your styles here */
</style>
