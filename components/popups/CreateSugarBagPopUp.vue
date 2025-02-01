<script setup lang="ts">
import {useTodoListStore} from "~/stores/useTodoListStore";

const sugarBagsStore = useSugarBagsStore();
const router = useRouter();

const title = ref('')
const file = ref<File | null>(null);
const isActive = ref(false)
const base64File = ref<string | null>(null);

function closeDialog() {
  clear();
  isActive.value = false;
}

function clear() {
  title.value = '';
  file.value = null;
}

const fileToBase64 = (selectedFile: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1]; // Remove prefix
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

async function createSugarBag() {
  if (!file.value) {
    console.error("No file selected");
    return;
  }

  try {
    base64File.value = await fileToBase64(file.value);
    await sugarBagsStore.createSugarBag(title.value, base64File.value);
    closeDialog();
  } catch (error) {
    console.error("Error converting file:", error);
  }
}
</script>

<template>
  <v-dialog v-model="isActive" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          v-bind="activatorProps"
          prepend-icon="mdi-plus"
          variant="tonal">
        Create
      </v-btn>
    </template>

    <template v-slot:default>
      <v-card title="Create new sugar bag">

        <v-card-text>
          <v-text-field
              @keydown.enter="createSugarBag"
              v-model="title"
              label="Name"
              variant="outlined"/>
          <v-file-input
              v-model="file"
              label="Photo"
              variant="outlined"
              prepend-icon=""
              append-inner-icon="mdi-file"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="red"
              text="Close"
              @click="closeDialog"
          ></v-btn>
          <v-btn
              variant="tonal"
              text="Create"
              @click="createSugarBag"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>