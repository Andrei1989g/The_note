import {v1} from "uuid";
import {AddNoteACType, RemoveNoteACType} from "./noteRecucer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type InitialStateType = {
    [key: string]: Array<TaskType>
}
let initialState:InitialStateType = {
    ["NoteId"]: [
        {id: v1(), title: "milk", isDone: false},
        {id: v1(), title: "React Book", isDone: false}
    ]
}

export const taskReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            return {
                ...state,
                [action.noteId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.noteId]]
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.noteId]: state[action.noteId].map(el => el.id === action.id ? {
                    ...el,
                    title: action.newTitle
                } : el)
            }
        }
        case "CHANGE-STATUS": {
            return {
                ...state,
                [action.noteId]: state[action.noteId].map(el => el.id === action.id ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }
        }
        case "REMOVE-TASK": {
            return {...state, [action.noteId]: state[action.noteId].filter(el => el.id !== action.id)}
        }
        case 'ADD-NOTE':
            return {...state, [action.personalId]: []}
        case 'REMOVE-NOTE': {
            let copyState = {...state}
            delete copyState[action.noteId]
            return copyState
        }
        default:
            return state
    }
}
type ActionsType = AddTaskACType
    | ChangeTaskStatusACType
    | changeTaskTitleACType
    | removeTaskACType
    | RemoveNoteACType
    | AddNoteACType

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, noteId: string) => {
    return {
        type: "ADD-TASK",
        title,
        noteId
    } as const
}
type ChangeTaskStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (id: string, isDone: boolean, noteId: string) => {
    return {
        type: "CHANGE-STATUS",
        id,
        isDone,
        noteId
    } as const
}
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (id: string, newTitle: string, noteId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        id,
        newTitle,
        noteId
    } as const
}
type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, noteId: string) => {
    return {
        type: "REMOVE-TASK",
        id,
        noteId
    } as const
}
