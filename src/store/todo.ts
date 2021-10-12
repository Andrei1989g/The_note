import {v1} from "uuid";
import {makeAutoObservable} from "mobx";


export type TodoType = {
    id: string
    title: string
    isDone: boolean
}

class Todo {
    todos: TodoType[] = [
        {id: v1(), title: "What to buy", isDone: false},
        {id: v1(), title: "What to read", isDone: false},
        {id: v1(), title: "What to drink", isDone: false},
    ]

    constructor() {
        makeAutoObservable(this)
    }

    addTodo(title:string) {
        console.log('add todo')
        this.todos = [{id:v1(),title:title,isDone:false},...this.todos]
    }

    removeTodo(id: string) {
        this.todos=this.todos.filter(todo => todo.id !== id)
    }

    changeStatus(id: string) {
       this.todos = this.todos.map(el => el.id === id ? {...el,isDone: !el.isDone}:el)
    }
}

export default new Todo()