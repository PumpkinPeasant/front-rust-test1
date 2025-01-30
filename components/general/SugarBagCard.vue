<script setup lang="ts">
import {useSugarBagsStore} from "~/stores/useSugarBagsStore";
import { base64 } from "~/utils/base64";

const props = defineProps({
  id: {type: String, required: true},
});

const sugarBagInfo = ref(null);
const sugarBagsStore = useSugarBagsStore();

async function getSugarBag() {
  sugarBagInfo.value = await sugarBagsStore.getSugarBag(props.id);
}

onMounted(() => {
  getSugarBag();
});
</script>

<template>
  <v-card color="grey" class="mb-2">
    <v-card-title>
      {{ sugarBagInfo?.name }}
    </v-card-title>
    <v-card-subtitle>
      id: {{ sugarBagInfo?.modelId }}
    </v-card-subtitle>
    <v-card-text>
      <img
          v-if="sugarBagInfo?.picture"
          :src="`data:image/jpeg;base64,${sugarBagInfo.picture}`"
          alt="Sugar Bag Image"
          style="max-width: 300px;"
      />
      <span v-else>No image available</span>
    </v-card-text>
  </v-card>
</template>