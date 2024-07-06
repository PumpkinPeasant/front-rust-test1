import axios from "axios";

export const useTodoListStore = defineStore("list", () => {
    const todos = ref([]);
    const items = ref([]);

    async function getAllLists() {
        await axios.get('http://localhost:8080/lists')
            .then(response => todos.value = response.data)
    }

    async function getListItems(id) {
        await axios.get(`http://localhost:8080/list/${id}/items`)
            .then(response => items.value = response.data)
    }

    async function createList(title) {
        let listId = null;
        await axios.post('http://localhost:8080/create_list',
            {
                'title': title
            }
        ).then(response => {
            listId = response.data.id
        })
        return listId;
    }

    async function addItem(listId, title) {
        await axios.post(`http://localhost:8080/list/${listId}/create_item`,
            {
                'title': title
            }
        )
    }

    async function checkItem(listId, itemId, checked) {
        await axios.put(`http://localhost:8080/list/${listId}/items/${itemId}`,
            {
                'checked': checked
            }
        )
    }

    return {
        getAllLists,
        getListItems,
        createList,
        addItem,
        checkItem,
        items,
        todos
    }
})