<template>
  <div class="fullscreen flex justify-center items-center">
    <q-card class="my-card q-pa-md" flat bordered>
      <q-card-section>
        <h2 class="text-h6 text-center q-mb-md">Agza Bol</h2>
        <q-form class="q-gutter-md" @submit.prevent="handleSignup">
          <q-input
            outlined
            v-model="username"
            label="Ulanyjy Adynyz"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Bos goyma']"
          />

          <q-input
            outlined
            type="text"
            v-model="email"
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
            v-model="password"
            label="Kodunyz"
            lazy-rules
            :rules="[
              (val) => !!val || 'Kod gerekli',
              (val) => val.length >= 8 || 'Kod azyndan 8 simwoldan durmaly',
            ]"
          />

          <!-- Display messages -->
          <div v-if="errorMessage" class="text-negative">
            {{ errorMessage }}
          </div>
          <div v-if="successMessage" class="text-positive">
            {{ successMessage }}
          </div>

          <div class="q-mt-md">
            <q-btn
              label="Submit"
              type="submit"
              color="primary"
              class="full-width"
            />
            <q-btn
              label="Reset"
              type="reset"
              color="grey"
              flat
              class="full-width q-mt-sm"
            />
          </div>
          <q-separator></q-separator>
          <q-btn label="Sign Up with Google" color="white" class="text-black" unelevated @click="loginWithGoogle">
            <GoogleIcon style="width: 2rem"/>
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import PocketBase from 'pocketbase';
import { useRouter } from 'vue-router';

const router = useRouter();

const pb = new PocketBase('http://127.0.0.1:8090');

const username: Ref<string> = ref('');
const password: Ref<string> = ref('');
const email: Ref<string> = ref('');
const errorMessage: Ref<string | null> = ref(null);
const successMessage: Ref<string | null> = ref(null);

// Function to handle user signup
const handleSignup = async () => {
  try {
    const data = {
      username: username.value,
      email: email.value,
      emailVisibility: true, // Assuming this is a required field
      password: password.value,
      passwordConfirm: password.value, // Assuming this is needed for confirmation
      name: username.value, // Optional field if needed
    };
    await pb.collection('users').create(data);
    await pb.collection('users').authWithPassword(email.value, password.value)
    successMessage.value = 'Signup successful!'; // Set success message
    errorMessage.value = null; // Clear any previous error messages
    await router.push('/');
  } catch (error: unknown) { // Specify the type as unknown
    if (error instanceof Error) {
      // Check if it's a standard Error object
      errorMessage.value = error.message || 'An unexpected error occurred.';
    } else {
      // Handle other types of errors if necessary
      errorMessage.value = 'An unknown error occurred.';
    }
    successMessage.value = null; // Clear any previous success messages
  }
};


const loginWithGoogle = async () => {
  try {
    await pb.collection('users').authWithOAuth2({provider: 'google'});
    await router.push('/');
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Login Error:', error.message); // Log detailed error message
      errorMessage.value = error.message || 'An unexpected error occurred.';
    } else {
      console.error('Unknown Error:', error); // Log unknown errors
      errorMessage.value = 'An unknown error occurred.';
    }
    successMessage.value = null; // Clear any previous success messages
  }}

</script>

<style scoped>
.my-card {
  width: 400px; /* Set a fixed width for the card */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}
</style>
