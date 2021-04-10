import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { useReducer } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todoListsReducer } from './state/todolists-reducer';
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

const AppWithReducers = () => {

    let todolistID_1 = v1();
    let todolistID_2 = v1();

    const [todolists, dispatchToTodolistsReducer] = useReducer(todoListsReducer, [
        { id: todolistID_1, title: 'What to learn', filter: 'all', },
        { id: todolistID_2, title: 'What to buy', filter: 'all', }
    ]);

    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistID_1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'React JS', isDone: false },
            { id: v1(), title: 'Rest API', isDone: false },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
        [todolistID_2]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'React JS', isDone: false },
        ],
    })




    function removeTasks(id: string, todolistID: string) { // yes
        const action = removeTaskAC(id, todolistID);
        dispatchToTasksReducer(action);

        /* const todoListTasks = tasks[todolistID];
        let filteredTasks = todoListTasks.filter(item => item.id !== id);
        tasks[todolistID] = filteredTasks;
        setTasks({ ...tasks }) */
    }
    function addTasks(title: string, todolistID: string) {  // yes
        const action = addTaskAC(title, todolistID);
        dispatchToTasksReducer(action);

        /* let newTask: TaskType = { id: v1(), title: title, isDone: false };
        tasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks({ ...tasks }) */
    }
    function changeStatus(id: string, isDone: boolean, todolistID: string) {  // yes
        const action = changeTaskStatusAC(id, isDone, todolistID);
        dispatchToTasksReducer(action);

        /* let todolistTasks = tasks[todolistID]
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({ ...tasks })
        } */
    }
    function changeTitle(id: string, newTitle: string, todolistID: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistID);
        dispatchToTasksReducer(action);

        /* let todolistTasks = tasks[todolistID]
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({ ...tasks })
        } */
    }
    function changeFilter(value: FilterValuesType, todolistID: string) {  // yes
        const action = ChangeTodolistFilterAC(value, todolistID);
        dispatchToTodolistsReducer(action);

        /* let todolist = todolists.find(item => item.id === todolistID)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        } */
    }
    function changeTodoListTitle(newTitle: string, todoListId: string) {
        const action = ChangeTodolistTitleAC(newTitle, todoListId);
        dispatchToTodolistsReducer(action);


        /* let todolist = todolists.find(item => item.id === todoListId)
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists])
        } */
    }

    function deleteTodolist(todolistID: string) {  // yes
        const action = RemoveTodolistAC(todolistID);
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action);


        /* setTodolists(todolists.filter(item => item.id !== todolistID));
        delete tasks[todolistID];
        setTasks({ ...tasks }); */
    }
    function addTodoList(title: string) { // yes
        const action = AddTodolistAC(title);
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action);


        /* const newTodoListId = v1();
        const newTodolist: TodolistType = {
            id: newTodoListId,
            title: title,
            filter: 'all',
        }
        setTodolists([...todolists, newTodolist])
        setTasks({ ...tasks, [newTodoListId]: [] }) */
    }


    const todolistItems = todolists.map(item => {
        let allTasksForTodolist = tasks[item.id];
        let tasksForTodolist = allTasksForTodolist;

        if (item.filter === 'active') {
            tasksForTodolist = allTasksForTodolist.filter(item => item.isDone === false)
        }
        if (item.filter === 'completed') {
            tasksForTodolist = allTasksForTodolist.filter(item => item.isDone === true)
        }
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

export default AppWithReducers;
