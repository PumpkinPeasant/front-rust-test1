<template>
  <div class="d-flex align-center ga-2 mb-3">
    <v-chip rounded variant="text">{{ index + 1 }}</v-chip>
    <v-card
        @click="checkItem(item.id, !item.checked)"
        :ripple="!isEditActive"
        min-width="400px"
        class="d-flex justify-space-between align-center pa-2">
      <v-card-title v-if="!isEditActive">
        {{ item.title }}
      </v-card-title>
      <v-text-field
          v-model="newTitle"
          v-else
          @click:append="save(item.id, newTitle)"
          append-icon="mdi-content-save"
          class="mx-4 mt-6"
          variant="outlined"
          @click.stop/>
      <v-checkbox
          v-if="!isEditActive"
          @click.stop="checkItem(item.id, !item.checked)"
          color="primary"
          hide-details
          v-model="item.checked"/>
    </v-card>
    <v-btn @click="toggleEdit()"
           :icon="isEditActive ? 'mdi-undo-variant' : 'mdi-pen'"
           size="small"
           variant="text"/>
    <v-btn
        @click="deleteItem(item.id)"
        color="red"
        size="small"
        variant="text"
        icon="mdi-delete"/>
  </div>
</template>

<script setup>
const {item, index} = defineProps({
  item: Object,
  index: Number
})

const isEditActive = ref(false);

const newTitle = ref('');

const emit = defineEmits(['delete', 'edit', 'check']);

function checkItem(id, checked) {
  emit('check', {id: id, checked: checked});
}

function deleteItem(id) {
  emit('delete', id)
}

function toggleEdit() {
  isEditActive.value = !isEditActive.value;
  newTitle.value = isEditActive.value ? item.title : '';
}

function save(id, title) {
  emit('edit', {id: id, title: title});
  toggleEdit();
  newTitle.value = '';
}
</script>

<style scoped>

</style>