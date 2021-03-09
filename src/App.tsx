import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { AddItemForm } from './Todolist/AddItemForm/AddItemForm';
import TodoList, { TaskType } from './Todolist/Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: TaskType[]
}

const App = () => {

    let todolistID_1 = v1();
    let todolistID_2 = v1();

    let [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistID_1, title: 'What to learn', filter: 'all', },
        { id: todolistID_2, title: 'What to buy', filter: 'all', }
    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
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


    function removeTasks(id: string, todolistID: string) {
        const todoListTasks = tasks[todolistID];
        let filteredTasks = todoListTasks.filter(item => item.id !== id);
        tasks[todolistID] = filteredTasks;
        setTasks({ ...tasks })
    }
    function addTasks(title: string, todolistID: string) {
        let newTask: TaskType = { id: v1(), title: title, isDone: false };
        tasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks({ ...tasks })
    }
    function changeStatus(id: string, isDone: boolean, todolistID: string) {
        let todolistTasks = tasks[todolistID]
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({ ...tasks })
        }
    }
    function changeTitle(id: string, newTitle: string, todolistID: string) {
        let todolistTasks = tasks[todolistID]
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({ ...tasks })
        }
    }
    function changeFilter(value: FilterValuesType, todolistID: string) {
        let todolist = todolists.find(item => item.id === todolistID)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }
    function changeTodoListTitle(newTitle: string, todoListId: string) {
        let todolist = todolists.find(item => item.id === todoListId)
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists])
        }
    }

    function deleteTodolist(todolistID: string) {
        setTodolists(todolists.filter(item => item.id !== todolistID));
        delete tasks[todolistID];
        setTasks({ ...tasks });
    }
    function addTodoList(title: string) {
        const newTodoListId = v1();
        const newTodolist: TodolistType = {
            id: newTodoListId,
            title: title,
            filter: 'all',
        }
        setTodolists([...todolists, newTodolist])
        setTasks({ ...tasks, [newTodoListId]: [] })
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
        return <TodoList
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
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {todolistItems}
        </div>
    );
}

export default App;
