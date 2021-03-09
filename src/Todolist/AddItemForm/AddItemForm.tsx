import React, { ChangeEvent, useState, KeyboardEvent } from 'react';

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

	let [taskTitle, setTitle] = useState<string>('');
	let [error, setError] = useState<string | null>(null)


	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
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
			<input value={taskTitle}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				className={error ? 'error' : ''} />
			<button onClick={addItem}>+</button>
			{error && <div className='error_message'>{error}</div>}
		</div>
	)
}

