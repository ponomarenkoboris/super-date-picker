import { FC, useState } from 'react'
import { Calendar } from './Calendar/Calendar'
import { RelativePicker } from './RelativePicker/RelativePicker'
import { Now } from './Now/Now'
import './DatePicker.css'

enum ControllerPositions {
    ABSOLUTE = 1,
    RELATIVE = 2,
    NOW = 3
}
// props: { isStartDatePicker, isEndDatePicker }
export const DatePicker: FC = () => {
    const [switchController, setSwitchController] = useState<ControllerPositions>(ControllerPositions.ABSOLUTE)

    const calculateWidth = (controllerPosition: ControllerPositions): string => {
        return switchController === controllerPosition ? '100%' : '0' 
    }
    

    return (
        <div className='date-picker'>
            <ul className="date-type-selector">
                <li className='date-type__item' onClick={() => setSwitchController(ControllerPositions.ABSOLUTE)}>
                    <p>Absolute</p>
                    <div 
                        className="underline"
                        style={{ width: calculateWidth(ControllerPositions.ABSOLUTE) }}
                    ></div>
                </li>
                <li className='date-type__item' onClick={() => setSwitchController(ControllerPositions.RELATIVE)}>
                    <p>Relative</p>
                    <div 
                        className="underline"
                        style={{ width: calculateWidth(ControllerPositions.RELATIVE) }}
                    ></div>
                </li>
                <li className='date-type__item' onClick={() => setSwitchController(ControllerPositions.NOW)}>
                    <p>Now</p>
                    <div 
                        className="underline"
                        style={{ width: calculateWidth(ControllerPositions.NOW) }}
                    ></div>
                </li>
            </ul>
            {switchController === ControllerPositions.ABSOLUTE && <Calendar />}
            {switchController === ControllerPositions.RELATIVE && <RelativePicker />}
            {switchController === ControllerPositions.NOW && <Now />}
        </div>
    )
}
