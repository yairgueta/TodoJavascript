import {View} from "./view/view.js";
import {TodoItemsHolder} from "./model/TodoItemsHolder.js";
import {TodoEditorView} from "./view/TodoEditorView.js";

export class Control {
    constructor() {
        this.view = new View()
        this.todoEditorView = new TodoEditorView()
        this.model = new TodoItemsHolder()


        // this.todoEditorView.dismiss()

        this.drawTodoList()

        this.manageClearAllButton()

        this.view.bindCheckBoxClick(this.toggleTodoItem)
        this.manageLabelClick()
        this.manageDeleteButton()
        this.manageSubmitButton()

        this.todoEditorView.bindIndicators(this.toggleTodoItem)
        this.todoEditorView.bindOnSubmit(this.updateTodoDescription)
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

    toggleTodoItem = (id, isChecked) => {
        const res = this.model.setCheckedByID(id, isChecked);
        this.view.refreshTodoItem(res.oldIndex, this.model.get(res.newIndex))
        this.view.moveItem(this.model.get(res.newIndex), res.oldIndex, res.newIndex)
    }


    manageDeleteButton(){
        this.view.bindDeleteButton(id => {
            this.model.deleteItemByID(id)
            this.updateItemsCount()
        })
    }

    updateTodoDescription = (id, description) => {
        const {item, index} = this.model.updateDescriptionByID(id, description)
        this.view.refreshTodoItem(index, item)
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

    manageLabelClick() {
        this.view.bindLabelClick(id => {
            const todo = this.model.findItemByID(id).item
            this.todoEditorView.show(todo)
        })
    }
}