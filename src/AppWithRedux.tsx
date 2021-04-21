import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { useCallback, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { AppRootStateType } from './state/store';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC } from './state/todolists-reducer';
import { AddItemForm } from './Todolist/AddItemForm/AddItemForm';
import TodoList, { TaskType } from './Todolist/Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

const AppWithRedux = () => {


    const dispatch = useDispatch();

    const todolists = useSelector<AppRootStateType, TodolistType[]>((state) => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks);





    const removeTasks = useCallback((id: string, todolistID: string) => { // yes
        const action = removeTaskAC(id, todolistID);
        dispatch(action);
    }, [dispatch])

    const addTasks = useCallback((title: string, todolistID: string) => {  // yes
        const action = addTaskAC(title, todolistID);
        dispatch(action);
    }, [dispatch])
    const changeStatus = useCallback((id: string, isDone: boolean, todolistID: string) => {  // yes
        const action = changeTaskStatusAC(id, isDone, todolistID);
        dispatch(action);
    }, [dispatch])

    const changeTitle = useCallback((id: string, newTitle: string, todolistID: string) => {
        const action = changeTaskTitleAC(id, newTitle, todolistID);
        dispatch(action);
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistID: string) => {  // yes
        const action = ChangeTodolistFilterAC(value, todolistID);
        dispatch(action);
    }, [dispatch])

    const changeTodoListTitle = useCallback((newTitle: string, todoListId: string) => {
        const action = ChangeTodolistTitleAC(newTitle, todoListId);
        dispatch(action);
    }, [dispatch])

    const deleteTodolist = useCallback((todolistID: string) => {  // yes
        const action = RemoveTodolistAC(todolistID);
        dispatch(action);
    }, [dispatch])

    const addTodoList = useCallback((title: string) => { // yes
        const action = AddTodolistAC(title);
        dispatch(action);
    }, [dispatch])


    const todolistItems = todolists.map(item => {

        let tasksForTodolist = tasks[item.id];


        return <Grid item>
            <Paper style={{ padding: "10px" }}>
                <TodoList
                    key={item.id}
                    id={item.id}
                    filter={item.filter}
                    title={item.title}
                    tasks={tasksForTodolist}
                    changeTitle={changeTitle}
                    addTasks={addTasks}
                    removeTasks={removeTasks}
                    changeFilter={changeFilter}
                    changeTodoListTitle={changeTodoListTitle}
                    changeTaskStatus={changeStatus}
                    deleteTodolist={deleteTodolist}
                />
            </Paper>
        </Grid>
    })

    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu />
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: '20px' }}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid>
                    <Grid container spacing={3}>
                        {todolistItems}
                    </Grid>
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
