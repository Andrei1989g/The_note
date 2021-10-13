import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {ChangeEvent, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {NoteType} from "../store/noteRecucer";
import {TasksStateType} from "../App";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchAppBar() {

    let [data, setData] = useState(new Date())

    useEffect(() => {
        let timeInterval = setInterval(() => {
            setData(new Date())
        }, 1000);

        return () => {
            clearInterval(timeInterval)
        }
    }, [])

    let note = useSelector<AppRootStateType, Array<NoteType>>(state => state.note)
    // let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState<string[]>([]);
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    React.useEffect(() => {
        const results = note.map(el => el.title).filter( (el) => [searchTerm.toLowerCase()].every( ell => el.includes(ell)))
        setSearchResults(results);
    }, [searchTerm]);


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}>
                        THE NOTE
                    </Typography>
                    <div style={{color: "white"}}>
                        Time : {data.toLocaleTimeString()}
                    </div>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search'}}
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        <ul>
                            {searchResults.map(item => (
                                <li>{item}</li>
                            ))}
                        </ul>
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

