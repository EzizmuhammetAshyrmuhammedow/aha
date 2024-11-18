<template>
  <q-layout view="lHh Lpr lFf">
    <QuasarToolbar />

    <q-page-container class="q-p-none q-mt-lg" style="padding: 0">
     <slot/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { QuasarToolbar } from "#components";
import { SpeedInsights } from "@vercel/speed-insights/nuxt"

defineOptions({
  name: 'MainLayout'
});
</script>
