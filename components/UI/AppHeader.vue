<template>
<v-app-bar>
  <v-app-bar-title text="The Sugar Museum" @click="router.push('/')"/>
  <v-spacer/>
  <create-sugar-bag-pop-up/>
  <v-btn @click="router.push('/profile')" icon="mdi-account"/>
</v-app-bar>
</template>

<script setup>
import { useRouter } from "vue-router";
import CreateSugarBagPopUp from "~/components/popups/CreateSugarBagPopUp.vue";
const router = useRouter();
</script>

<style scoped>

</style>