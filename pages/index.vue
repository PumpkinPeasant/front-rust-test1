<script setup lang="ts">
import {useTodoListStore} from "~/stores/useTodoListStore";
import CreateTodoPopUp from "~/components/popups/CreateTodoPopUp.vue";

const router = useRouter();

const listStore = useTodoListStore();

async function getTodos() {
  await listStore.getAllLists();
}

function goToList(id: number) {
  router.push(`todo/${id}`);
}

onMounted(() => {
  getTodos();
})

</script>

<template>
  <v-window class="d-flex justify-center pa-5">
    <h1 class="text-center">Мои списки</h1>
    <div class="pa-5 ma-2">
      <v-card @click="goToList(todo.id)"
              v-for="(todo, index) in listStore.todos"
              :key="index"
              min-width="400px"
              class="mb-3">
        <v-card-title>
          {{ todo.title }}
        </v-card-title>
      </v-card>
    </div>
    <div class="d-flex justify-center">
      <create-todo-pop-up/>
    </div>
  </v-window>
</template>

<style scoped>

</style>