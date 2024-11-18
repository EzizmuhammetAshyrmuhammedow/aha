<script setup lang="ts">
import AuthenticationButtons from "~/components/buttons/AuthenticationButtons.vue";
import SearchButton from "~/components/buttons/SearchButton.vue";
</script>

<template>
  <div class="q-pb-xl"> <!-- to prevent toolbar overlap the Tabs -->
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-btn unelevated dense label="Maglumatym" :ripple="false" to="/"/>
        </q-toolbar-title>
        <AuthenticationButtons />
        <SearchButton />
      </q-toolbar>
    </q-header>
  </div>
</template>
