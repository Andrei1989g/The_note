import {v1} from "uuid";

export type NoteType = {
    id: string
    title: string
}
let initialState = [
    {id: 'NoteId', title: "What to buy"},
]
export const noteReducer = (state: Array<NoteType> = initialState, action: TsarType): NoteType[]  => {
    switch (action.type) {
        case "REMOVE-NOTE": {
            return state.filter(el => el.id !== action.noteId)
        }
        case 'ADD-NOTE': {
            return [{id: action.personalId, title: action.title}, ...state]
        }
        case 'CHANGE-NOTE-TITLE': {
            return state.map(el => el.id === action.noteId ? {...el, title: action.newNoteTitle} : el)
        }
        case 'VIEW-MODE': {
            return state.map(el => el.id === action.noteId ? {...el} : el)
        }
        default:
            return state
    }
}
type TsarType = RemoveNoteACType
    | AddNoteACType
    | changeNoteNameACType
    | ViewModeACType

export type ViewModeACType = ReturnType<typeof viewModeAC>
export const viewModeAC = (noteId: string) => {
    return {
        type: "VIEW-MODE",
        noteId
    } as const
}
export type RemoveNoteACType = ReturnType<typeof removeNoteAC>
export const removeNoteAC = (noteId: string) => {
    return {
        type: "REMOVE-NOTE",
        noteId
    } as const
}

export type AddNoteACType = ReturnType<typeof addNoteAC>
export const addNoteAC = (title: string) => {
    return {
        type: "ADD-NOTE",
        title,
        personalId: v1()
    } as const
}

type changeNoteNameACType = ReturnType<typeof changeNoteNameAC>
export const changeNoteNameAC = (noteId: string, newNoteTitle: string) => {
    return {
        type: 'CHANGE-NOTE-TITLE',
        noteId,
        newNoteTitle
    } as const
}
