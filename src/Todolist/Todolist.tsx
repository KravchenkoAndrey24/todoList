import { Button, Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent } from 'react';
import { FilterValuesType } from '../App';
import { AddItemForm } from './AddItemForm/AddItemForm';
import { EditableSpan } from './EditableSpan';

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

function TodoList(props: TodolistPropsType) {
	const renderTasks = props.tasks.map(item => {

		const onAllClickHandler = () => {
			props.removeTasks(item.id, props.id)
		}
		const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			let newIsDoneValue = e.currentTarget.checked;
			props.changeTaskStatus(item.id, newIsDoneValue, props.id)
		}
		const changeTaskTitle = (newTitle: string) => {
			props.changeTitle(item.id, newTitle, props.id)
		}

		return (
			<div key={item.id} className={item.isDone ? 'is_done' : ''}>
				<Checkbox color='primary' checked={item.isDone} onChange={onChangeHandler} />
				<EditableSpan title={item.title} changeTaskTitle={changeTaskTitle} />
				<IconButton onClick={onAllClickHandler}>
					<Delete />
				</IconButton>
			</div>
		)
	})

	const addTask = (title: string) => { props.addTasks(title, props.id) }
	const deleteTodolistButton = () => props.deleteTodolist(props.id);
	const onAllClickHandler = () => props.changeFilter('all', props.id);
	const onActiveClickHandler = () => props.changeFilter('active', props.id);
	const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
	const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id);
	console.log(props.title)
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
}


export default TodoList;