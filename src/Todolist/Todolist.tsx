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
			<li key={item.id} className={item.isDone ? 'is_done' : ''}>
				<input type='checkbox' checked={item.isDone} onChange={onChangeHandler} />
				<EditableSpan title={item.title} changeTaskTitle={changeTaskTitle} />
				<button onClick={onAllClickHandler}>X</button>
			</li>
		)
	})

	const addTask = (title: string) => { props.addTasks(title, props.id) }
	const deleteTodolistButton = () => props.deleteTodolist(props.id);
	const onAllClickHandler = () => props.changeFilter('all', props.id);
	const onActiveClickHandler = () => props.changeFilter('active', props.id);
	const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
	const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id);

	return (
		<div>
			<h3>
				<EditableSpan title={props.title} changeTaskTitle={changeTodoListTitle} />
				<button onClick={deleteTodolistButton}>X</button>
			</h3>
			<AddItemForm addItem={addTask} />
			<ul>
				{renderTasks}
			</ul>
			<div>
				<button className={props.filter === 'all' ? 'active_filter' : ''} onClick={onAllClickHandler}>All</button>
				<button className={props.filter === 'active' ? 'active_filter' : ''} onClick={onActiveClickHandler}>Active</button>
				<button className={props.filter === 'completed' ? 'active_filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
			</div>
		</div>
	)
}


export default TodoList;