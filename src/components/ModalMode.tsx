import React, {useState} from "react";
import {IconButton, Paper} from "@mui/material";
import s from "../App.module.css";
import {DeleteForever, ModeEdit} from "@mui/icons-material";

import {Modal} from 'antd';
import {TaskType} from "./Note";


type ModalPropsType = {
    id:string
    title:string
    removeNote: (id: string) => void
    currentValue: string
    arrTask: TaskType[]
}
export const ModalMode = (props: ModalPropsType) => {

    let [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = (id: string) => {
        props.removeNote(id)
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return <Paper className={s.showField} key={props.id}>
        <IconButton onClick={showModal}>
            <DeleteForever color="error"/>
        </IconButton>
        <IconButton onClick={showModal}>
            <ModeEdit color="primary"/>
        </IconButton>
        <h1>{props.title}</h1>
        <h2>
            {props.arrTask.map(el => <div>{el.title}</div>)}
        </h2>
        <Modal title={props.title}
               visible={isModalVisible}
               onOk={() => handleOk(props.id)}
               onCancel={handleCancel}>
            <p>Delete note ?</p>
        </Modal>
    </Paper>
}

