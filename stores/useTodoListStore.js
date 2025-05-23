import axios from "axios";

export const useTodoListStore = defineStore("list", () => {
    const todos = ref([]);
    const listData = ref([]);

    async function getAllLists() {
        await axios.get('http://localhost:8080/lists')
            .then(response => todos.value = response.data)
    }

    async function getListItems(id) {
        await axios.get(`http://localhost:8080/list/${id}/items`)
            .then(response => listData.value = response.data)
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

    async function editList(listId, title) {
        await axios.put(`http://localhost:8080/list/${listId}/edit`,
            {
                'title': title
            }
        )
    }

    async function editItem(listId, itemId, title) {
        await axios.put(`http://localhost:8080/list/${listId}/items/${itemId}/edit`,
            {
                'title': title
            }
        )
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

    async function deleteItem(listId, itemId) {
        await axios.delete(`http://localhost:8080/list/${listId}/items/${itemId}/delete`)
    }

    async function deleteList(listId) {
        await axios.delete(`http://localhost:8080/list/${listId}/delete`)
    }

    return {
        getAllLists,
        getListItems,
        createList,
        editList,
        addItem,
        editItem,
        checkItem,
        deleteItem,
        deleteList,
        listData,
        todos
    }
})