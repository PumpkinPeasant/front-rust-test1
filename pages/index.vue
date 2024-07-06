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

async function deleteList(id: number) {
  await listStore.deleteList(id).then(getTodos);
}

onBeforeMount(() => {
  getTodos();
})

</script>

<template>
  <v-window class="d-flex justify-center pa-5">
    <h1 class="text-center">Мои списки</h1>
    <div class="pa-5 ma-2">
      <div v-for="(todo, index) in listStore.todos"
           class="d-flex align-center ga-2 mb-3">
        <v-chip rounded variant="text">{{ index + 1 }}</v-chip>
        <v-card @click="goToList(todo.id)"
                :key="index"
                min-width="400px">
          <v-card-title>
            {{ todo.title }}
          </v-card-title>
        </v-card>
        <v-btn @click="deleteList(todo.id)"
               icon="mdi-delete"
               color="red"
               size="small"
               variant="text"/>
      </div>
    </div>
    <div class="d-flex justify-center">
      <create-todo-pop-up/>
    </div>
  </v-window>
</template>

<style scoped>

</style>