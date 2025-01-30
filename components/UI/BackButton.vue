<template>
  <v-btn @click="go" variant="text" icon="mdi-chevron-left" />
</template>

<script setup>
import { useRouter } from "vue-router";

const Targets = {
  Index: 0,
  Back: 1
}

const props = {
  target: Targets.Index || Number,
};

const router = useRouter();

function go() {
  if (props.target === Targets.Index) {
    router.push("/");
  } else {
    router.back();
  }
}
</script>