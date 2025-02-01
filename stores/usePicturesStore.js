import axios from "axios";

export const usePicturesStore = defineStore("pictures", () => {

    async function getPicture(id) {
        let picture = null;
        await axios.get(`proxy/Pictures/Get?modelId=${id}`)
            .then(response => picture = response.data)
        return picture;
    }
    return {
        getPicture
    }
})