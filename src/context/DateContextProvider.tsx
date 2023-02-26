import { FC, ReactNode, createContext, useReducer, Dispatch } from 'react'

type DateType = Date | null | string
type DefaultDateType = {
    start?: DateType,
    end?: DateType
}
export type DateState = { 
    isShowStartEnd: boolean,
    quickDate: {
        isQuickValue: boolean,
        date: DateType
    }, 
    startDate: {
        date: DateType,
        isStartDatePicker: boolean
    }, 
    endDate: {
        date: DateType,
        isEndDatePicker: boolean
    }
}
const intialState: DateState = { 
    isShowStartEnd: false,
    quickDate: {
        isQuickValue: false,
        date: 'Last 20 seconds'
    }, 
    startDate: {
        date: null,
        isStartDatePicker: false
    }, 
    endDate: {
        date: null,
        isEndDatePicker: false
    } 
}

export enum ReducerTypes {
    TOOGLE_START_DATE_PICKER = 'TOOGLE_START_DATE_PICKER',
    TOOGLE_END_DATE_PICKER = 'TOOGLE_END_DATE_PICKER',
    TOOGLE_START_AND_END_DATES = 'TOOGLE_START_AND_END_DATES',
    UPDATE_START_DATE = 'UPDATE_START_DATE',
    UPDATE_END_DATE = 'UPDATE_END_DATE',
    SET_IS_QUICK_DATE = 'SET_IS_QUICK_DATE',
    SET_QUICK_DATE = 'SET_QUICK_DATE',
    RESEST_SUPER_DATE_PICKER = 'RESEST_SUPER_DATE_PICKER',
    CLOSE_ALL_PICKERS = 'CLOSE_ALL_PICKERS',
    SET_DEFAULT_VALUES = 'SET_DEFAULT_VALUES'
}

type DateContextReducerAction = {
    type: ReducerTypes,
    payload?: DateType | DefaultDateType
}
const reducer = (state: DateState, action: DateContextReducerAction): DateState => {
    switch (action.type) {
        case ReducerTypes.CLOSE_ALL_PICKERS:
            return {
                ...state,
                quickDate: {
                    ...state.quickDate,
                    isQuickValue: false
                },
                startDate: { 
                    ...state.startDate, 
                    isStartDatePicker: false 
                },
                endDate: {
                    ...state.endDate,
                    isEndDatePicker: false                    
                }
            }
        case ReducerTypes.TOOGLE_START_DATE_PICKER:
            return { 
                ...state, 
                quickDate: {
                    ...state.quickDate,
                    isQuickValue: false
                },
                startDate: { 
                    ...state.startDate, 
                    isStartDatePicker: !state.startDate.isStartDatePicker 
                },
                endDate: {
                    ...state.endDate,
                    isEndDatePicker: false                    
                }
            }
        case ReducerTypes.TOOGLE_END_DATE_PICKER:
            return {
                ...state,
                quickDate: {
                    ...state.quickDate,
                    isQuickValue: false
                },
                startDate: {
                    ...state.startDate,
                    isStartDatePicker: false
                },
                endDate: {
                    ...state.endDate,
                    isEndDatePicker: !state.endDate.isEndDatePicker                    
                }
            }
        case ReducerTypes.TOOGLE_START_AND_END_DATES:
            return {
                ...state,
                isShowStartEnd: !state.isShowStartEnd
            }
            
        case ReducerTypes.UPDATE_START_DATE:
            return {
                ...state,
                startDate: {
                    ...state.startDate,
                    date: action.payload! as DateType
                }
            }
        case ReducerTypes.UPDATE_END_DATE:
            return {
                ...state,
                endDate: {
                    ...state.endDate,
                    date: action.payload! as DateType
                }
            }
        case ReducerTypes.SET_IS_QUICK_DATE:
            return {
                ...state,
                quickDate: {
                    ...state.quickDate,
                    isQuickValue: !state.quickDate.isQuickValue
                },
                startDate: {
                    ...state.startDate,
                    isStartDatePicker: false
                },
                endDate: {
                    ...state.endDate,
                    isEndDatePicker: false
                },
            }
        case ReducerTypes.SET_QUICK_DATE:
            return {
                ...state,
                quickDate: {
                    ...state.quickDate,
                    date: action.payload! as DateType
                }
            }
        case ReducerTypes.SET_DEFAULT_VALUES: {
            return {
                ...state,
                isShowStartEnd: true,
                startDate: {
                    ...state.startDate,
                    date: (action.payload as DefaultDateType).start!
                },
                endDate: {
                    ...state.endDate,
                    date: (action.payload as DefaultDateType).end!
                }
            }
        }
        case ReducerTypes.RESEST_SUPER_DATE_PICKER:
            return intialState
            
        default:
            return state
    }
}

type DateStateContext = [DateState, Dispatch<DateContextReducerAction>]
export const DateContext = createContext<DateStateContext>([intialState, () => {} ])

interface DateContextProps {
    children: ReactNode
}

export const DateContextProvider: FC<DateContextProps> = ({ children }) => {
    const dateState = useReducer(reducer, intialState)
    return (
        <DateContext.Provider value={dateState}>{children}</DateContext.Provider>
    )
}
