<script setup lang="js">
import PocketBase from 'pocketbase';
import { ref, onMounted } from 'vue';
import CreateThreadButton from "~/components/buttons/CreateThreadButton.vue";

const pb = new PocketBase('http://127.0.0.1:8090');
const threads = ref([]);

const fetchThreads = async () => {
  try {
    const response = await pb.collection('threads').getList(1, 30, {
      expand: 'author_id'
    });
    threads.value = response.items;
  } catch (error) {
    console.error('Error fetching threads:', error);
  }
};

const getAvatarUrl = (thread) => {
  if (thread.expand?.author_id?.avatar) {
    return pb.getFileUrl(thread.expand.author_id, thread.expand.author_id.avatar);
  }
  return null;
};

onMounted(() => {
  fetchThreads();
});
</script>

<template>
  <div class="flex items-center justify-between q-px-sm">
    <SortThreadsDropdown/>
    <CreateThreadButton/>
  </div>
  <q-list bordered separator class="q-mx-sm">
    <q-item
        v-for="thread in threads"
        :key="thread.id"
        clickable
        v-ripple
        :to="`/article/${thread.id}`"
    >
      <q-item-section avatar>
        <q-avatar color="purple">
          <template v-if="getAvatarUrl(thread)">
            <q-img
                :src="getAvatarUrl(thread)"
                spinner-color="white"
                style="height: 100%; width: 100%"
            />
          </template>
          <template v-else>
            {{ thread.expand?.author_id?.username?.[0] || 'U' }}
          </template>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ thread.title }}</q-item-label>
        <div class="row items-center q-gutter-xs">
          <q-item-label caption lines="1">{{ thread.expand?.author_id?.username || 'Unknown User' }}</q-item-label>
          <span>·</span>
          <q-item-label caption lines="1">{{ new Date(thread.created).toLocaleString() }}</q-item-label>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>
