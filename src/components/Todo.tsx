import React from "react";
import {observer} from "mobx-react-lite";
import todo from "../store/todo";
import {Checkbox, IconButton, Paper, Stack} from "@mui/material";
import s from "../App.module.css"
import {Delete} from "@mui/icons-material";

export const Todo = observer(() => {
    return (
        <div>
            {todo.todos.map(el =>
                <Stack spacing={3}>
                    <Paper style={{padding: "10px", margin: "5px"}}>
                        <div key={el.id}>
                            <Checkbox
                                color="primary"
                                checked={el.isDone}
                                onChange={() => todo.changeStatus(el.id)}/>
                            <span className={s.title}>{el.title}</span>
                            <IconButton
                                aria-label="delete" onClick={() => todo.removeTodo(el.id)}>
                                <Delete/>
                            </IconButton>
                            {/*<button onClick={() => todo.removeTodo(el.id)}>x</button>*/}
                        </div>
                    </Paper>
                </Stack>
            )}
        </div>
    )
})