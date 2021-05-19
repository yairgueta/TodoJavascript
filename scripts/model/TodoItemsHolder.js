import {TodoItem} from "./TodoItem.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export class TodoItemsHolder{
    ID_PREFIX = "TODO_ITEM$";

    constructor() {
        this.loadListFromLocal()
    }

    findItem(item) {
        const i = this.currentItems.findIndex(i => i.id === item.id);
        return {item: this.currentItems[i], index: i};
    }

    findItemByID(id) {
        const i = this.currentItems.findIndex(i => i.id === id);
        return {item: this.currentItems[i], index: i};
    }

    sort(){
        this.currentItems.sort(
            (a, b)=>
                100*(a.isChecked - b.isChecked)
                + (a.creationTime<b.creationTime)*2 -1);
    }

    addItem(description){
        const item = new TodoItem(false, description, this.ID_PREFIX+uuidv4())
        this.currentItems.unshift(item)
        localStorage.setItem(item.id, JSON.stringify(item))
        return item
    }

    setChecked(todo, isChecked){
        this.setCheckedByID(todo.id, isChecked)
    }

    setCheckedByID(id, isChecked){
        const {item, index} = this.findItemByID(id);
        item.isChecked = isChecked;
        this.sort()
        window.localStorage.setItem(item.id, JSON.stringify(item))
        return {oldIndex: index, newIndex: this.findItem(item).index}
    }

    deleteItem(todo){
        this.deleteItemByID(todo.id);
    }

    deleteItemByID(id){
        const {item, index} = this.findItemByID(id);
        this.currentItems.splice(index, 1);
        window.localStorage.removeItem(item.id);
    }

    clearAll(){
        this.currentItems.length = 0;
        window.localStorage.clear();
    }

    get(i){
        return this.currentItems[i];
    }

    loadListFromLocal(){
        this.currentItems = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(this.ID_PREFIX)){
                const item = TodoItem.from(localStorage.getItem(key))
                this.currentItems.push(item)
            }
        }
        this.sort();
    }

}




