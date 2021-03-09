import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { FilterValuesType } from '../App';

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
}

const TodoList: React.FC<TodolistPropsType> = ({ id, title, tasks, filter, removeTasks, changeFilter, addTasks, changeTaskStatus, deleteTodolist }) => {

	const renderTasks = tasks.map(item => {

		const onAllClickHandler = () => {
			removeTasks(item.id, id)
		}
		const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			let newIsDoneValue = e.currentTarget.checked;
			changeTaskStatus(item.id, newIsDoneValue, id)
		}

		return (
			<li key={item.id} className={item.isDone ? 'is_done' : ''}>
				<input type='checkbox' checked={item.isDone} onChange={onChangeHandler} />
				<span>{item.title}</span>
				<button onClick={onAllClickHandler}>X</button>
			</li>
		)
	})

	let [taskTitle, setTitle] = useState<string>('');
	let [error, setError] = useState<string | null>(null)

	let addTask = () => {
		const trimmedTitle = taskTitle.trim();
		if (trimmedTitle) {
			addTasks(trimmedTitle, id)
		} else {
			setError('Title is required')
		}
		setTitle('')
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (e.key === 'Enter') {
			addTask()
		}
	}

	const deleteTodolistButton = () => deleteTodolist(id);

	const onAllClickHandler = () => changeFilter('all', id);
	const onActiveClickHandler = () => changeFilter('active', id);
	const onCompletedClickHandler = () => changeFilter('completed', id);

	return (
		<div>
			<h3>{title}<button onClick={deleteTodolistButton}>X</button></h3>
			<div>
				<input value={taskTitle}
					onChange={onChangeHandler}
					onKeyPress={onKeyPressHandler}
					className={error ? 'error' : ''} />
				<button onClick={addTask}>+</button>
				{error && <div className='error_message'>{error}</div>}
			</div>
			<ul>
				{renderTasks}
			</ul>
			<div>
				<button className={filter === 'all' ? 'active_filter' : ''} onClick={onAllClickHandler}>All</button>
				<button className={filter === 'active' ? 'active_filter' : ''} onClick={onActiveClickHandler}>Active</button>
				<button className={filter === 'completed' ? 'active_filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
			</div>
		</div>
	)
}

export default TodoList;