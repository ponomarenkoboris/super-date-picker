import { FC, useState, useMemo, MouseEvent, useRef, memo, useContext } from 'react'
import { DateContext, ReducerTypes, DateState } from '../../../context/DateContextProvider'
import './Calendar.css'

const months: string[] = ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.']

const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Su', 'Sat']

interface TimeDate {
    month: number;
    year: number;
}

type DaysInMonth = {
    year: number,
    month: number,
    days: number[][]
}

const getDaysInMonthArray = (year: number, month: number): number[][] => {
    const count = new Date(year, month + 1, 0).getDate()
    const result: number[][] = []

    for (let i = 1; i <= count; i++) {
        let dayOfWeekIdx = new Date(year, month, i).getDay() - 1
        if (dayOfWeekIdx < 0) dayOfWeekIdx = 6
        result[dayOfWeekIdx] = result[dayOfWeekIdx] ? [...result[dayOfWeekIdx], i] : [i]
    }

    return result
}

const calculateDaysColumnJustyfi = () => {
    let isColumnJustifyStart: boolean = false

    return (weekDaysList: number[]) => {
        let columnJustyfiDirection: 'flex-start' | 'center' | 'flex-end' = 'flex-start'
        
        if (weekDaysList[0] === 1 && !isColumnJustifyStart) {
            isColumnJustifyStart = true 
        } else if (weekDaysList.length === 5 && !isColumnJustifyStart) {
            columnJustyfiDirection = 'flex-end'
        } else if (!isColumnJustifyStart) {
            columnJustyfiDirection = 'center'
        }
        
        return columnJustyfiDirection
    }
}

const markChoosenDay = (ulElement: HTMLUListElement, choosenDay: HTMLButtonElement): void => {
    if (!choosenDay.classList.contains('day_chosen')) {
        const dayButtons = ulElement.querySelectorAll('.day')
        dayButtons.forEach(element => element.classList.remove('day_chosen'))
        choosenDay.classList.add('day_chosen')
    } else {
        choosenDay.classList.remove('day_chosen')
    }
}

export const Calendar: FC = memo(() => {
    const date = new Date()
    const timeDate = { month: date.getMonth(), year: date.getFullYear() }
    const daysList = useRef<HTMLUListElement>(null)
    const [layoutDate, setLayoutDate] = useState<TimeDate>(timeDate)
    const days = useMemo<number[][]>(() => getDaysInMonthArray(layoutDate.year, layoutDate.month), [layoutDate.month])
    const [context, dispatch] = useContext(DateContext)
    const columnJustyfi = calculateDaysColumnJustyfi()

    const previousMonth = () => {
        if (layoutDate.month - 1 < 0) {
            setLayoutDate({ ...layoutDate, month: 11, year: --layoutDate.year })
        } else {
            setLayoutDate({ ...layoutDate, month: --layoutDate.month})
        }
    }
    const nextMonth = () => {
        if (layoutDate.month + 1 > 11) {
            setLayoutDate({ ...layoutDate, month: 0, year: layoutDate.year + 1 })
        } else {
            setLayoutDate({ ...layoutDate, month: layoutDate.month + 1})
        }
    }

    const datePickHandler = (event: MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLButtonElement

        if (!target || !target.dataset.date || !daysList.current) return

        markChoosenDay(daysList.current, target)
        const pickedDate = target.dataset.date
        const type = context.startDate.isStartDatePicker ? ReducerTypes.UPDATE_START_DATE : ReducerTypes.UPDATE_END_DATE
        dispatch({ type, payload: pickedDate })
    }


    return (
        <div className="calendar">
            <div className="calendar__month">
                <button className="month__controller" onClick={previousMonth}></button>
                <p className='month__name'>{months[layoutDate.month]} {layoutDate.year}</p>
                <button className="month__controller" onClick={nextMonth}></button>
            </div>
            <div className="calendar__days" onClick={datePickHandler}>
                <ul className='days__list'>
                    {daysOfWeek.map(day => (
                        <li key={day} className="days__item">{day}</li>
                    ))}
                </ul>
                <ul ref={daysList} className='days-of-week__list'>
                    {days.map((value) => {
                        
                        return (
                            <li key={JSON.stringify(value)} 
                                className="days-column"
                                style={{ justifyContent: columnJustyfi(value) }}
                            >
                                {value.map(day => {
                                    const date = new Date(layoutDate.year, layoutDate.month, day).toDateString()
                                    const pickedDate = context.startDate.isStartDatePicker ? context.startDate.date : context.endDate.date
                                    return (
                                        <button 
                                            key={JSON.stringify(value) + JSON.stringify(day)} 
                                            data-date={date} 
                                            className={`day ${pickedDate === date ? 'day_chosen' : ''}`}
                                        >{day}</button>
                                    )
                                })}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div> 
    )
}
)