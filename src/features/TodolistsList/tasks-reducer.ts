import { addTodolistAC, AddTodolistActionType, removeTodolistAC, RemoveTodolistActionType, setTodolistsAC, SetTodolistsActionType } from './todolists-reducer'
import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from '../../api/todolists-api'
import { Dispatch } from 'redux'
import { AppRootStateType } from '../../app/store'
import { setAppStatusAC } from '../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC(stateDraft, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            debugger
            const tasks = stateDraft[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(stateDraft, action: PayloadAction<{ task: TaskType }>) {
            stateDraft[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(stateDraft, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = stateDraft[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index] = { ...tasks[index], ...action.payload.model };
            }

        },
        setTasksAC(stateDraft, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            stateDraft[action.payload.todolistId] = action.payload.tasks;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (stateDraft, action) => {
            stateDraft[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolistAC, (stateDraft, action) => {
            delete stateDraft[action.payload.id];
        });
        builder.addCase(setTodolistsAC, (stateDraft, action) => {
            action.payload.todolists.forEach(tl => {
                stateDraft[tl.id] = []
            })
        });
    }
    /* extraReducers: {
        [addTodolistAC.type]: (state, action: PayloadAction<{}>) => { },
        [removeTodolistAC.type]: (state, action: PayloadAction<{}>) => { },
        [setTodolistsAC.type]: (state, action: PayloadAction<{}>) => { }
    } */
})

export const { removeTaskAC, addTaskAC, updateTaskAC, setTasksAC } = slice.actions;
export const tasksReducer = slice.reducer;

/* 
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return { ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId) }
        case 'ADD-TASK':
            return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? { ...t, ...action.model } : t)
            }
        case 'ADD-TODOLIST':
            return { ...state, [action.todolist.id]: [] }
        case 'REMOVE-TODOLIST':
            const copyState = { ...state }
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = { ...state }
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return { ...state, [action.todolistId]: action.tasks }
        default:
            return state
    }
} */

// actions
/* export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({ type: 'REMOVE-TASK', taskId, todolistId } as const)
export const addTaskAC = (task: TaskType) =>
    ({ type: 'ADD-TASK', task } as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({ type: 'UPDATE-TASK', model, todolistId, taskId } as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({ type: 'SET-TASKS', tasks, todolistId } as const) */
// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC({ tasks, todolistId }))
            dispatch(setAppStatusAC({ status: 'succeeded' }))
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            const action = removeTaskAC({ taskId, todolistId })
            dispatch(action)
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                const action = addTaskAC({ task })
                dispatch(action)
                dispatch(setAppStatusAC({ status: 'succeeded' }))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC({ taskId, model: domainModel, todolistId })
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            })
    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>

type ThunkDispatch = Dispatch<ActionsType>

