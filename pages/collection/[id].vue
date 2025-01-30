<script setup lang="ts">
import {useRouter} from "vue-router";
import {useCollectionStore} from "~/stores/useCollectionStore";
import SugarBagCard from "~/components/general/SugarBagCard.vue";
import BackButton from "~/components/UI/BackButton.vue";

const collectionStore = useCollectionStore();
const router = useRouter()

const id = ref(router.currentRoute._value.params.id);

onMounted(() => {
  collectionStore.getCollection(id.value);
})
</script>

<template>
  <div class="pa-5">
    <v-card class="pa-4">
      <v-card-title class="d-flex align-center ga-2">
        <back-button/>
        {{ collectionStore.currentCollection.name }}
      </v-card-title>
      <sugar-bag-card
          :id="sugarBag"
          v-for="(sugarBag, index) in collectionStore.currentCollection.sugarBags"
                      :key="index"/>
    </v-card>
  </div>
</template>

<style scoped>

</style>