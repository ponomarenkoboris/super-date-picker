import { FC } from 'react'
import { DateContextProvider } from '../context/DateContextProvider'
import { SuperPicker } from './SuperPicker/SuperPicker'

export const SuperDatePicker: FC = () => {
    const onTimeChange = (obj: { start: string, end: string }) => {
        console.log(obj)
    }
    return (
        <DateContextProvider>
            <SuperPicker start='Thu Feb 02 2023' end='Tue Feb 28 2023' onTimeChange={onTimeChange} />
        </DateContextProvider>
    )
}