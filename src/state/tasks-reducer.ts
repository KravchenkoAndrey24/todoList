import { useDispatch } from 'react-redux';
import { v1 } from 'uuid';
import { TasksStateType } from '../App';
import { TaskType } from '../Todolist/Todolist';
import { AddTodolistACType, RemoveTodoListAcionType } from './todolists-reducer';


enum TASKS_ACTIONS_TYPES {
	REMOVE_TASK = 'REMOVE-TASK',
	ADD_TASK = 'ADD-TASK',
	CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS',
	CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE',
	REMOVE_TODOLIST = 'REMOVE-TODOLIST',
	ADD_TODOLIST = 'ADD-TODOLIST',

}

type removeTaskAC = ReturnType<typeof removeTaskAC>;
type addTaskAC = ReturnType<typeof addTaskAC>;
type changeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>;
type changeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>;


type ActionType = removeTaskAC | addTaskAC | changeTaskStatusAC | changeTaskTitleAC | AddTodolistACType | RemoveTodoListAcionType;

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
	switch (action.type) {
		case TASKS_ACTIONS_TYPES.REMOVE_TASK: {
			let copyState = { ...state };
			copyState[action.todolistId] = state[action.todolistId].filter(item => item.id !== action.id);
			return copyState;
		}
		case TASKS_ACTIONS_TYPES.ADD_TASK: {
			let newTask: TaskType = { id: v1(), title: action.title, isDone: false };
			return { ...state, [action.todolistId]: [newTask, ...state[action.todolistId]] }
		}
		case TASKS_ACTIONS_TYPES.CHANGE_TASK_STATUS: {
			let todolistTasks = state[action.todolistId]
			let newTasksArray = todolistTasks
				.map(t => t.id === action.id ? { ...t, isDone: action.isDone } : t);
			state[action.todolistId] = newTasksArray;
			return { ...state };
		}
		case TASKS_ACTIONS_TYPES.CHANGE_TASK_TITLE: {
			let todolistTasks = state[action.todolistId]
			let newTasksArray = todolistTasks
				.map(t => t.id === action.id ? { ...t, title: action.newTitle } : t);

			state[action.todolistId] = newTasksArray;
			return { ...state }
		}
		case TASKS_ACTIONS_TYPES.ADD_TODOLIST:
			let todolistId = action.todolistId;
			return { ...state, [todolistId]: [] }
		case TASKS_ACTIONS_TYPES.REMOVE_TODOLIST:
			let copyState = { ...state };
			delete copyState[action.id];
			return copyState;
		default:
			return state;
	}
}


export const removeTaskAC = (id: string, todolistId: string) => {
	return { type: TASKS_ACTIONS_TYPES.REMOVE_TASK, id, todolistId } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
	return { type: TASKS_ACTIONS_TYPES.ADD_TASK, title, todolistId } as const
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
	return { type: TASKS_ACTIONS_TYPES.CHANGE_TASK_STATUS, id, isDone, todolistId } as const
}

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
	return { type: TASKS_ACTIONS_TYPES.CHANGE_TASK_TITLE, id, newTitle, todolistId } as const
}
