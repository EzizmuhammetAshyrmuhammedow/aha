<template>
  <q-page padding class="bg-dark">
    <q-card flat bordered class="bg-dark q-dark">
      <q-card-section>
        <!-- Title input -->
        <q-input
            v-model="title"
            outlined
            label="Konu başlığı"
            class="q-mb-md"
            dark
            bg-color="dark"
        />

        <!-- Tab selection -->
        <div class="row q-gutter-sm q-mb-md">
          <q-btn
              :color="activeTab === 'post' ? 'primary' : 'grey-9'"
              @click="activeTab = 'post'"
              label="Konu"
              flat
          />
          <q-btn
              :color="activeTab === 'preview' ? 'primary' : 'grey-9'"
              @click="activeTab = 'preview'"
              label="Makale"
              flat
          />
        </div>

        <!-- Quasar Editor -->
        <q-editor
            v-model="body"
            :toolbar="[
            ['bold', 'italic', 'strike', 'underline'],
            ['align', 'unordered', 'ordered'],
            ['link', 'undo', 'redo']
          ]"
            dark
            min-height="200px"
        />

        <!-- Options section -->
        <div class="row items-center q-gutter-sm q-mt-md">
          <q-checkbox
              v-model="notifyReplies"
              label="Yanıtlanınca bildir"
              dark
              color="primary"
          />
          <q-checkbox
              v-model="lockTopic"
              label="Büyük harf"
              dark
              color="primary"
          />
        </div>

        <!-- Submit button -->
        <div class="row justify-end q-mt-md">
          <q-btn color="primary" label="Konu oluştur" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import PocketBase from "pocketbase";

const pb = new PocketBase('http://127.0.0.1:8090');
const $q = useQuasar()

onMounted(() => {
  $q.dark.set(true)
})

const title = ref('')
const body = ref('')
const activeTab = ref('post')
const notifyReplies = ref(false)
const lockTopic = ref(false)


</script>
