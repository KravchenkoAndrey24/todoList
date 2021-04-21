import { Button, IconButton, TextField } from '@material-ui/core';
import { AddBox, Delete } from '@material-ui/icons';
import React, { ChangeEvent, useState, KeyboardEvent } from 'react';

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

	console.log('AddItemForm called');

	let [taskTitle, setTitle] = useState<string>('');
	let [error, setError] = useState<string | null>(null)


	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (error !== null) setError(null);
		if (e.key === 'Enter') {
			addItem()
		}
	}

	let addItem = () => {
		const trimmedTitle = taskTitle.trim();
		if (trimmedTitle) {
			props.addItem(trimmedTitle)
		} else {
			setError('Title is required')
		}
		setTitle('')
	}


	return (
		<div>
			<TextField
				size='small'
				variant='outlined'
				value={taskTitle}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				error={!!error}
				label='Title'
				helperText={error} />
			<IconButton color='primary' onClick={addItem}>
				<AddBox />
			</IconButton>
		</div >
	)
})

