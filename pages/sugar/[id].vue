<script setup lang="ts">

import BackButton from "~/components/UI/BackButton.vue";

const sugarBagPicture = ref<string | null>('')
</script>

<template>
  <v-container class="mt-2">
    <v-card>
      <v-card-title class="d-flex align-center pl-0">
        <back-button/>
        SUGAR NAME
      </v-card-title>
      <v-card-subtitle class="d-flex justify-space-between align-center py-2">
        <span>Found: <v-chip>32 times</v-chip></span>
        <v-rating
            color="yellow"
            half-increments
            hover
            :length="5"
            :size="32"
            :model-value="3"
        />
      </v-card-subtitle>
      <v-card-text>
        <img
            :src="`data:image/jpeg;base64,${sugarBagPicture}`"
            alt="Sugar Bag Image"
            style="max-width: 300px;"
        />
      </v-card-text>
      <v-card-text>
        <p>Manufacturer: NAME</p>
        <p>Created: DATE</p>
        <p>Last found: DATE</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>

</style>