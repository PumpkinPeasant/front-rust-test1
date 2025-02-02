<script setup lang="ts">
import {useTodoListStore} from "~/stores/useTodoListStore";
import {useCollectionStore} from "~/stores/useCollectionStore";

const sugarBagsStore = useSugarBagsStore();
const collectionStore = useCollectionStore();
const router = useRouter();

const title = ref('')
const file = ref<File | null>(null);
const selectedCollections = ref<Object | null>(null);
const isActive = ref(false)
const base64File = ref<string | null>(null);

function closeDialog() {
  clear();
  isActive.value = false;
}

function clear() {
  title.value = '';
  file.value = null;
  selectedCollections.value = null;
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
    if (!selectedCollections.value) {
      await sugarBagsStore.createSugarBag(title.value, base64File.value).then((response) => {
        router.push(`sugar/${response}`)
      });
    } else {
      await collectionStore.addNewSugarBag(title.value, base64File.value, selectedCollections.value).then((response) => {
        router.push(`collection/${response}`)
      });
    }
    closeDialog();
  } catch (error) {
    console.error("Error converting file:", error);
  }
}

onMounted(() => {
  collectionStore.getAllCollections();
})
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
          <v-autocomplete
              v-model="selectedCollections"
              :items="collectionStore.collections"
              color="blue-grey-lighten-2"
              item-title="name"
              item-value="modelId"
              label="Add to collection"
              variant="outlined"
              chips
              closable-chips
              multiple
          >
            <template v-slot:chip="{ props, item }">
              <v-chip
                  v-bind="props"
                  :text="item.raw.name"
              ></v-chip>
            </template>

            <template v-slot:item="{ props, item }">
              <v-list-item
                  v-bind="props"
                  :title="item.raw.name"
              ></v-list-item>
            </template>
          </v-autocomplete>

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