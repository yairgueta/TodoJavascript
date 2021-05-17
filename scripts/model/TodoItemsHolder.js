import {TodoItem} from "./TodoItem.js";

export class TodoItemsHolder{
    LOCAL_STORAGE_KEY = "todo.js.key.local.storage.json.todo.items.list";

    constructor() {
        this.loadListFromLocal()
    }

    findItem = (item) => this.currentItems.findIndex(i => i.description === item.description
                                                && i.isChecked === item.isChecked
                                                && i.creationTime === item.creationTime
                                                && i.lastModified === item.lastModified);

    sort(){
        this.currentItems.sort((a, b)=>100*(a.isChecked - b.isChecked)+(a.creationTime<b.creationTime)*2 -1);
    }

    addItem(description){
        const item = new TodoItem(false, description)
        this.currentItems.unshift(item)
        this.saveToLocal()
        return item
    }

    setItemDone(i){
        const item = this.currentItems[i]
        item.isChecked = true;
        this.sort()
        this.saveToLocal()
        return {oldIndex: i, newIndex: this.findItem(item)}
    }

    setItemInProgress(i){
        const item = this.currentItems[i]
        item.isChecked = false;
        this.sort()
        this.saveToLocal()
        return {oldIndex: i, newIndex: this.findItem(item)}
    }

    deleteItem(i){
        this.currentItems.splice(i, 1);
        this.saveToLocal()
    }

    clearAll(){
        this.currentItems.length = 0;
        this.saveToLocal();
    }

    get(i){
        return this.currentItems[i];
    }


    saveToLocal(){
        let jsonItemsList = JSON.stringify(this.currentItems);
        window.localStorage.setItem(this.LOCAL_STORAGE_KEY, jsonItemsList);
    }


    loadListFromLocal(){
        let jsonItemsList = window.localStorage.getItem(this.LOCAL_STORAGE_KEY);
        if (jsonItemsList == null) {
            this.currentItems = []
            return
        }
        let raw = JSON.parse(jsonItemsList);
        this.currentItems = raw.map(v => TodoItem.from(v));
    }

}




