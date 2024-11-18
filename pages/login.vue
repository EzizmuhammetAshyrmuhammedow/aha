<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router'; // Import useRouter here
import GoogleIcon from "~/components/icons/GoogleIcon.vue";

const authStore = useAuthStore();
const router = useRouter(); // Use useRouter here

const handleLogin = async () => {
  const success = await authStore.login(); // Call login and check success
  if (success) {
    await router.push('/'); // Redirect only on successful login
  }
};

const loginWithGoogle = async () => {
  const success = await authStore.loginWithGoogle(); // Call Google login and check success
  if (success) {
    await router.push('/'); // Redirect only on successful login
  }
};
</script>

<template>
  <div class="fullscreen flex justify-center items-center">
    <q-card class="my-card q-pa-md" flat bordered>
      <q-card-section>
        <h2 class="text-h6 text-center q-mb-md">Hasabyna Gir</h2>
        <q-form class="q-gutter-md" @submit.prevent="handleLogin">
          <q-input
              outlined
              type="text"
              v-model="authStore.email"
              label="E-poctanyz"
              lazy-rules
              :rules="[
              (val) => !!val || 'E-poctanyzy yazyn',
              (val) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
                'E-pocta nadogry yazylan',
            ]"
          />

          <q-input
              outlined
              type="password"
              v-model="authStore.password"
              label="Kodunyz"
              lazy-rules
              :rules="[
              (val) => !!val || 'Kod gerekli',
              (val) => val.length >= 8 || 'Kod azyndan 8 simwoldan durmaly',
            ]"
          />

          <!-- Display messages -->
          <div v-if="authStore.errorMessage" class="text-negative">
            {{ authStore.errorMessage }}
          </div>
          <div v-if="authStore.successMessage" class="text-positive">
            {{ authStore.successMessage }}
          </div>

          <div class="q-mt-md">
            <q-btn label="Submit" type="submit" color="primary" class="full-width" />
            <q-btn label="Reset" type="reset" color="grey" flat class="full-width q-mt-sm" />
          </div>
          <q-separator></q-separator>
          <q-btn label="Google bilen gir" color="white" class="text-black" unelevated @click="loginWithGoogle">
            <GoogleIcon style="width: 2rem"/>
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.my-card {
  width: 400px; /* Set a fixed width for the card */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}
</style>
