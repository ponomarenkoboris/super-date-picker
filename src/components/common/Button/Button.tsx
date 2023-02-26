import { FC } from 'react'
import './Button.css'

interface ButtonProps {
    type: 'outline' | 'main';
    children: string;
    onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({ type, onClick, children }) => {
    return <button className={`custom-button ${type}`} onClick={onClick}>{children}</button>
}
