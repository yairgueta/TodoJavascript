#### [Link To Online Webpage](http://www.yairgueta.co.il/todo-js)

# About This Project
A todo list webpage written in pure Javascript (no special libraries), and stylized with pure CSS (again, no special framework).
This is my first project in Javascript, and I tried to build it according to _**MVC design pattern**_.
* The model module is in [`./scripts/model`](./scripts/model) and contains two class:
    1. A class named [`TodoItem`](./scripts/model/TodoItem.js) which is very simple and contains some data about a todo item. 
    2. A class named [`TodoItemsHolder`](./scripts/model/TodoItemsHolder.js) which is the main class of the model module and manages a list of the current items.
    
* The view module is in [`./scripts/view`](./scripts/view) and contains one class called [`View`](./scripts/view/view.js). It takes care of all UI components and some animations with the CSS.
* The control class located in [`./scripts/control.js`](./scripts/control.js) and it is very simple.

### Some things to do in the future (A todo list)
- [X] Clicking an existing todo item should open a new window with some information about its creation time and last modification time.
- [X] Clicking an existing todo item should let the user edit the description of the item.
- [X] Fix some CSS animations.
