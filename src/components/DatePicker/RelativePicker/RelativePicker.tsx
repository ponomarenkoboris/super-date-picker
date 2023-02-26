import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { DateContext, ReducerTypes } from '../../../context/DateContextProvider'
import { InputField } from '../../common/InputField/InputField'
import './RelativePicker.css'

const options = ['Seconds ago', 'Minutes ago', 'Hours ago', 'Days ago', 'Weeks ago', 'Months ago', 'Years ago', 'Seconds from now', 'Minutes from now', 'Hours from now', 'Days from now', 'Weeks from now', 'Months from now', 'Years from now']

export const RelativePicker: FC = () => {
    const [context, dispatch] = useContext(DateContext)
    const [relativeValue, setRelativeValue] = useState({ numberValue: '', selectValue: options[0] })
    const type = context.startDate.isStartDatePicker ? ReducerTypes.UPDATE_START_DATE : ReducerTypes.UPDATE_END_DATE
    
    const numberChangeHandler = (e : ChangeEvent<HTMLInputElement>) => {
        setRelativeValue(prev => ({ ...prev, numberValue: e.target.value }))
    }
    const selectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setRelativeValue(prev => ({ ...prev, selectValue: e.target.value }))
    }

    useEffect(() => {
        if (relativeValue.numberValue) {
            dispatch({ type, payload: relativeValue.numberValue + ' ' + relativeValue.selectValue })
        }
    }, [relativeValue])
    
    return (
        <div className='relative-picker'>
            <InputField type='number' onChange={numberChangeHandler} />
            <InputField type='select' options={options} onChange={selectChangeHandler} />
        </div>
    )
}
