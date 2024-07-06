<script setup lang="ts">
import {useTodoListStore} from "~/stores/useTodoListStore";

const listStore = useTodoListStore();
const router = useRouter();

const title = ref('')
const isActive = ref(false)

function closeDialog() {
  clear();
  isActive.value = false;
}

function clear() {
  title.value = '';
}

async function createTodo() {
  let id = await listStore.createList(title.value)
  closeDialog();
  await router.push(`todo/${id}`);
}

</script>

<template>
  <v-dialog v-model="isActive" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          v-bind="activatorProps"
          prepend-icon="mdi-plus"
          variant="tonal"
          size="large"
          min-width="300px">
        Создать
      </v-btn>
    </template>

    <template v-slot:default>
      <v-card title="Создать новый список">

        <v-card-text>
          <v-text-field
              @keydown.enter="createTodo"
              v-model="title"
              label="Название списка"
              variant="outlined"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              text="Закрыть"
              @click="closeDialog"
          ></v-btn>
          <v-btn
              variant="tonal"
              text="Сохранить"
              @click="createTodo"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>