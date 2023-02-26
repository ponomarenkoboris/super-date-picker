import { FC, useContext, MouseEvent, useEffect } from 'react'
import { DateContext, ReducerTypes } from '../../context/DateContextProvider';
import { QuickSelector } from '../QuickSelector/QuickSelector';
import { DatePicker } from '../DatePicker/DatePicker'
import './SuperPicker.css'

interface DatePickerProps {
    start?: string;
    end?: string;
    onTimeChange?: ({ start, end }: { start: string, end: string }) => void;
}

export const SuperPicker: FC<DatePickerProps> = ({ onTimeChange, start, end }) => {
    const [{ quickDate, startDate, endDate, isShowStartEnd }, dispatch] = useContext(DateContext);

    const openQuickSelector = () => {
        dispatch({ type: ReducerTypes.SET_IS_QUICK_DATE })
    }

    const toogleStartEnd = (e: MouseEvent) => {
        e.stopPropagation()

        if (startDate.isStartDatePicker || endDate.isEndDatePicker) return
        
        dispatch({ type: ReducerTypes.TOOGLE_START_AND_END_DATES })
        
        if (quickDate.isQuickValue) {
            dispatch({ type: ReducerTypes.SET_IS_QUICK_DATE })
        }
    }

    const toogleStartDateSelector = (e: MouseEvent) => {
        e.stopPropagation()
        dispatch({ type: ReducerTypes.TOOGLE_START_DATE_PICKER })
    }

    const toobleEndDateSelector = (e: MouseEvent) => {
        e.stopPropagation()
        dispatch({ type: ReducerTypes.TOOGLE_END_DATE_PICKER })
    }

    const closeDatePicker = (e: globalThis.MouseEvent) => {
        const target = e.target as HTMLElement
        if (!target.closest('.super-date-picker')) {
            dispatch({ type: ReducerTypes.CLOSE_ALL_PICKERS })
        }
    }

    useEffect(() => {
        if (start || end) dispatch({ type: ReducerTypes.SET_DEFAULT_VALUES, payload: { start, end } })
    }, [])

    useEffect(() => {
        if (onTimeChange && isShowStartEnd) onTimeChange({ start: startDate.date as string, end: endDate.date as string })
        if (onTimeChange && !isShowStartEnd) onTimeChange({ start: '', end: quickDate.date as string })

        if (startDate.isStartDatePicker || endDate.isEndDatePicker || quickDate.isQuickValue) document.addEventListener('click', closeDatePicker)
        if (!startDate.isStartDatePicker && !endDate.isEndDatePicker && !quickDate.isQuickValue) document.removeEventListener('click', closeDatePicker)

        return () => document.removeEventListener('click', closeDatePicker)
    }, [startDate, endDate, quickDate, isShowStartEnd])

    return (
        <div className='super-date-picker'>
            <button className='quick-selector__drop-controller' onClick={openQuickSelector}>Quick Select</button>
            {quickDate.isQuickValue && <QuickSelector />}
            <div className='choosen-date-wrapper'>
                <div className='choosen-date' onClick={toogleStartEnd}>
                    {!isShowStartEnd ? (
                        <>
                            <p>{quickDate.date as string}</p>
                            <p className='choosen-date__subtitle'>Show dates</p>
                        </>
                    ) : (
                        <div className='absolute-dates'>
                            <div className='picked-start-date' onClick={toogleStartDateSelector}>
                                <p>{startDate.date as string || 'Start date'}</p>
                            </div>
                            <div className='picked-end-date' onClick={toobleEndDateSelector}>
                                <p>{endDate.date as string || 'End date' }</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {startDate.isStartDatePicker && <DatePicker />}
            {endDate.isEndDatePicker && <DatePicker />}
        </div>
    )
}
