<script setup lang="ts">
import {useSugarBagsStore} from "~/stores/useSugarBagsStore";
import {base64} from "~/utils/base64";
import {usePicturesStore} from "~/stores/usePicturesStore";
import {useRouter} from "vue-router";

const router = useRouter();

const props = defineProps({
  id: {type: String, required: true},
});

const sugarBagInfo = ref(null);
const sugarBagPicture = ref<string | null>('')
const sugarBagsStore = useSugarBagsStore();
const picturesStore = usePicturesStore();

async function getSugarBag() {
  await sugarBagsStore.getSugarBag(props.id).then(async (response) => {
    sugarBagInfo.value = response;
    await picturesStore.getPicture(sugarBagInfo.value?.pictureModelId).then((response) => {
          sugarBagPicture.value = response.base64;
        })
  });

}

function goToPage(){
  router.push(`sugar/${sugarBagInfo.value?.modelId}`)
}

onMounted(() => {
  getSugarBag();
});
</script>

<template>
  <v-card color="grey" class="mb-2" @click="goToPage">
    <v-card-title>
      {{ sugarBagInfo?.name }}
    </v-card-title>
    <v-card-subtitle>
      id: {{ sugarBagInfo?.modelId }}
    </v-card-subtitle>
    <v-card-text>
      <img
          v-if="!!sugarBagPicture"
          :src="`data:image/jpeg;base64,${sugarBagPicture}`"
          alt="Sugar Bag Image"
          style="max-width: 300px;"
      />
      <span v-else>No image available</span>
    </v-card-text>
  </v-card>
</template>