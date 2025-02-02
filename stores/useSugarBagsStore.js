import axios from "axios";

export const useSugarBagsStore = defineStore("sugarbags", () => {

    async function createSugarBag(name, picture) {
        const response = await axios.post('proxy/SugarBags/Create', {
            "createSugarBagOptions": {
                'name': name,
                'picture': picture,
            }
        });
        return response.data.modelId;
    }

    async function getSugarBag(id) {
        let sugarBag = null;
        await axios.get(`proxy/SugarBags/Get?modelId=${id}`)
            .then(response => sugarBag = response.data)
        return sugarBag;
    }

    async function getSugarBagsPage() {
        let sugarBagsPage = null;
        await axios.get('proxy/SugarBags/GetPage?skip=0&limit=100')
            .then(response => sugarBagsPage = response.data)
        return sugarBagsPage;
    }

    return {
        createSugarBag,
        getSugarBag,
        getSugarBagsPage
    }
})