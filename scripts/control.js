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
        this.view.bindCheckBoxClick( (index, isChecked) => {
            let res;
            if (isChecked) res = this.model.setItemDone(index)
            else res = this.model.setItemInProgress(index)
            this.view.refreshTodoItem(res.oldIndex, this.model.get(res.newIndex))
            this.view.moveItem(res.oldIndex, res.newIndex)
        })
    }

    manageDeleteButton(){
        this.view.bindDeleteButton(index => {
            this.model.deleteItem(index)
            this.view.removeItem(index)
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