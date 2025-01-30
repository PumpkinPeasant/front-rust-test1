<template>
<v-app-bar>
  <v-app-bar-title text="The Sugar Museum" @click="router.push('/')"/>
  <v-spacer/>
  <v-btn text="Добавить"
  prepend-icon="mdi-plus"/>
  <v-btn @click="router.push('/profile')" icon="mdi-account"/>
</v-app-bar>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>

</style>