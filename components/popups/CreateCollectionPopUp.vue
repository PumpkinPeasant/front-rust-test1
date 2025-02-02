<script setup lang="ts">
import {useTodoListStore} from "~/stores/useTodoListStore";
import {useCollectionStore} from "~/stores/useCollectionStore";

const collectionStore = useCollectionStore();
const router = useRouter();

const title = ref('')
const isActive = ref(false)

function closeDialog() {
  clear();
  isActive.value = false;
}

function clear() {
  title.value = '';
}

async function createCollection() {
  let id = await collectionStore.createCollection(title.value)
  closeDialog();
  // await router.push(`todo/${id}`);
}
</script>

<template>
  <v-dialog v-model="isActive" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          v-bind="activatorProps"
          prepend-icon="mdi-plus"
          variant="tonal">
        Create
      </v-btn>
    </template>

    <template v-slot:default>
      <v-card title="Create new collection">

        <v-card-text>
          <v-text-field
              @keydown.enter="createCollection"
              v-model="title"
              label="Collection name"
              variant="outlined"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="red"
              text="close"
              @click="closeDialog"
          ></v-btn>
          <v-btn
              variant="tonal"
              text="create"
              @click="createCollection"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>