import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {Button, TextField} from "@mui/material";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = useCallback(() => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }, [props.addItem, title])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === "Enter") {
            addItem();
        }
    }

    return <div style={{margin: "5px"}}>
        <TextField
            variant="outlined"
            size="small"
            label="Title"
            error={!!error}
            value={title}
            helperText={error}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}/>
        <Button style={{height: "40px", marginLeft: "2px"}}
                variant="outlined" color="primary"
                onClick={addItem}>+</Button>
    </div>
})
