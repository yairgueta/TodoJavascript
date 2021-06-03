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
            checkbox: document.querySelector("#todoItemEditor-main .body .checkbox"),
            description: document.querySelector("#todoItemEditor-main .body .description"),
            submitBtn: document.querySelector("#todoItemEditor-main .body .submit"),
        }

        this.header.exitBtn.addEventListener("pointerdown", evt => {
            console.log("exit btn")
        })
        this.background.addEventListener("pointerdown", evt => {
            if (evt.target === this.background)
                this.header.exitBtn.dispatchEvent(new PointerEvent("pointerdown"))
        })
    }

    show() {
        this.background.style.display = "flex";
    }

    dismiss() {
        this.background.style.display = "none";
    }
}