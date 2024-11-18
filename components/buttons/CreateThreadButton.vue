<template>
  <q-btn unelevated color="green" label="Doret" @click="showModal = true"></q-btn>
  <q-dialog v-model="showModal">
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6">Konu Oluşturacağınız Kategoriyi Seçiniz</div>
        <q-input
            v-model="searchQuery"
            dense
            outlined
            placeholder="Kategori ara..."
        />
      </q-card-section>
      <q-card-section>
        <q-list bordered separator>
          <q-item
              clickable
              v-for="category in filteredCategories"
              :key="category.id"
              :to="`/category/${category.category_name}/post-thread`"
          >
            <q-item-section>
              <q-item-label>{{ category.category_name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="showModal = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import PocketBase from 'pocketbase'

// Define interfaces for our data structures
interface Category {
  id: string
  category_name: string
  collectionId: string
  collectionName: string
  created: string
  updated: string
}

// Create typed refs
const pb = new PocketBase('http://127.0.0.1:8090')
const showModal = ref(false)
const categories = ref<Category[]>([])
const searchQuery = ref('')

// Type the async function
const fetchCategories = async (): Promise<void> => {
  try {
    const records = await pb.collection('categories').getFullList<Category>()
    categories.value = records
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

// Type the computed property
const filteredCategories = computed<Category[]>(() => {
  if (!categories.value || categories.value.length === 0) {
    return []
  }

  if (!searchQuery.value) {
    return categories.value
  }

  return categories.value.filter(category =>
      category.category_name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})


onMounted(() => {
  fetchCategories()
})
</script>
