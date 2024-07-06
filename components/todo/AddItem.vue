<template>
  <v-card>
    <v-card-title>
      Добавить новый элемент
    </v-card-title>
    <v-card-text>
      <v-text-field
          @keydown.enter="submit"
          v-model="title"
          variant="outlined"
          label="Название"/>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="red"
          text="Отмена"
          @click="isActive = false"
      ></v-btn>
      <v-btn
          @click="submit"
          variant="tonal"
          text="Сохранить"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const isActive = defineModel('isActive')
const title = ref('')

const emit = defineEmits(['submit'])

function submit() {
  emit('submit', title.value)
}
</script>

<style scoped>

</style>