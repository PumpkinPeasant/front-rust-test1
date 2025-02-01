<script setup lang="ts">
import ItemSlider from "~/components/general/ItemSlider.vue";
import {useSugarBagsStore} from "~/stores/useSugarBagsStore";
import Collection from "~/components/profile/Collection.vue";
import {useCollectionStore} from "~/stores/useCollectionStore";
import SugarBagCard from "~/components/general/SugarBagCard.vue";

const sugarBagsStore = useSugarBagsStore();
const collectionStore = useCollectionStore();

const sugarBagsPage = ref();

async function getSugarBagsPage() {
  sugarBagsPage.value = await sugarBagsStore.getSugarBagsPage();
}

async function getAllCollections() {
  await collectionStore.getAllCollections();
}

onBeforeMount(() => {
  getSugarBagsPage();
  getAllCollections();
})

</script>

<template>
  <v-container class="mt-2">
    <v-row class="d-flex align-center justify-space-between ga-2 mb-2">
      <v-text-field placeholder="Search" variant="outlined" rounded hide-details/>
      <v-btn variant="text" icon="mdi-tune"/>
    </v-row>
    <v-row class="mb-2">
      <v-card style="width: 100%">
        <v-card-title>🔥Trending</v-card-title>
        <v-card-subtitle>Most popular items in 30 days</v-card-subtitle>
        <v-card-text>
          <item-slider :data="sugarBagsPage">
            <template #slider-item="{ item }">
              <sugar-bag-card :id="item.modelId"/>
            </template>
          </item-slider>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="mb-2">
      <v-card style="width: 100%">
        <v-card-title>⭐Collections</v-card-title>
        <v-card-subtitle>User's custom collections</v-card-subtitle>
        <v-card-text>
          <item-slider :data="collectionStore.collections">
            <template #slider-item="{ item }">
              <collection :data="item"/>
            </template>
          </item-slider>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row>
      <v-card style="width: 100%">
        <v-card-title>🍃New</v-card-title>
        <v-card-subtitle>Newly added sugar bags</v-card-subtitle>
        <v-card-text>
          <item-slider :data="sugarBagsPage">
            <template #slider-item="{ item }">
              <sugar-bag-card :id="item.modelId"/>
            </template>
          </item-slider>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>