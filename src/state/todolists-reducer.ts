import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from '../App';

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
export const ADD_TODOLIST = 'ADD-TODOLIST';
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE';
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER';

export type RemoveTodoListAcionType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistACType = ReturnType<typeof AddTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>;
export type ChangeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>;


type ActionType = RemoveTodoListAcionType | AddTodolistACType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

export const todoListsReducer = (todolists: TodolistType[], action: ActionType) => {
	switch (action.type) {
		case REMOVE_TODOLIST:
			return todolists.filter(item => item.id !== action.id);
		case ADD_TODOLIST:
			const newTodolist: TodolistType = {
				id: action.todolistId,
				title: action.title,
				filter: 'all',
			}
			return [...todolists, newTodolist]
		case CHANGE_TODOLIST_TITLE:
			let todolist = todolists.find(item => item.id === action.todoListId)
			if (todolist) {
				todolist.title = action.newTitle;
				return [...todolists]
			}
			return todolists
		case CHANGE_TODOLIST_FILTER: {
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

export const RemoveTodolistAC = (id: string) => {
	return { type: REMOVE_TODOLIST, id } as const
}

export const AddTodolistAC = (title: string) => {
	return { type: ADD_TODOLIST, title, todolistId: v1() } as const;
}

export const ChangeTodolistTitleAC = (newTitle: string, todoListId: string) => {
	return { type: CHANGE_TODOLIST_TITLE, newTitle, todoListId } as const;
}

export const ChangeTodolistFilterAC = (value: FilterValuesType, todolistID: string) => {
	return { type: CHANGE_TODOLIST_FILTER, value, todolistID } as const;
}
