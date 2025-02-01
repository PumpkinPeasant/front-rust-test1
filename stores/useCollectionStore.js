import axios from "axios";

export const useCollectionStore = defineStore("collection", () => {
    const collections = ref([]);
    const currentCollection = ref([]);

    async function createCollection(name) {
        await axios.post('proxy/Collection/Create',
            {
                "createCollectionOptions": {
                    'name': name,
                }
            }
        ).then(response => {
            getAllCollections();
        })
    }

    async function getCollection(id){
        await axios.get(`proxy/Collection/Get?modelId=${id}`)
            .then(response => currentCollection.value = response.data)
    }

    async function getAllCollections(){
        await axios.get('proxy/Collection/GetPage?skip=0&limit=100')
            .then(response => collections.value = response.data)
    }

    return {
        createCollection,
        getCollection,
        getAllCollections,
        collections,
        currentCollection
    }
})