import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dispatch } from "redux"
import { authAPI } from "../api/todolists-api"
import { setIsLoggedInAC } from "../features/Login/auth-reducer"

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAppErrorAC(stateDraft, action: PayloadAction<{ error: string | null }>) {
            stateDraft.error = action.payload.error;
        },
        setAppStatusAC(stateDraft, action: PayloadAction<{ status: RequestStatusType }>) {
            stateDraft.status = action.payload.status;
        },
        setAppIsInitialized(stateDraft, action: PayloadAction<{ isInitialized: boolean }>) {
            stateDraft.isInitialized = action.payload.isInitialized;
        },
    }
})

export const { setAppErrorAC, setAppStatusAC, setAppIsInitialized } = slice.actions;


export const appReducer = slice.reducer;
/* (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        case 'APP/SET-INIT':
            return { ...state, isInitialized: action.isInitialized }
        default:
            return { ...state }
    }
} */

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}

/* export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setAppIsInitialized = (isInitialized: boolean) => ({ type: 'APP/SET-INIT', isInitialized } as const)
 */

/* export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppSetAppIsInitialized = ReturnType<typeof setAppIsInitialized>
 */
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({ value: true }));
        } else {
        }
        dispatch(setAppIsInitialized({ isInitialized: true }));
    })
}



/* type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppSetAppIsInitialized */
