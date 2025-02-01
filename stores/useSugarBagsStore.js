import axios from "axios";

export const useSugarBagsStore = defineStore("sugarbags", () => {

    async function createItem(name, picture) {
        await axios.post('proxy/SugarBags/Create',
            {
                'name': name,
                'picture': picture,
            }
        ).then(response => {
        })
    }

    async function getSugarBag(id) {
        let sugarBag = null;
        await axios.get(`proxy/SugarBags/Get?modelId=${id}`)
            .then(response => sugarBag = response.data)
        return sugarBag;
    }

    async function getSugarBagsPage(){
        let sugarBagsPage = null;
        await axios.get('proxy/SugarBags/GetPage?skip=0&limit=100')
            .then(response => sugarBagsPage = response.data)
        return sugarBagsPage;
    }

    return {
        createItem,
        getSugarBag,
        getSugarBagsPage
    }
})