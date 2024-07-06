<script setup lang="ts">
import {useTodoListStore} from "~/stores/useTodoListStore";
import AddItem from "~/components/todo/AddItem.vue";

const router = useRouter();
const listStore = useTodoListStore();

const id = ref(router.currentRoute._value.params.id);
const toggleAddItem = ref(false);


async function getItems(id: number) {
  await listStore.getListItems(id);
}

async function add(title: String) {
  await listStore.addItem(id.value, title).then(() => {
    toggleAddItem.value = false;
    getItems(id.value);
  });
}

async function checkItem(itemId: number, checked: boolean) {
  await listStore.checkItem(id.value, itemId, checked).then(() => {
    getItems(id.value);
  });
}

function goBack() {
  router.push(`/`);
}

onBeforeMount(() => {
  getItems(id.value);
})

</script>

<template>
  <div>
    <v-btn class="back mt-3 ml-3"
           icon="mdi-chevron-left"
           variant="tonal"
           @click="goBack"/>
    <v-window class="d-flex justify-center pa-5">
      <v-card
          min-width="400px"
          class="d-flex justify-space-between align-center pa-2 mb-3"
          v-for="(item, index) in listStore.items" :key="index">
        <v-card-title>
          {{ item.title }}
        </v-card-title>
        <v-checkbox
            @update:modelValue="checkItem(item.id, !item.checked)"
            color="primary"
            hide-details
            v-model="item.checked"/>
      </v-card>
      <add-item
          @submit="add"
          v-model:isActive="toggleAddItem"
          v-show="toggleAddItem"/>
      <div v-if="!toggleAddItem" class="d-flex justify-center">
        <v-btn
            @click="toggleAddItem = !toggleAddItem"
            prepend-icon="mdi-plus"
            variant="tonal"
            size="large"
            min-width="300px">
          Добавить
        </v-btn>
      </div>
    </v-window>
  </div>

</template>

<style scoped lang="scss">
.back {
  position: absolute;
  top: 0;
  left: 0;
}
</style>