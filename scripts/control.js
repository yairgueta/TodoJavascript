import {View} from "./view/view.js";
import {TodoItemsHolder} from "./model/TodoItemsHolder.js";

export class Control {
    constructor() {
        this.view = new View()
        this.model = new TodoItemsHolder()

        this.drawTodoList()

        this.manageClearAllButton()

        this.manageCheckbox()
        this.manageDeleteButton()
        this.manageSubmitButton()
    }

    updateItemsCount(){
        const count = this.model.currentItems.length
        this.view.updateTodoListHeader(count)
    }

    drawTodoList(){
        this.view.clearTodoList()
        this.model.currentItems.forEach(t => this.view.appendTodoItemToLast(t))
        this.updateItemsCount()
    }

    manageCheckbox(){
        this.view.bindCheckBoxClick( (id, isChecked) => {
            const res = this.model.setCheckedByID(id, isChecked);
            this.view.refreshTodoItem(res.oldIndex, this.model.get(res.newIndex))
            this.view.moveItem(this.model.get(res.newIndex), res.oldIndex, res.newIndex)
        })
    }

    manageDeleteButton(){
        this.view.bindDeleteButton(id => {
            this.model.deleteItemByID(id)
            this.updateItemsCount()
        })
    }

    manageSubmitButton(){
        this.view.bindSubmitButton(s => {
            if (s !== ""){
                this.view.clearTextInput()
                const item = this.model.addItem(s)
                this.view.appendTodoItemToFirst(item)
                this.updateItemsCount()
            }
        })
    }

    manageClearAllButton() {
        this.view.bindClearAllButton(() => {
            this.model.clearAll()
            this.view.clearTodoListWithAnimation()
            this.updateItemsCount()
        })
    }
}