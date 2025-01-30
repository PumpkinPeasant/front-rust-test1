<script setup lang="ts">

import Collection from "~/components/profile/Collection.vue";
import CreateCollectionPopUp from "~/components/popups/CreateCollectionPopUp.vue";
import {useTodoListStore} from "~/stores/useTodoListStore";
import {useCollectionStore} from "~/stores/useCollectionStore";

const collectionStore = useCollectionStore();

async function getAllCollections() {
  await collectionStore.getAllCollections();
}

onBeforeMount(() => {
  getAllCollections();
})
</script>

<template>
  <div class="pa-5">
    <v-card class="mb-5 d-flex align-center ">
      <v-card-title>
        <v-avatar color="white">U</v-avatar>
        Username
      </v-card-title>
    </v-card>
    <v-card class="mb-5">
      <v-card-title class="d-flex align-center justify-space-between">
        My collections
        <create-collection-pop-up/>
      </v-card-title>
      <v-divider class="mx-4"/>
      <collection v-for="(collection, index) in collectionStore.collections"
                  :key="index"
                  :data="collection"/>
    </v-card>
    <v-card>
      <v-card-title>My Sugar Bags</v-card-title>
    </v-card>
  </div>
</template>

<style scoped>

</style>