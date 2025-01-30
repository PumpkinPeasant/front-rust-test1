<script setup lang="ts">
import {useSugarBagsStore} from "~/stores/useSugarBagsStore";

const props = defineProps({
  id: {type: String, required: true},
});

const sugarBagInfo = ref(null);

const sugarBagsStore = useSugarBagsStore();

async function getSugarBag(){
  sugarBagInfo.value = await sugarBagsStore.getSugarBag(props.id)
}

onMounted(() => {
    getSugarBag();
})
</script>

<template>
  <v-card color="grey" class="mb-2">
    <v-card-title>
      {{sugarBagInfo?.name}}
    </v-card-title>
    <v-card-subtitle>
      id: {{sugarBagInfo?.modelId}}
    </v-card-subtitle>
    <v-card-text>image: {{sugarBagInfo?.picture}}</v-card-text>
  </v-card>
</template>

<style scoped>

</style>