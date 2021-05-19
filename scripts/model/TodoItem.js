const todoItemCopy = document.getElementById("todo_item_to_copy").cloneNode(true);

export class TodoItem {
    constructor(isChecked = false, description = "", id="") {
        this._isChecked = isChecked;
        this._description = description;
        this._creationTime = new Date();
        this._lastMosified = new Date();
        this._id = id;
    }

    get id() { return this._id; }

    get isChecked() {return this._isChecked;}
    set isChecked(isChecked){
        this._lastMosified = new Date();
        this._isChecked = isChecked;
    }

    get description() {return this._description;}
    set description(desc){
        this._lastMosified = new Date();
        this._description = desc;
    }

    get creationTime() {return this._creationTime;}
    get lastModified() {return this._lastMosified;}

    static from(json){
        return Object.assign(new TodoItem(), JSON.parse(json));
    }

}