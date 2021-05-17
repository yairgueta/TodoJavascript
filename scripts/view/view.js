export class View{

    static CLASSNAME_CHECKBOX = "checkbox";
    static CLASSNAME_LABEL = "todolabel";
    static CLASSNAME_DELBUTTON = "delete_button"
    static CLASSNAME_SHOW = "show"


    constructor() {
        this.nextID = 0;
        this.__todoItemTemplate = document.getElementById("todo_item_to_copy");

        this.todoList = document.createElement("ul")
        document.getElementById("todoItemsList").append(this.todoList)

        this.todoListHeader = document.getElementById("items_list_header")
        this.todoListHeader.label = document.querySelector('#items_list_header label')
        this.todoListHeader.button = document.querySelector('#items_list_header button')

        this.form = document.querySelector("#input_new_item");
        this.form.textInput = document.querySelector("#input_new_item > input[type='text']");
        this.form.submitButton = document.querySelector("#input_new_item > button");
    }

    get _todoItemTemplate() { return this.__todoItemTemplate.cloneNode(true); }

    get textInputValue() { return this.form.textInput.value; }

    clearTextInput(){
        let input = this.form.textInput.value;
        this.form.textInput.value = String();
        return input;
    }

    updateTodoListHeader(i){
        this.todoListHeader.label.innerText = `Total items: ${i}`
    }

    _indexToID(i){
        return `todo.item.container.ID${i}`
    }

    _idToIndex(id){
        return id.substr(22)
    }

    _createCleanTodoItem(){
        const li = document.createElement('li');

        li.container = this._todoItemTemplate;
        li.container.removeAttribute('id');
        li.container.hidden = false;

        Object.assign(li.container, {
            checkbox: li.container.getElementsByClassName(View.CLASSNAME_CHECKBOX)[0],
            label: li.container.getElementsByClassName(View.CLASSNAME_LABEL)[0],
            delButton: li.container.getElementsByClassName(View.CLASSNAME_DELBUTTON)[0]
        })

        const parenthoodProperties = {container: li.container, li: li}
        Object.assign(li.container.checkbox, parenthoodProperties)
        Object.assign(li.container.label, parenthoodProperties)
        Object.assign(li.container.delButton, parenthoodProperties)

        li.appendChild(li.container);
        return li;
    }

    _createTodoItem(todo){
        const li = this._createCleanTodoItem();
        li.container.id = this._indexToID(this.nextID++);
        li.container.checkbox.checked = todo.isChecked;
        li.container.label.innerText = todo.description;
        if(todo.isChecked) li.container.label.innerHTML = li.container.label.innerHTML.strike()
        return li;
    }

    animateAddContainer(li){
        setTimeout(()=> li.classList.add(View.CLASSNAME_SHOW), 10)
    }

    appendTodoItemToFirst(todo){
        const li = this._createTodoItem(todo)
        this.todoList.insertBefore(li, this.todoList.firstChild)
        this.animateAddContainer(li)
    }

    appendTodoItemToLast(todo){
        const li = this._createTodoItem(todo)
        this.todoList.appendChild(li)
        this.animateAddContainer(li)
    }

    refreshTodoItem(i, todo){
        const item = this.todoList.children[i].container
        item.checkbox.checked = todo.isChecked;
        if(todo.isChecked) item.label.innerHTML = todo.description.strike()
        else item.label.innerHTML = todo.description
    }

    moveItem(i, j){
        const liClone = this.todoList.children[i].cloneNode(true)
        this._removeLi(this.todoList.children[i])
        this.todoList.insertBefore(liClone, this.todoList.children[j+(j>i)])
        // this.todoList.children[i].remove()
    }

    _removeLi(li){
        li.classList.remove(View.CLASSNAME_SHOW)
        setTimeout(()=>li.remove(), 2010)
    }

    removeItem(i){
        const li = this.todoList.children[i]
        this._removeLi(li)
    }

    clearTodoList(){
        let child;
        while (child = this.todoList.firstChild){
            child.remove()
        }
    }

    clearTodoListWithAnimation(){
        const maxAnimationDuration = 2000
        const delayBetweenDelete = Math.min(250, maxAnimationDuration / this.todoList.childElementCount);
        let currentDelay = 0;
        Array.from(this.todoList.children).forEach(child => {
            setTimeout(() =>{
                this._removeLi(child)
            }, currentDelay)
            currentDelay += delayBetweenDelete;
        })
    }

    _getContainerIndex(container){
        var sib = container.parentElement
        for (var i=0 ; sib = sib.previousSibling ; i++ );
        return i;
    }

    bindCheckBoxClick(handler){
        this.todoList.addEventListener('click', e => {
            if (e.target.classList.contains(View.CLASSNAME_CHECKBOX)){
                handler(this._getContainerIndex(e.target.container), e.target.checked);
            }
        });
    }

    bindDeleteButton(handler){
        this.todoList.addEventListener('click', e =>{
            if (e.target.disabled) return
            if (e.target.classList.contains(View.CLASSNAME_DELBUTTON)){
                e.target.disabled = true
                handler(this._getContainerIndex(e.target.container))
            }
        })
    }

    bindLabelClick(handler){
        this.todoList.addEventListener('click', e => {
            if (e.target.classList.contains(View.CLASSNAME_LABEL)){
                handler(this._getContainerIndex(e.target.container));
            }
        });
    }

    bindSubmitButton(handler){
        this.form.submitButton.addEventListener('click', e => {
            handler(this.form.textInput.value)
        })
        this.form.textInput.addEventListener('keyup', e => {
            if (e.keyCode === 13)
                this.form.submitButton.click()
        })
    }

    bindClearAllButton(handler){
        this.todoListHeader.button.addEventListener('click', e => {
            handler()
        })
    }

}