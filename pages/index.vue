<script setup lang="ts">
import {useTodoListStore} from "~/stores/useTodoListStore";
import CreateTodoPopUp from "~/components/popups/CreateTodoPopUp.vue";
import ListCard from "~/components/todo/ListCard.vue";

const listStore = useTodoListStore();

async function getTodos() {
  await listStore.getAllLists();
}

async function deleteList(id: number) {
  await listStore.deleteList(id).then(getTodos);
}

async function editList(args: object) {
  await listStore.editList(args.id, args.title).then(getTodos);
}

onBeforeMount(() => {
  getTodos();
})

</script>

<template>
  <v-window class="d-flex justify-center pa-5">
    <h1 class="text-center">Мои списки</h1>
    <div class="pa-5 ma-2">
      <list-card
          @delete="deleteList"
          @edit="editList"
          :todo="todo"
          :index="index"
          :key="index"
          v-for="(todo, index) in listStore.todos"/>
    </div>
    <div class="d-flex justify-center">
      <create-todo-pop-up/>
    </div>
  </v-window>
</template>

<style scoped>

</style>