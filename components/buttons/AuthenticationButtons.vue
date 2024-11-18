<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PocketBase from 'pocketbase';
import { useRouter } from 'vue-router';

const router = useRouter()
const pb = new PocketBase('http://127.0.0.1:8090'); // Initialize PocketBase
const isLoggedIn = ref(false);
const loading = ref(true); // Add loading state

// Check authentication status on component mount
onMounted(async () => {
  try {
   // Check if the auth store is valid
    const isValid = pb.authStore.isValid;
    isLoggedIn.value = isValid; // Set logged-in status based on validity
    console.log('Is user logged in:', isValid);
  } catch (error) {
    console.error('Error checking authentication status:', error);
  } finally {
    loading.value = false; // Set loading to false after check
  }
});
const handleLogout = async () => {
  try {
    pb.authStore.clear(); // Clear the auth store
    isLoggedIn.value = false; // Update login status
    console.log('User logged out successfully.');
    router.push('/');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
</script>

<template>
  <div class="flex items-center justify-center q-gutter-sm margin q-mr-sm">
    <q-btn unelevated color="white" text-color="black" label="Agza Bol" to="/register" v-if="!isLoggedIn && !loading"></q-btn>
    <q-btn outline color="white" label="Gir" to="/login" v-if="!isLoggedIn && !loading"></q-btn>
    <q-btn outline color="white" label="Cyk" to="/" @click="handleLogout" v-if="isLoggedIn && !loading"></q-btn>

    <!-- Optional: Show a loading indicator -->
    <q-spinner v-if="loading" color="primary" />
  </div>
</template>

<style scoped>
/* Add any styles you need here */
</style>
