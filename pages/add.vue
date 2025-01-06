<template>
  <v-row class="pa-6">
    <v-col cols="4">
      <v-card class="form pa-4">
        <h1>Добавить</h1>
        <v-text-field placeholder="Название"/>
        <v-autocomplete placeholder="Место лута"/>
        <v-date-picker title="Дата"/>
        <v-file-input/>
      </v-card>
    </v-col>
    <v-col cols="8">
      <v-card class="pa-4">
        <model-container/>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ModelContainer from "../components/add/ModelContainer.vue";
export default {
  name: "add",
  components: {ModelContainer}
}
</script>

<style scoped>
.form > * {
  margin-bottom: 16px;
}
</style>