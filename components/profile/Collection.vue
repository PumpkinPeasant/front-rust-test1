<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();

const props = defineProps({
  data: {type: Object, required: true},
});
</script>

<template>
  <v-card @click="router.push(`collection/${data.modelId}`)">
    <v-card-title>
      {{data.name}}
    </v-card-title>
    <v-card-subtitle>
      id: {{data.modelId}}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn @click="router.push(`collection/${data.modelId}`)">Open</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>