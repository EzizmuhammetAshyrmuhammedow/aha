<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue'

let tab: Ref = ref('Taze Mowzuklar');
</script>

<template>
  <div class="q-mt-xl q-mb-sm row items-center justify-start"> <!-- to prevent toolbar overlap the Tabs -->
    <q-tabs v-model="tab">
      <q-tab name="Taze Mowzuklar" icon="mail" label="Taze Mowzuklar" />
      <q-tab name="Taze Habarlar" icon="mail" label="Taze Habarlar" />
      <q-tab name="Jogapsyz soraglar" icon="mail" label="Jogapsyz soraglar" />
    </q-tabs>
  </div>
</template>

<style scoped></style>
