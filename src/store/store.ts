import {combineReducers, createStore} from "redux"
import {taskReducer} from "./taskReducer";
import {noteReducer} from "./noteRecucer";

let rootReducer = combineReducers ({
    tasks:taskReducer,
    note:noteReducer,
})
export type AppRootStateType = ReturnType<typeof rootReducer>
export let store = createStore(rootReducer)

//@ts-ignore
window.store = store