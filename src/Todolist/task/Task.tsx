import { Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, useCallback } from 'react';
import { EditableSpan } from '../EditableSpan';
import { TaskType } from '../Todolist';

type TaskPropsType = {
	task: TaskType
	todolistId: string
	changeTaskStatus: (id: string, newIsDoneValue: boolean, todolistId: string) => void
	changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
	removeTask: (taskId: string, todolistId: string) => void

}

export const Task = React.memo((props: TaskPropsType) => {
	console.log('Task is called');

	const onAllClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId),
		[props.task.id, props.todolistId])

	const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked;
		props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId)
	}, [props.task.id, props.changeTaskStatus, props.todolistId])


	const onTitleChangeHandler = useCallback((newTitle: string) => {
		props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
	}, [props.task.id, props.changeTaskTitle, props.todolistId])

	return (
		<div key={props.task.id} className={props.task.isDone ? 'is_done' : ''}>
			<Checkbox color='primary' checked={props.task.isDone} onChange={onChangeHandler} />
			<EditableSpan title={props.task.title} changeTaskTitle={onTitleChangeHandler} />
			<IconButton onClick={onAllClickHandler}>
				<Delete />
			</IconButton>
		</div>
	)
})


