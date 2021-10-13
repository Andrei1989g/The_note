import React, {useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from './EditableSpan';
import {Task} from './Task';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, noteId: string) => void
    addTask: (title: string, noteID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, noteID: string) => void
    removeNote: (id: string) => void
    changeNoteTitle: (id: string, newTitle: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, noteID: string) => void
}

export function Note(props: PropsType) {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeNote = useCallback(() => {
        props.removeNote(props.id);
    }, [props.removeNote, props.id])

    const changeNoteTitle = useCallback((title: string) => {
        props.changeNoteTitle(props.id, title);
    }, [props.changeNoteTitle, props.id])

    const onClickHandler = useCallback((taskId: string) => {
        props.removeTask(taskId, props.id)
    }, [props.removeTask, props.id])

    const onChangeHandler = useCallback((taskId: string, newIsDoneValue: boolean) => {
        props.changeTaskStatus(taskId, newIsDoneValue, props.id)
    }, [props.changeTaskStatus, props.id])

    const onTitleChangeHandler = useCallback((taskId: string, newValue: string) => {
        props.changeTaskTitle(taskId, newValue, props.id)
    }, [props.changeTaskTitle, props.id])

    let allTasks = props.tasks
    console.log(props.tasks)
    return <div>
        <h3><EditableSpan value={props.title} onChange={changeNoteTitle}/>
            <IconButton
                aria-label="delete" onClick={removeNote}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                allTasks.map(t => {
                    return <Task
                        key={t.id}
                        task={t}
                        removeTask={onClickHandler}
                        changeTaskStatus={onChangeHandler}
                        changeTaskTitle={onTitleChangeHandler}
                    />})}
        </div>
    </div>
}
