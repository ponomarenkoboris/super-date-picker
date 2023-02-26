import { ChangeEvent, forwardRef, RefObject } from 'react'
import './InputField.css'

interface NumberInputField {
    type: 'number',
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

interface SelectInputField {
    type: 'select';
    options: string[],
    onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
    defaultValue?: string
}

type InputFieldProps = NumberInputField | SelectInputField

export const InputField = forwardRef<unknown, InputFieldProps>((props, ref) => {
    return (
        <div className="input">
            { props.type === 'number' ? (
                <input 
                    className='input__item' 
                    type="number" 
                    ref={ref as RefObject<HTMLInputElement>} 
                    onChange={props.onChange}
                    defaultValue='0'
                />
            ) : (
                <select 
                    className='input__item' 
                    ref={ref as RefObject<HTMLSelectElement>} 
                    onChange={props.onChange}
                    defaultValue={props.defaultValue || props.options[0]}>
                    {props.options.map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>
            )}
            <div className="focus-indicator"></div>
        </div>
    )
})