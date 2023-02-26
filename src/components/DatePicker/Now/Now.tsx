import { useContext } from 'react'
import { DateContext, ReducerTypes } from '../../../context/DateContextProvider'
import { Button } from '../../common/Button/Button'
import './Now.css'

export const Now = () => {
    const [context, dispatch] = useContext(DateContext)
    const type = context.startDate.isStartDatePicker ? ReducerTypes.UPDATE_START_DATE : ReducerTypes.UPDATE_END_DATE
    const setDateToNow = () => {
        dispatch({ type, payload: 'now' })
    }

    return (
        <div className='now-picker'>
            <p>Setting the time to "now" means that on every refresh this time will be set to the time of the refresh.</p>
            <Button onClick={setDateToNow} type='main' >Set start date and time to now</Button>
        </div>
    )
}
