import React, {useCallback, useState} from 'react';
import './App.css';
import Header from './components/Header';
import {Container, Grid, Paper, Stack} from "@mui/material";
import s from "./App.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {
    addTaskAC,
    changeStatusAC,
    changeTaskTitleAC,
    removeTaskAC, TaskType,
} from "./store/taskReducer";
import {addNoteAC, changeNoteNameAC, NoteType, removeNoteAC, viewModeAC} from "./store/noteRecucer";
import {AddItemForm} from "./components/AddItemForm";
import {Note} from "./components/Note";
import {Task} from "./components/Task";

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let [show, setShow] = useState(false)
    let [currentValue, setCurrentValue] = useState("")
    //console.log('currentValue: ', currentValue)
    let dispatch = useDispatch()
    let note = useSelector<AppRootStateType, Array<NoteType>>(state => state.note)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const removeTask = useCallback((id: string, noteId: string) => {
        dispatch(removeTaskAC(id, noteId));
    }, [])

    const addTask = useCallback((title: string, noteId: string) => {
        dispatch(addTaskAC(title, noteId));
    }, [])

    const changeStatus = useCallback((id: string, isDone: boolean, noteId: string) => {
        dispatch(changeStatusAC(id, isDone, noteId));
    }, [])

    const changeTaskTitle = useCallback((id: string, newTitle: string, noteId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, noteId));
    }, [])

    const removeNote = useCallback((id: string) => {
        dispatch(removeNoteAC(id))
    }, [])

    const changeNoteTitle = useCallback((id: string, title: string) => {
        dispatch(changeNoteNameAC(id, title))
    }, [])

    const addNote = useCallback((title: string) => {
        dispatch(addNoteAC(title))
    }, [dispatch])

    const viewMode = useCallback((noteId: string) => {
        dispatch(viewModeAC(noteId))
        setShow(true)
        setCurrentValue(noteId)
        console.log(noteId)
    }, [dispatch])
    const arr = note.map(el => el.id === currentValue ? el : {id: "id not defined", title: 'title not defined'})
    console.log('arr: ', arr)
    return (
        <Container fixed className={s.container}>
            <Grid container style={{padding: "0px"}}>
                <Header/>
            </Grid>
            <Paper style={{backgroundColor: "skyblue"}} className={s.box}>
                <Paper className={s.slider}>
                    <div className={s.addItem}>
                        <AddItemForm addItem={addNote}/>
                    </div>
                    {note.map(n => {
                        return <Stack spacing={3}>
                            <Paper style={{padding: "10px", margin: "5px", border: " solid skyblue 0.5px"}}>
                                <div onClick={() => viewMode(n.id)}>
                                    <Note
                                        key={n.id}
                                        id={n.id}
                                        title={n.title}
                                        tasks={tasks[n.id]}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        removeNote={removeNote}
                                        changeTaskTitle={changeTaskTitle}
                                        changeNoteTitle={changeNoteTitle}
                                    />
                                </div>
                            </Paper>
                        </Stack>
                    })}
                </Paper>
                <div className={s.content}>
                    <Paper className={s.paper}>
                        <div>

                            {show ? note.map((el) => {
                                const arrTask = tasks[currentValue]
                                if (el.id === currentValue) {
                                    return <Paper className={s.showField}>
                                        <div>{el.title}
                                            <div>
                                                {arrTask.map(el => <div>{el.title}</div>)}
                                            </div>
                                        </div>
                                    </Paper>
                                } else {
                                    return null
                                }
                            }) : "Choice your note"}
                        </div>
                    </Paper>
                </div>
            </Paper>
        </Container>
    );
}

export default App;
