<script setup lang="ts">
import {useTodoListStore} from "~/stores/useTodoListStore";
import AddItem from "~/components/todo/AddItem.vue";
import ItemCard from "~/components/todo/ItemCard.vue";

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

async function checkItem(args: object) {
  await listStore.checkItem(id.value, args.id, args.checked).then(() => {
    getItems(id.value);
  });
}

async function deleteItem(itemId: number) {
  await listStore.deleteItem(id.value, itemId).then(() => {
    getItems(id.value);
  });
}

async function editItem(args: object) {
  await listStore.editItem(id.value, args.id, args.title)
      .then(() => {
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
      <h1 class="text-center mb-3">{{ listStore.listData.title }}</h1>
      <item-card
          @check="checkItem"
          @delete="deleteItem"
          @edit="editItem"
          :item="item"
          :index="index"
          v-for="(item, index) in listStore.listData.items"
          :key="index"/>
      <add-item
          @submit="add"
          v-model:isActive="toggleAddItem"
          v-if="toggleAddItem"/>
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