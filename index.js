import {TodoItem} from "./scripts/model/TodoItem.js";
import {TodoItemsHolder} from "./scripts/model/TodoItemsHolder.js";
import {View} from "./scripts/view/view.js";
import {Control} from "./scripts/control.js";




window.newTodo = (b, str) => new TodoItem(b, str);
const testTodos = [
    new TodoItem(false, "a"),
    new TodoItem(true, "b"),
    new TodoItem(true, "c"),
    new TodoItem(true, "d"),
    new TodoItem(false, "e"),
    new TodoItem(false, "f"),
    new TodoItem(true, "g")
]


window.control = new Control()

