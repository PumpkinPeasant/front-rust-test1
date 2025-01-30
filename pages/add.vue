<template>
  <v-row class="pa-6">
    <v-col cols="12">
      <v-card class="form pa-4">
        <h1>Добавить</h1>
        <v-text-field placeholder="Название"/>
        <v-autocomplete placeholder="Место лута"/>
        <v-date-picker title="Дата"/>
        <v-file-input/>
        <v-btn @click="sugarBagsStore.createItem('sex', '1234')">Создать</v-btn>
      </v-card>
    </v-col>
<!--    <v-col cols="8">-->
<!--      <v-card class="pa-4">-->
<!--        <model-container/>-->
<!--      </v-card>-->
<!--    </v-col>-->
  </v-row>
</template>

<script setup>
import ModelContainer from "../components/add/ModelContainer.vue";
import {useSugarBagsStore} from "~/stores/useSugarBagsStore.js";

const sugarBagsStore = useSugarBagsStore();

</script>

<style scoped>
.form > * {
  margin-bottom: 16px;
}
</style>