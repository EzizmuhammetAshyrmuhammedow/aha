<script setup lang="ts">
import { ref } from 'vue'

const selectedLabel = ref('In Taze')

const options = [
  'In Taze',
  'In Meshur',
  'In Kone'
]

const selectOption = (option: string) => {
  selectedLabel.value = option
}
</script>

<template>
  <q-btn-dropdown dense flat :label="selectedLabel" class="q-ma-sm">
    <q-list style="min-width: 150px">
      <q-item
        v-for="option in options"
        :key="option"
        clickable
        v-close-popup
        @click="selectOption(option)"
      >
        <q-item-section avatar>
          <q-icon
            v-if="option === selectedLabel"
            name="check"
            color="primary"
            size="xs"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ option }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<style scoped></style>
