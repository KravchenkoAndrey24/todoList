import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from '../App';




type RemoveTodoListAcionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}

type AddTodoListActionType = {
	type: 'ADD-TODOLIST'
	title: string
}

type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	newTitle: string
	todoListId: string
}

type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER'
	value: FilterValuesType
	todolistID: string
}

type ActionType = RemoveTodoListAcionType | AddTodoListActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

export const todoListsReducer = (todolists: TodolistType[], action: ActionType) => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return todolists.filter(item => item.id !== action.id);
		case 'ADD-TODOLIST':
			const newTodoListId = v1();
			const newTodolist: TodolistType = {
				id: newTodoListId,
				title: action.title,
				filter: 'all',
			}
			return [...todolists, newTodolist]
		case 'CHANGE-TODOLIST-TITLE':
			let todolist = todolists.find(item => item.id === action.todoListId)
			if (todolist) {
				todolist.title = action.newTitle;
				return [...todolists]
			}
			return todolists
		case 'CHANGE-TODOLIST-FILTER': {
			let todolist = todolists.find(item => item.id === action.todolistID)
			if (todolist) {
				todolist.filter = action.value;
				return [...todolists]
			}
			return todolists
		}
		default:
			throw new Error('I dont understand this type')
	}
}

export const RemoveTodolistAC = (id: string): RemoveTodoListAcionType => {
	return { type: 'REMOVE-TODOLIST', id }
}

export const AddTodolistAC = (title: string): AddTodoListActionType => {
	return { type: 'ADD-TODOLIST', title };
}

export const ChangeTodolistTitleAC = (newTitle: string, todoListId: string): ChangeTodolistTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', newTitle, todoListId };
}

export const ChangeTodolistFilterAC = (value: FilterValuesType, todolistID: string): ChangeTodolistFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', value, todolistID };
}
