'use strict'

export class TodoEditorView {
    constructor() {
        this.background = document.getElementById("todoItemEditor-bg")
        this.main = document.getElementById("todoItemEditor-main")
        this.header = {
            it: document.querySelector("#todoItemEditor-main .header"),
            text: document.querySelector("#todoItemEditor-main .header .text"),
            exitBtn: document.querySelector("#todoItemEditor-main .header .exit_button"),
        }
        this.body = {
            it: document.querySelector("#todoItemEditor-main .body"),
            doneInd: document.querySelector("#todoItemEditor-main .body .done"),
            notDoneInd: document.querySelector("#todoItemEditor-main .body .not_done"),
            description: document.querySelector("#todoItemEditor-main .body .description"),
            submitBtn: document.querySelector("#todoItemEditor-main .body .submit"),
        }

        this.header.exitBtn.addEventListener("pointerdown", evt => {
            this.dismiss()
        })
        this.background.addEventListener("pointerdown", evt => {
            if (evt.target === this.background)
                this.header.exitBtn.dispatchEvent(new PointerEvent("pointerdown"))
        })
    }

    show(todo) {
        this.displayedTodo = todo
        this.background.style.display = "flex";
        this.showRightInd()
        this.body.description.value = todo.description
    }

    dismiss() {
        this.displayedTodo = null
        this.background.style.display = "none";
    }

    bindIndicators(handler) {
        const onClick = evt => {
            evt.target.style.display = "none"
            this.displayedTodo.isChecked = !this.displayedTodo.isChecked
            handler(this.displayedTodo.id, this.displayedTodo.isChecked)
            this.showRightInd()
        }

        this.body.doneInd.addEventListener("pointerdown", onClick)
        this.body.notDoneInd.addEventListener("pointerdown", onClick)
    }

    bindOnSubmit(handler) {
        this.body.submitBtn.addEventListener("pointerdown", evt => {
            handler(this.displayedTodo.id, this.body.description.value)
            this.dismiss()
        })
    }

    showRightInd() {
        if (this.displayedTodo.isChecked) {
            this.body.doneInd.style.display = null
            this.body.notDoneInd.style.display = "none"
        } else {
            this.body.notDoneInd.style.display = null
            this.body.doneInd.style.display = "none"
        }
    }


}