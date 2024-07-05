<script setup lang="ts">
import {useTodoListStore} from "~/stores/useTodoListStore";

const router = useRouter();
const listStore = useTodoListStore();

const id = ref(router.currentRoute._value.params.id);

async function getItems(id: number) {
  await listStore.getListItems(id);
}

function goBack() {
  router.push(`/`);
}

onMounted(() => {
  getItems(id.value);
})

</script>

<template>
  <v-btn class="back mt-3 ml-3"
         icon="mdi-chevron-left"
         variant="tonal"
         @click="goBack"/>
  <v-window class="d-flex justify-center pa-5">
    <v-card
        class="d-flex justify-space-between align-center pa-2 mb-3"
        v-for="(item, index) in listStore.items" :key="index">
      <v-card-title>
        {{ item.title }}
      </v-card-title>
      <v-checkbox
          hide-details
          :value="item.checked"/>
    </v-card>
    <div class="d-flex justify-center">
      <v-btn
          @click=""
          prepend-icon="mdi-plus"
          variant="tonal"
          size="large"
          min-width="300px">
        Добавить
      </v-btn>
    </div>
  </v-window>
</template>

<style scoped lang="scss">
.back {
  position: absolute;
  top: 0;
  left: 0;
}
</style>