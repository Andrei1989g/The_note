import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import Header from './components/Header';
import {Button, Container, Grid, Input, Paper, Stack, TextField} from "@mui/material";
import {Todo} from './components/Todo';
import todo, {TodoType} from "./store/todo";
import s from "./App.module.css"
import {v1} from "uuid";

function App() {

    let [value, setValue] = useState("")
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }


    const addTodo = () => {
        todo.addTodo(value)
        setValue("")
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTodo()
        }
    }

    return (
        <Container fixed className={s.container}>
            <Grid container style={{padding: "0px"}}>
                <Header/>
            </Grid>
            <Paper className={s.box}>
                <Paper className={s.slider}>
                    <div className={s.addItem}>
                    <TextField
                        size="small"
                        label="Title"
                        value={value}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}/>
                    <Button style={{height: "40px", marginLeft: "2px"}} variant="outlined" color="primary"
                            onClick={addTodo}>+</Button>
                    </div>
                    <Todo/>
                </Paper>
                <div className={s.content}>
                    <Paper className={s.paper}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis debitis delectus
                        deleniti ea eius iste labore maiores, minima molestias, possimus quas ratione reiciendis
                        reprehenderit sapiente sint totam, voluptates voluptatum.</Paper>
                </div>
            </Paper>

        </Container>
    );
}

export default App;
