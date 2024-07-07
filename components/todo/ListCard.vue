<template>
  <div class="d-flex align-center ga-2 mb-3">
    <v-chip rounded variant="text">{{ index + 1 }}</v-chip>
    <v-card @click="goToList(todo.id)"
            :ripple="!isEditActive"
            :key="index"
            min-width="400px">
      <v-card-title v-if="!isEditActive">
        {{ todo.title }}
      </v-card-title>
      <v-text-field
          v-model="newTitle"
          v-else
          @click:append="save(todo.id, newTitle)"
          append-icon="mdi-content-save"
          class="mx-4 mt-6"
          variant="outlined"
          @click.stop/>
    </v-card>
    <v-btn @click="toggleEdit()"
           :icon="isEditActive ? 'mdi-undo-variant' : 'mdi-pen'"
           size="small"
           variant="text"/>
    <v-btn @click="deleteList(todo.id)"
           icon="mdi-delete"
           color="red"
           size="small"
           variant="text"/>
  </div>
</template>

<script setup>

const router = useRouter();

const {todo, index} = defineProps({
  todo: Object,
  index: Number
})

const emit = defineEmits(['delete', 'edit']);

const isEditActive = ref(false);

const newTitle = ref('');

function deleteList(id) {
  emit('delete', id)
}

function toggleEdit() {
  isEditActive.value = !isEditActive.value;
  newTitle.value = isEditActive.value ? todo.title : '';
}

function save(id, title) {
  emit('edit', {id: id, title: title});
  toggleEdit();
}

function goToList(id) {
  router.push(`todo/${id}`);
}
</script>

<style scoped>

</style>