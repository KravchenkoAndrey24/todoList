import { TextField } from '@material-ui/core';
import React, { ChangeEvent, useState, KeyboardEvent } from 'react';


type EditableSpanPropsType = {
	title: string
	changeTaskTitle: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

	let [title, setTitle] = useState(props.title);
	let [editMode, setEditMode] = useState<boolean>(false);


	const onIditMode = () => {
		setEditMode(true)
	}
	const offIditMode = () => {
		setEditMode(false)
		props.changeTaskTitle(title)
	}


	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setEditMode(false)
			props.changeTaskTitle(title)
		}
	}

	return (
		editMode
			? <TextField variant='outlined' size='small' value={title} onChange={changeTitle} onKeyPress={onKeyPress} autoFocus onBlur={offIditMode} />
			: <span onDoubleClick={onIditMode}>{props.title}</span>

	)
}

