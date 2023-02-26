import { FC, useState, useRef, useContext } from 'react'
import { DateContext, ReducerTypes } from '../../context/DateContextProvider'
import { InputField } from '../common/InputField/InputField'
import { Button } from '../common/Button/Button'
import './QuickSelector.css'

const commonlyUsed = [
    'Today', 'This week', 'This month', 'This year', 'Yesterday', 'Week to date', 'Month to date', 'Year to date'
]

const numberSystem = [
    'seconds',
    'minutes',
    'hours',
    'days',
    'weeks',
    'months',
    'years'
]

const quickOptions = ['Last', 'Next']

export const QuickSelector: FC = () => {
    const refreshNumber = useRef<HTMLInputElement>(null)
    const refreshSelector = useRef<HTMLSelectElement>(null)
    const quickSelect = useRef<HTMLSelectElement>(null)
    const quickNumber = useRef<HTMLInputElement>(null)
    const quickSelectSystem = useRef<HTMLSelectElement>(null)
    const [recentlyUsed, setRecentlyUsed] = useState([])
    const [, dispatch] = useContext(DateContext)

    const submitRefresh = () => {
        console.log(refreshNumber.current?.value)
        console.log(refreshSelector.current?.value)
    }

    const applyQuickSelect = () => {
        if (!quickSelect.current?.value || !quickNumber.current?.value || !quickSelectSystem.current?.value) return
        const quickValue = quickSelect.current.value + ' ' + quickNumber.current.value + ' ' + quickSelectSystem.current.value
        dispatch({ type: ReducerTypes.SET_QUICK_DATE, payload: quickValue })
        dispatch({ type: ReducerTypes.TOOGLE_START_AND_END_DATES })
    }

    return (
        <div className='quick-selector'>
            <div className='quick-selector__menu'>
                <div className="menu__item">
                    <p className="item__title">Quick select</p>
                    <div className='input-fieldset'>
                        <InputField ref={quickSelect} options={quickOptions} type='select'/>
                        <InputField ref={quickNumber} type='number'/>
                        <InputField ref={quickSelectSystem} type='select' options={numberSystem} />
                        <Button type='outline' onClick={applyQuickSelect}>APPLY</Button>
                    </div>
                </div>
                <div className="menu__item">
                    <p className="item__title">Commonly used</p>
                    <ul className='commonly-used__list'>
                        {commonlyUsed.map(value => (
                            <li className='commonly-used__item' key={value}>
                                <p>{value}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                {recentlyUsed.length !== 0 && (
                    <div className="menu__item">
                        <p className="item__title">Recently used date ranges</p>
                    </div>
                )}
                <div className="menu__item">
                    <p className="item__title">Refresh every</p>
                    <div className='input-fieldset'>
                        <InputField ref={refreshNumber} type='number'/>
                        <InputField options={numberSystem} ref={refreshSelector} type='select'/>
                        <Button type='outline' onClick={submitRefresh} >START</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}