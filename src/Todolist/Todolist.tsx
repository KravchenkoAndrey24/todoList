import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, useCallback } from 'react';
import { FilterValuesType } from '../App';
import { AddItemForm } from './AddItemForm/AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Task } from './task/Task';

export type TaskType = {
	id: string,
	title: string,
	isDone: boolean,
}

export type TodolistPropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	filter: FilterValuesType
	removeTasks: (taskId: string, todolistID: string) => void
	changeFilter: (value: FilterValuesType, todolistID: string) => void
	addTasks: (title: string, todolistID: string) => void
	changeTaskStatus: (id: string, isDone: boolean, todolistID: string) => void
	deleteTodolist: (todolistID: string) => void
	changeTodoListTitle: (newTitle: string, todoListId: string) => void
	changeTitle: (id: string, title: string, todolistID: string) => void
}

const TodoList = React.memo((props: TodolistPropsType) => {
	console.log('TodoList called');


	let tasksForTodolist = props.tasks;

	if (props.filter === 'active') {
		tasksForTodolist = props.tasks.filter(item => item.isDone === false)
	}
	if (props.filter === 'completed') {
		tasksForTodolist = props.tasks.filter(item => item.isDone === true)
	}


	const renderTasks = tasksForTodolist.map(item => {

		return (<Task
			key={item.id}
			task={item}
			todolistId={props.id}
			removeTask={props.removeTasks}
			changeTaskTitle={props.changeTitle}
			changeTaskStatus={props.changeTaskStatus} />
		)
	})

	const addTask = useCallback((title: string) => { props.addTasks(title, props.id) }, [props.addTasks, props.id])
	const deleteTodolistButton = () => props.deleteTodolist(props.id);
	const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.id), [props.changeTodoListTitle, props.id]);


	const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id]);
	const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id]);
	const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id]);


	return (
		<div>
			<h3>
				<EditableSpan title={props.title} changeTaskTitle={changeTodoListTitle} />
				<IconButton onClick={deleteTodolistButton}>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForm addItem={addTask} />
			<div>
				{renderTasks}
			</div>
			<div>
				<Button variant={props.filter === 'all' ? 'outlined' : 'text'} color='default' onClick={onAllClickHandler}>All</Button>
				<Button variant={props.filter === 'active' ? 'outlined' : 'text'} color='primary' onClick={onActiveClickHandler}>Active</Button>
				<Button variant={props.filter === 'completed' ? 'outlined' : 'text'} color='secondary' onClick={onCompletedClickHandler}>Completed</Button>
			</div>
		</div>
	)
})


export default TodoList;