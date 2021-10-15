import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, Paper, TextField} from "@mui/material";
import s from "../App.module.css";
import {DeleteForever, ModeEdit} from "@mui/icons-material";
import {Modal} from 'antd';
import {TaskType} from "./Note";


type ModalPropsType = {
    id: string
    title: string
    removeNote: (id: string) => void
    currentValue: string
    arrTask: TaskType[]
    changeNoteTitle: (id: string, title: string) =>void
}
export const ModalMode = (props: ModalPropsType) => {

    let [isModalVisible, setIsModalVisible] = useState(false);
    let [visible, setVisible] = useState(false);
    let [title, setTitle] = useState(props.title)

    const showEditModal = () => {
        setVisible(true)
    }
    const showDeleteModal = () => {
        setIsModalVisible(true);
    };

    const onChange =(title: string) => {
        props.changeNoteTitle(props.id, title);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setTitle(e.currentTarget.value)
            onChange(title)
            setVisible(false)
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const handleOk = (id: string) => {
        props.removeNote(id)
        setIsModalVisible(false);
        setVisible(false)
    };
    const handleEditOk = () => {
        onChange(title)
        setIsModalVisible(false);
        setVisible(false)
    }
    const handleCancel = () => {
        setIsModalVisible(false);
        setVisible(false)
    };

    return <Paper className={s.showField} key={props.id} style={{border: " solid skyblue 0.5px"}}>
        <IconButton onClick={showDeleteModal}>
            <DeleteForever color="error"/>
        </IconButton>
        <IconButton onClick={showEditModal}>
            <ModeEdit color="primary"/>
        </IconButton>
        <h1>{props.title}</h1>
        <h2>
            {props.arrTask.map(el => <div key={el.id}>{el.title}</div>)}
        </h2>
        <Modal title={props.title}
               visible={isModalVisible}
               onOk={() => handleOk(props.id)}
               onCancel={handleCancel}>
            <p>Delete note ?</p>
        </Modal>

        <Modal title={props.title}
               visible={visible}
               onOk={handleEditOk}
               onCancel={handleCancel}>
            <p>Do you really want to change a note ?</p>
            <div> <TextField autoFocus onChange={changeTitle} value={title} onKeyPress={onKeyPressHandler}/></div>
        </Modal>
    </Paper>
}

