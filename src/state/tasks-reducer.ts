import { v1 } from 'uuid';
import { TasksStateType } from '../App';
import { TaskType } from '../Todolist/Todolist';
import { AddTodolistACType, RemoveTodoListAcionType, todolistID_1, todolistID_2 } from './todolists-reducer';


const REMOVE_TASK = 'REMOVE-TASK';
const ADD_TASK = 'ADD-TASK';
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS';
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE';

type removeTaskAC = ReturnType<typeof removeTaskAC>;
type addTaskAC = ReturnType<typeof addTaskAC>;
type changeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>;
type changeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>;


type ActionType = removeTaskAC | addTaskAC | changeTaskStatusAC | changeTaskTitleAC | AddTodolistACType | RemoveTodoListAcionType;

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
	switch (action.type) {
		case REMOVE_TASK: {
			let copyState = { ...state };
			copyState[action.todolistId] = state[action.todolistId].filter(item => item.id !== action.id);
			return copyState;
		}
		case ADD_TASK: {
			let newTask: TaskType = { id: v1(), title: action.title, isDone: false };
			return { ...state, [action.todolistId]: [newTask, ...state[action.todolistId]] }
		}
		case CHANGE_TASK_STATUS: {
			let todolistTasks = state[action.todolistId]
			let task = todolistTasks.find(t => t.id === action.id);
			if (task) {
				task.isDone = action.isDone;
			}
			return { ...state };
		}
		case CHANGE_TASK_TITLE: {
			let todolistTasks = state[action.todolistId]
			let task = todolistTasks.find(t => t.id === action.id);
			if (task) {
				task.title = action.newTitle;
			}
			return { ...state }
		}
		case 'ADD-TODOLIST':
			let todolistId = action.todolistId;
			return { ...state, [todolistId]: [] }
		case 'REMOVE-TODOLIST':
			let copyState = { ...state };
			delete copyState[action.id];
			return copyState;
		default:
			return state;
	}
}


export const removeTaskAC = (id: string, todolistId: string) => {
	return { type: REMOVE_TASK, id, todolistId } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
	return { type: ADD_TASK, title, todolistId } as const
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
	return { type: CHANGE_TASK_STATUS, id, isDone, todolistId } as const
}

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
	return { type: CHANGE_TASK_TITLE, id, newTitle, todolistId } as const
}
