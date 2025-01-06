<template>
  <canvas ref="canvas" id="scene"></canvas>
</template>

<script setup lang="ts">
import * as THREE from "three";
import Level from '~/classes/level';
import {loadModel} from "~/composables/useLoader";

const canvas = ref<HTMLCanvasElement | null>(null);
let levelInstance: Level | null = null;

const configureLevel = () => {
  if (canvas.value) {
    levelInstance = new Level(canvas.value);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 20, 10);
    levelInstance.add(light);

    loadModel('models/sugar.glb').then(model => {
      levelInstance?.add(model)
    })

  }
};

onMounted(() => {
  configureLevel();
});

</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>